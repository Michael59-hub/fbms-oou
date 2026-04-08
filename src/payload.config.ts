import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { cloudinaryStorage } from 'payloadcms-storage-cloudinary'

import { News } from './collections/News'
import { Events } from './collections/Events'
import { Departments } from './collections/Departments'
import { Executives } from './collections/Executives'
import { ELibrary } from './collections/ELibrary'
import { Research } from './collections/Research'
import { Gallery } from './collections/Gallery'
import { Payments } from './collections/Payments'
import { Media } from './collections/Media'
import { SiteSettings } from './globals/SiteSettings'
import { Users } from './collections/Users'

export default buildConfig({
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '— FBMS OOU Admin',
    },
  },
  collections: [
    Users,
    News,
    Events,
    Departments,
    Executives,
    ELibrary,
    Research,
    Gallery,
    Payments,
    Media,
  ],
  globals: [SiteSettings],
  editor: lexicalEditor({}),
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI },
  }),
  plugins: [
    cloudinaryStorage({
      collections: {
        media: true,
      },
      cloudinaryConfig: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
        api_key: process.env.CLOUDINARY_API_KEY || '',
        api_secret: process.env.CLOUDINARY_API_SECRET || '',
      },
      folder: process.env.CLOUDINARY_FOLDER || 'fbms-oou',
    }),
  ],
  typescript: { outputFile: './src/payload-types.ts' },
  secret: process.env.PAYLOAD_SECRET || '',
})