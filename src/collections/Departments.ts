import type { CollectionConfig } from 'payload'

export const Departments: CollectionConfig = {
  slug: 'departments',
  admin: { useAsTitle: 'name' },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar' },
    },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'description', type: 'richText' },
    { name: 'vision', type: 'textarea' },
    { name: 'mission', type: 'textarea' },
    { name: 'foundedYear', type: 'number' },
    {
      name: 'hod',
      type: 'group',
      label: 'Head of Department',
      fields: [
        { name: 'name', type: 'text' },
        { name: 'photo', type: 'upload', relationTo: 'media' },
        { name: 'email', type: 'email' },
      ],
    },
  ],
}