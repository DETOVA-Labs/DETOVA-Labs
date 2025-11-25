import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from '@/db/schema';

const url = process.env.TURSO_CONNECTION_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
  throw new Error('Database connection URL is missing. Please set TURSO_CONNECTION_URL environment variable.');
}

const client = createClient({
  url,
  authToken,
});

export const db = drizzle(client, { schema });

export type Database = typeof db;