import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: { read: () => true },
  fields: [
    {
      name: 'facultyName',
      type: 'text',
      defaultValue: 'Faculty of Basic Medical Sciences',
    },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'tagline', type: 'text' },
    { name: 'contactEmail', type: 'email' },
    { name: 'phone', type: 'text' },
    { name: 'address', type: 'textarea' },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        { name: 'twitter', type: 'text' },
        { name: 'instagram', type: 'text' },
        { name: 'facebook', type: 'text' },
        { name: 'whatsapp', type: 'text' },
      ],
    },
    { name: 'heroText', type: 'text' },
    { name: 'footerText', type: 'textarea' },
  ],
}