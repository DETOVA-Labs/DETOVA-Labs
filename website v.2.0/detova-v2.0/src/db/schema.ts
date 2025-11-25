import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

// Add new tables
export const internshipApplications = sqliteTable('internship_applications', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  location: text('location'),
  skills: text('skills'),
  portfolio: text('portfolio').notNull(),
  why: text('why').notNull(),
  availability: text('availability'),
  status: text('status').notNull().default('pending'),
  createdAt: text('created_at').notNull(),
});

export const contactSubmissions = sqliteTable('contact_submissions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  type: text('type').notNull(),
  message: text('message').notNull(),
  status: text('status').notNull().default('unread'),
  createdAt: text('created_at').notNull(),
});

export const waitlist = sqliteTable('waitlist', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  source: text('source'),
  createdAt: text('created_at').notNull(),
});

export const articles = sqliteTable('articles', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  summary: text('summary').notNull(),
  content: text('content').notNull(),
  author: text('author').notNull(),
  status: text('status').notNull().default('draft'),
  createdAt: text('created_at').notNull(),
});

export const changelogEntries = sqliteTable('changelog_entries', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  content: text('content').notNull(),
  createdAt: text('created_at').notNull(),
});

export const labFeed = sqliteTable('lab_feed', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  text: text('text').notNull(),
  link: text('link'),
  createdAt: text('created_at').notNull(),
});