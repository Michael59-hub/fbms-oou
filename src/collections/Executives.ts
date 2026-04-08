import type { CollectionConfig } from 'payload'

export const Executives: CollectionConfig = {
  slug: 'executives',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'position', 'order'],
  },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'position', type: 'text', required: true },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'bio', type: 'textarea' },
    { name: 'email', type: 'email' },
    { name: 'phone', type: 'text' },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        { name: 'twitter', type: 'text' },
        { name: 'linkedin', type: 'text' },
        { name: 'instagram', type: 'text' },
      ],
    },
    {
      name: 'order',
      type: 'number',
      admin: { description: 'Controls display order. Lower = first.' },
    },
  ],
}