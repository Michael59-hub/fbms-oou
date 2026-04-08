import type { CollectionConfig } from 'payload'

export const Payments: CollectionConfig = {
  slug: 'payments',
  admin: {
    useAsTitle: 'studentName',
    defaultColumns: ['studentName', 'purpose', 'amount', 'status', 'paidAt'],
  },
  access: { read: () => true },
  fields: [
    { name: 'studentName', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'matricNumber', type: 'text' },
    {
      name: 'purpose',
      type: 'select',
      required: true,
      options: ['dues', 'event-ticket', 'other'],
    },
    { name: 'amount', type: 'number', required: true },
    { name: 'paystackRef', type: 'text', required: true, unique: true },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: ['pending', 'success', 'failed'],
      admin: { position: 'sidebar' },
    },
    {
      name: 'paidAt',
      type: 'date',
      admin: { position: 'sidebar' },
    },
  ],
}