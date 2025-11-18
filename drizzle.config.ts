
import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';
import type { Config } from 'drizzle-kit';

// Load environment variables from .env.local
config({ path: '.env.local' });

const dbConfig: Config = defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'turso',
  dbCredentials: {
    url: process.env.TURSO_CONNECTION_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
});

export default dbConfig;