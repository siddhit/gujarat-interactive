import { createClient } from '@sanity/client';
import { SAMPLE_MARKERS } from '../data/sampleMarkers';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const writeToken = process.env.NEXT_PUBLIC_SANITY_WRITE_TOKEN;

// Returns null when the project hasn't been configured yet — callers fall back to demo data.
export const sanityClient = projectId
  ? createClient({ projectId, dataset, apiVersion: '2024-01-01', useCdn: true })
  : null;

const writeClient = (projectId && writeToken)
  ? createClient({ projectId, dataset, apiVersion: '2024-01-01', useCdn: false, token: writeToken })
  : null;

/**
 * Fetch published markers for one or more eras.
 * Falls back to bundled sample data when Sanity is not configured.
 */
export async function fetchMarkers(eraIds) {
  if (!sanityClient) {
    const ids = Array.isArray(eraIds) ? eraIds : [eraIds];
    return SAMPLE_MARKERS.filter(
      (m) => m.status === 'published' && m.eras.some((e) => ids.includes(e))
    );
  }

  const ids = Array.isArray(eraIds) ? eraIds : [eraIds];
  return sanityClient.fetch(
    `*[_type == "marker" && status == "published" && count((eras[])[@ in $ids]) > 0]{
      _id, title_guj, title_eng, type, eras, lat, lng,
      body_eng, excerpt_guj, links, status
    }`,
    { ids }
  );
}

/**
 * Fetch ALL published markers at once (used on initial load).
 */
export async function fetchAllMarkers() {
  if (!sanityClient) return SAMPLE_MARKERS.filter((m) => m.status === 'published');

  return sanityClient.fetch(
    `*[_type == "marker" && status == "published"]{
      _id, title_guj, title_eng, type, eras, lat, lng,
      body_eng, excerpt_guj, links, status
    }`
  );
}

/**
 * Submit a report/request to Sanity as a draft `submission` document.
 * Returns { success, error }.
 */
export async function submitReport({ body, source, name }) {
  if (!writeClient) {
    // When no Sanity write client is configured, store locally for demo purposes.
    try {
      const existing = JSON.parse(localStorage.getItem('gujarat-submissions') || '[]');
      existing.push({ body, source, name, createdAt: new Date().toISOString() });
      localStorage.setItem('gujarat-submissions', JSON.stringify(existing));
    } catch (_) {}
    return { success: true, demo: true };
  }

  try {
    await writeClient.create({
      _type: 'submission',
      body,
      source: source || null,
      name: name || null,
      status: 'pending',
      createdAt: new Date().toISOString(),
    });
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
