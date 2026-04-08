import type { CollectionConfig } from 'payload'

export const ELibrary: CollectionConfig = {
  slug: 'e-library',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'level', 'department'],
  },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'file', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: ['past-question', 'lecture-note', 'textbook', 'journal', 'other'],
    },
    {
      name: 'level',
      type: 'select',
      options: ['100', '200', '300', '400', '500', 'postgraduate'],
    },
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
    {
      name: 'uploadedAt',
      type: 'date',
      admin: { position: 'sidebar' },
    },
  ],
}