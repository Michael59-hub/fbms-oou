import type { CollectionConfig } from 'payload'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  admin: { useAsTitle: 'title' },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'images',
      type: 'array',
      required: true,
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'caption', type: 'text' },
      ],
    },
    {
      name: 'albumDate',
      type: 'date',
      admin: { position: 'sidebar' },
    },
    {
      name: 'event',
      type: 'relationship',
      relationTo: 'events',
      admin: {
        position: 'sidebar',
        description: 'Link to an event (optional)',
      },
    },
  ],
}