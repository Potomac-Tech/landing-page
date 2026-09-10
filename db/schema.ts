import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const inquiries = sqliteTable(
  'inquiries',
  {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    organization: text('organization').notNull(),
    interest: text('interest').notNull(),
    message: text('message').notNull(),
    createdAt: integer('created_at').notNull(),
    sourceHash: text('source_hash').notNull(),
  },
  (table) => [
    index('idx_inquiries_created').on(table.createdAt),
    index('idx_inquiries_source_created').on(table.sourceHash, table.createdAt),
  ],
);
