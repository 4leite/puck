"use server";

import { Data } from "@measured/puck";
import { Client, createClient } from "@libsql/client";

const db: Client =
  globalThis.puckDb ||
  (globalThis.puckDb = createClient({
    url: "file:puck.db",
  }));

export async function getPageData(url: string): Promise<Data | undefined> {
  const result = await db.execute(
    `SELECT data FROM pages where key = "${url}"`
  );
  const data = result.rows[0]?.data as string;
  return data ? JSON.parse(data) : undefined;
}

export async function publishPageData(key: string, data: Data): Promise<void> {
  await db.execute({
    sql: `INSERT into pages ( key, data ) VALUES ( $key, $data ) ON CONFLICT ( key ) DO UPDATE SET data=excluded.data`,
    args: { key, data: JSON.stringify(data) },
  });
}

export async function getAllPaths(): Promise<{ puckPath: string[] }[]> {
  const result = await db.execute(`SELECT key FROM pages;`);
  const data = result.rows.map((row) => ({
    puckPath: (row["key"] as string).split("/").slice(1),
  }));
  return data;
}
