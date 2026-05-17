# Gujarat — Across Time

An interactive historical map of Gujarat, placing people, places, and events on the landscape across five eras — from the Solanki golden age through to the modern state.

## What it is

Gujarat has a deep layered history of poets, merchants, scholars, saints, architects, and freedom fighters. This map makes that history spatial and navigable: click a marker to read about the person or place, use the era bar at the bottom to travel through time, and press ← → to step between eras.

## Eras

| Era | Period | Description |
|-----|--------|-------------|
| Early Period | 600 – 1400 | Maitraka, Gurjara-Pratihara, and Solanki / Chaulukya dynasties |
| Gujarat Sultanate | 1407 – 1572 | The independent Muzaffarid Sultanate — Gujarat's cultural and literary peak |
| Mughal Gujarat | 1572 – 1758 | Akbar's conquest and the imperial Subah of Gujarat |
| Company & Princely | 1758 – 1947 | British Bombay Presidency and the patchwork of Princely States |
| Modern Gujarat | 1960 – present | The state of Gujarat formed from Bombay State on 1 May 1960 |

## Marker types

- **Person** (madder red `#6B1F2E`) — poets, saints, rulers, scholars, reformers
- **Place** (terracotta `#B04E18`) — temples, step-wells, ports, forts, cities
- **Event** (peacock teal `#1B5A66`) — battles, treaties, literary moments, founding acts

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14 — static export, deployed on Vercel |
| Map | react-leaflet v4 + CartoDB Positron light tiles |
| Content | Sanity CMS (falls back to bundled sample data) |
| Fonts | Tiro Gujarati · Fraunces · Cormorant Garamond · Inter |
| Design tokens | Rann Indigo `#11103A` · Khadi Cream `#FAF6EA` · Bandhani Crimson `#C9342A` |

## Local development

```bash
npm install
npm run dev
```

### Environment variables

Create `.env.local` to connect a Sanity project:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_WRITE_TOKEN=your_write_token   # for the report/submit form
```

Without these the app runs on bundled sample data — no setup needed to explore or develop.

## Adding markers

Edit `data/sampleMarkers.js`. Each marker follows this shape:

```js
{
  _id: 'e0-p1',              // unique ID — use era prefix + type + number
  title_guj: 'નરસિંહ મહેતા', // Gujarati title (optional)
  title_eng: 'Narsinh Mehta',
  type: 'person',            // person | place | event
  eras: [0],                 // era indices — a marker can span multiple eras
  lat: 21.7645,
  lng: 70.4579,
  body_eng: 'English prose...',
  excerpt_guj: 'ગુજરાતી અવતરણ...', // optional Gujarati excerpt shown in panel
  links: [{ label: 'Wikipedia', url: 'https://...' }],
  status: 'published',       // 'published' | 'draft'
}
```

Era indices: `0` Early · `1` Sultanate · `2` Mughal · `3` Company/Princely · `4` Modern

## Design

Visual identity from the Claude design canvas: Rann-at-dusk indigo ground, unbleached khadi cream surface, bandhani dot motif, and Patola diamond lattice. Full spec in `Visual Identity.html`.

## Credits

Made with love and ગાઠિયા ને જલેબી · Built with [Claude](https://claude.ai) · Map tiles © [CARTO](https://carto.com) · Historical borders approximate
