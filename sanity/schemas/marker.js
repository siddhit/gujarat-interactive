export default {
  name: 'marker',
  title: 'Map Marker',
  type: 'document',
  fields: [
    {
      name: 'title_guj',
      title: 'Title (Gujarati)',
      type: 'string',
      description: 'Name in Gujarati script',
    },
    {
      name: 'title_eng',
      title: 'Title (English)',
      type: 'string',
      validation: (R) => R.required(),
    },
    {
      name: 'type',
      title: 'Marker Type',
      type: 'string',
      options: {
        list: [
          { title: 'Person', value: 'person' },
          { title: 'Place',  value: 'place'  },
          { title: 'Event',  value: 'event'  },
        ],
        layout: 'radio',
      },
      validation: (R) => R.required(),
    },
    {
      name: 'eras',
      title: 'Eras',
      type: 'array',
      of: [{ type: 'number' }],
      description: '0=Early · 1=Sultanate · 2=Mughal · 3=Company/Princely · 4=Modern',
      options: {
        list: [
          { title: '0 — Early (600–1400)',               value: 0 },
          { title: '1 — Sultanate (1407–1572)',          value: 1 },
          { title: '2 — Mughal (1572–1758)',             value: 2 },
          { title: '3 — Company/Princely (1758–1947)',   value: 3 },
          { title: '4 — Modern (1960–present)',          value: 4 },
        ],
      },
      validation: (R) => R.required().min(1),
    },
    {
      name: 'lat',
      title: 'Latitude',
      type: 'number',
      validation: (R) => R.required().min(-90).max(90),
    },
    {
      name: 'lng',
      title: 'Longitude',
      type: 'number',
      validation: (R) => R.required().min(-180).max(180),
    },
    {
      name: 'body_eng',
      title: 'Context (English)',
      type: 'text',
      rows: 4,
      description: '2–3 sentences of English context for the side panel',
      validation: (R) => R.required(),
    },
    {
      name: 'excerpt_guj',
      title: 'Excerpt (Gujarati)',
      type: 'text',
      rows: 3,
      description: 'Optional short Gujarati excerpt',
    },
    {
      name: 'links',
      title: 'Outbound Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'url',   title: 'URL',   type: 'url'    },
          ],
        },
      ],
      description: '1–3 links (Wikipedia, Rekhta Gujarati, primary source)',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft',     value: 'draft'     },
          { title: 'Published', value: 'published' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
    },
  ],
  preview: {
    select: { title: 'title_eng', subtitle: 'type', media: 'type' },
    prepare({ title, subtitle }) {
      const icon = { person: '👤', place: '📍', event: '⚡' }[subtitle] ?? '📌';
      return { title: `${icon} ${title}`, subtitle };
    },
  },
};
