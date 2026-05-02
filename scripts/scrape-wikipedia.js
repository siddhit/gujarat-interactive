#!/usr/bin/env node
/**
 * Wikipedia scraper for Gujarat — Across Time
 *
 * Usage:
 *   node scripts/scrape-wikipedia.js <wikipedia-url> --era=<0-4> --type=<person|place|event>
 *
 * Example:
 *   node scripts/scrape-wikipedia.js https://en.wikipedia.org/wiki/Modhera_Sun_Temple --era=0 --type=place
 *
 * Outputs a JSON object matching the Sanity `marker` schema.
 * Requires: cheerio  (npm install cheerio)
 */

'use strict';

const https   = require('https');
const http    = require('http');
const { URL } = require('url');

// ── Try to load cheerio; gracefully fall back to regex if missing ──────────
let cheerio = null;
try { cheerio = require('cheerio'); } catch (_) {}

// ── CLI parsing ─────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const url  = args.find((a) => !a.startsWith('--'));
const eraArg  = args.find((a) => a.startsWith('--era='));
const typeArg = args.find((a) => a.startsWith('--type='));

const ERA_ID = eraArg  ? parseInt(eraArg.split('=')[1],  10)  : null;
const TYPE   = typeArg ? typeArg.split('=')[1].toLowerCase()  : null;

const VALID_TYPES = ['person', 'place', 'event'];
const ERA_NAMES   = ['Early', 'Sultanate', 'Mughal', 'Company/Princely', 'Modern'];

if (!url) {
  console.error('Usage: node scrape-wikipedia.js <url> [--era=0-4] [--type=person|place|event]');
  process.exit(1);
}
if (ERA_ID !== null && (ERA_ID < 0 || ERA_ID > 4)) {
  console.error('--era must be 0–4');
  process.exit(1);
}
if (TYPE && !VALID_TYPES.includes(TYPE)) {
  console.error('--type must be one of: person, place, event');
  process.exit(1);
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Fetch URL as text, following up to 3 redirects. */
function fetchText(rawUrl) {
  return new Promise((resolve, reject) => {
    function get(u, redirects) {
      if (redirects > 3) return reject(new Error('Too many redirects'));
      const parsed = new URL(u);
      const lib    = parsed.protocol === 'https:' ? https : http;
      lib.get(u, { headers: { 'User-Agent': 'GujaratMapBot/1.0 (+https://github.com/siddhit/gujarat-interactive)' } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return get(res.headers.location, redirects + 1);
        }
        if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
        res.on('error', reject);
      }).on('error', reject);
    }
    get(rawUrl, 0);
  });
}

/** Convert DMS (degrees/minutes/seconds) coordinate string to decimal. */
function dmsToDecimal(str) {
  // Matches: 23°01'30"N  or  23.03°N
  const dmsRe = /(\d+)°\s*(\d+)?'?\s*(\d+(?:\.\d+)?)?\"?\s*([NSEW])/i;
  const decRe = /([\d.]+)\s*°?\s*([NSEW])/i;

  let m = dmsRe.exec(str);
  if (m) {
    const deg = parseFloat(m[1]);
    const min = parseFloat(m[2] || 0);
    const sec = parseFloat(m[3] || 0);
    const dir = m[4].toUpperCase();
    const val = deg + min / 60 + sec / 3600;
    return (dir === 'S' || dir === 'W') ? -val : val;
  }
  m = decRe.exec(str);
  if (m) {
    const val = parseFloat(m[1]);
    const dir = m[2].toUpperCase();
    return (dir === 'S' || dir === 'W') ? -val : val;
  }
  return null;
}

/** Extract coordinates from the HTML (infobox or geo microformat). */
function extractCoordinates(html) {
  // 1. Try geo microformat  <span class="geo">lat; lng</span>
  let geoM = /<span class="geo">([\d.]+);\s*([\d.]+)<\/span>/i.exec(html);
  if (geoM) {
    return { lat: parseFloat(geoM[1]), lng: parseFloat(geoM[2]) };
  }

  // 2. Try latitude/longitude spans
  const latSpan = /<span class="latitude">([^<]+)<\/span>/i.exec(html);
  const lngSpan = /<span class="longitude">([^<]+)<\/span>/i.exec(html);
  if (latSpan && lngSpan) {
    const lat = dmsToDecimal(latSpan[1]);
    const lng = dmsToDecimal(lngSpan[1]);
    if (lat !== null && lng !== null) return { lat, lng };
  }

  // 3. Try {{coord}} template remnants in data-lat / data-lon attributes
  const dataLat = /data-lat="([\d.-]+)"/i.exec(html);
  const dataLon = /data-lon="([\d.-]+)"/i.exec(html);
  if (dataLat && dataLon) {
    return { lat: parseFloat(dataLat[1]), lng: parseFloat(dataLon[1]) };
  }

  return { lat: null, lng: null };
}

