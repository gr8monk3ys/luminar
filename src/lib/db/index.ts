import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    return null;
  }
  const sql = neon(url);
  return drizzle(sql, { schema });
}

let _db: ReturnType<typeof getDb> | undefined;

export function db() {
  if (_db === undefined) {
    _db = getDb();
  }
  return _db;
}

export function isDbConfigured(): boolean {
  return !!process.env.DATABASE_URL;
}
