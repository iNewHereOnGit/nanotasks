import Database from "better-sqlite3";
const db = new Database("tasks.db");
db.pragma("journal_mode = WAL");

export { db };