/** Extract the intro paragraph using cheerio if available, otherwise regex. */
function extractIntro(html) {
  if (cheerio) {
    const $ = cheerio.load(html);
    // Wikipedia's content is in #mw-content-text .mw-parser-output
    // The intro is the first <p> that has real text (not empty, not a coordinates line)
    const paragraphs = $('#mw-content-text .mw-parser-output > p');
    let intro = '';
    paragraphs.each((_, el) => {
      if (intro) return false; // break
      const text = $(el).text().trim();
      // Skip empty paragraphs and coordinate paragraphs
      if (text.length > 60 && !/^\d+°/.test(text)) {
        // Strip citation markers like [1] [2]
        intro = text.replace(/\[\d+\]/g, '').trim();
      }
    });
    return intro;
  }

  // Regex fallback: match <p> tags in content area
  const contentM = html.match(/<div id="mw-content-text"[\s\S]*?>([\s\S]*?)<\/div>/);
  const content  = contentM ? contentM[1] : html;
  const pTags    = [...content.matchAll(/<p>([\s\S]*?)<\/p>/g)];
  for (const match of pTags) {
    const text = match[1].replace(/<[^>]+>/g, '').replace(/\[\d+\]/g, '').trim();
    if (text.length > 60 && !/^\d+°/.test(text)) return text;
  }
  return '';
}

/** Extract page title from <title> tag. */
function extractTitle(html) {
  const m = /<title>([^<]+) - Wikipedia<\/title>/i.exec(html);
  return m ? m[1].trim() : '';
}

/** Extract dates from first paragraph or infobox. Heuristic. */
function extractDates(intro) {
  const matches = intro.match(/\b(1[0-9]{3}|2[0-9]{3})\b/g) ?? [];
  return [...new Set(matches)].slice(0, 4);
}

// ── Main ─────────────────────────────────────────────────────────────────────
(async () => {
  try {
    process.stderr.write(`Fetching: ${url}\n`);
    const html  = await fetchText(url);

    const title      = extractTitle(html);
    const intro      = extractIntro(html);
    const { lat, lng } = extractCoordinates(html);
    const dates      = extractDates(intro);

    const marker = {
      // Sanity _type
      _type: 'marker',

      // Titles
      title_eng: title || 'Unknown',
      title_guj: null, // English Wikipedia cannot provide this

      // Classification
      type:  TYPE   ?? 'place',
      eras:  ERA_ID !== null ? [ERA_ID] : [],

      // Position (null if not found in page)
      lat: lat ?? null,
      lng: lng ?? null,

      // Content
      body_eng:   intro.slice(0, 800) || null,
      excerpt_guj: null,

      // Links
      links: [
        { label: 'Wikipedia', url }
      ],

      // Moderation
      status: 'draft',

      // Extracted metadata (not part of schema, for editorial reference)
      _scraped: {
        source: url,
        scrapedAt: new Date().toISOString(),
        dates,
        eraLabel: ERA_ID !== null ? ERA_NAMES[ERA_ID] : 'unset',
      },
    };

    process.stdout.write(JSON.stringify(marker, null, 2) + '\n');

    // Validation hints
    const warnings = [];
    if (!lat || !lng)     warnings.push('⚠  Coordinates not found — add lat/lng manually.');
    if (!intro)            warnings.push('⚠  Intro paragraph not extracted — body_eng is empty.');
    if (ERA_ID === null)   warnings.push('⚠  --era not specified — eras array is empty.');
    if (!TYPE)             warnings.push('⚠  --type not specified — defaults to "place".');

    if (warnings.length) {
      process.stderr.write('\n' + warnings.join('\n') + '\n');
    }

  } catch (err) {
    process.stderr.write(`Error: ${err.message}\n`);
    process.exit(1);
  }
})();
