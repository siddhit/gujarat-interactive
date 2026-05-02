export default {
  name: 'submission',
  title: 'User Submission',
  type: 'document',
  fields: [
    {
      name: 'body',
      title: 'What\'s missing?',
      type: 'text',
      rows: 4,
      validation: (R) => R.required(),
    },
    {
      name: 'source',
      title: 'Source',
      type: 'string',
      description: 'Book title, author, URL, etc.',
    },
    {
      name: 'name',
      title: 'Your Name (optional)',
      type: 'string',
    },
    {
      name: 'status',
      title: 'Moderation Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending review', value: 'pending'  },
          { title: 'Accepted',       value: 'accepted' },
          { title: 'Rejected',       value: 'rejected' },
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
    },
    {
      name: 'createdAt',
      title: 'Submitted At',
      type: 'string',
      readOnly: true,
    },
  ],
  preview: {
    select: { title: 'body', subtitle: 'createdAt' },
    prepare({ title, subtitle }) {
      return { title: title?.slice(0, 60) ?? '(empty)', subtitle };
    },
  },
};
