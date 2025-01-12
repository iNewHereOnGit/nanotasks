import Database from 'better-sqlite3';
const db = new Database('tasks.db');

//initialize tasks table using prepared statement
try {
	db.prepare(
		'CREATE TABLE IF NOT EXISTS "tasks" ( "id" INTEGER NOT NULL UNIQUE, "title" TEXT NOT NULL, "description" TEXT, "priority" INTEGER DEFAULT 0 CHECK(priority >= 0 AND priority <= 3), "completed" INTEGER NOT NULL DEFAULT 0 CHECK(completed = 0 OR completed = 1), "dueDateSeconds" INTEGER NOT NULL DEFAULT -1, PRIMARY KEY("id" AUTOINCREMENT))'
	).run();
} catch (error) {
	console.log(
		`[ERROR] Failed to initialize Tasks table. Does the database already exist?`,
		error
	);
	process.exit(-1);
}

db.pragma('journal_mode = WAL');

export { db };
