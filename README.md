# Gujarat — Across Time

An interactive historical map of the Indian state of Gujarat, placing people, places, and events on the landscape across five eras — from the Solanki golden age through to the modern state.

## What it is & Why

Gujarat has a deep layered history of poets, merchants, scholars, saints, architects, and freedom fighters. This map makes that history spatial and navigable: click a marker to read about the person or place, use the era bar at the bottom to travel through time, and press ← → to step between eras.

I've been wanting to dedicate some of my time to the state my grandfather migrated from and figured I could be one of many whose written or read Gujarati is not as good as their spoken Gujarati. This means a lot of literature on webpages created by previous generations are mono linguisitic will not be maintained, and their not elegantly made either. This is a way for me to contribute to this state and also let Gujaratis around the world know the translations with more accurate AI versions.

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
| Geo Content | Sanity CMS (falls back to bundled sample data) |
| Art  Content | Various Gujarati blogs + [Sarvam AI](https://sarvam.ai)
| Fonts | Tiro Gujarati · Fraunces · Cormorant Garamond · Inter |
| Design tokens | Rann Indigo `#11103A` · Khadi Cream `#FAF6EA` · Bandhani Crimson `#C9342A` |

## Design

Visual identity from the Claude design canvas: Rann-at-dusk indigo ground, unbleached khadi cream surface, bandhani dot motif, and Patola diamond lattice. Full spec in `Visual Identity.html`.

## Credits

Made with love and ગાઠિયા ને જલેબી · Built with [Claude](https://claude.ai) · Map tiles © [CARTO](https://carto.com) · Historical eras approximate
