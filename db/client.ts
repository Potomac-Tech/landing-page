import { env } from 'cloudflare:workers';

type SiteEnvironment = { DB?: D1Database; INBOX_OWNER_EMAIL?: string };

export function siteEnvironment(): SiteEnvironment {
  return env as unknown as SiteEnvironment;
}

export function database(): D1Database {
  const db = siteEnvironment().DB;
  if (!db) throw new Error('Inquiry storage is unavailable');
  return db;
}
