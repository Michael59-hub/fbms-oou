import type { CollectionConfig } from 'payload'

export const Research: CollectionConfig = {
  slug: 'research',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'year', 'department'],
  },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'abstract', type: 'textarea', required: true },
    {
      name: 'authors',
      type: 'array',
      fields: [{ name: 'name', type: 'text' }],
    },
    { name: 'year', type: 'number', required: true },
    { name: 'journal', type: 'text' },
    {
      name: 'doi',
      type: 'text',
      admin: { description: 'Digital Object Identifier (optional)' },
    },
    { name: 'file', type: 'upload', relationTo: 'media' },
    {
      name: 'department',
      type: 'relationship',
      relationTo: 'departments',
      admin: { position: 'sidebar' },
    },
    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'tag', type: 'text' }],
    },
  ],
}