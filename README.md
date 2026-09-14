# Gujarat — an open folio

An immersive reading space for Gujarati literature. Read original Gujarati verses beside contextual English renderings, listen to recitations, and follow thematic threads between poems. The atlas is relational rather than geographic: it does not assign approximate coordinates to poets or treat a modern state boundary as the structure of the literature.

## Current collection

- **Narsinh Mehta:** *Vaishnav Jan To* and *Mari Hundi*
- **Akha Bhagat:** five selected chhappas
- **Follow a thread:** guided reading paths through compassion, understanding, and trust

The poetry readers include line-by-line recitation, bilingual text, and source notes. The site is a Next.js 14 static export, intended for Vercel hosting.

## Development

```sh
npm ci
npm run dev
```

Run `npm run build` to generate the static site in `out/`.

The earlier geographic map components and sample marker data remain in the repository for historical reference; `/map` now presents the relationship-based reading atlas.
