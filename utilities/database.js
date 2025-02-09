import Database from "better-sqlite3";
const db = new Database("tasks.db");

//initialize tasks table using prepared statement
try {
	db.prepare(
		'CREATE TABLE IF NOT EXISTS "tasks" ( "id" INTEGER NOT NULL UNIQUE, "title" TEXT NOT NULL, "note" TEXT, "tag" TEXT, "priority" INTEGER DEFAULT 0 CHECK(priority >= 0 AND priority <= 3), "completed" INTEGER NOT NULL DEFAULT 0 CHECK(completed = 0 OR completed = 1), "due" INTEGER NOT NULL DEFAULT -1, "created" INTEGER NOT NULL, "modified" INTEGER NOT NULL, PRIMARY KEY("id" AUTOINCREMENT))'
	).run();
} catch (error) {
	console.log(
		`[ERROR] failed to initialize tasks table: ${error.message} Try again or contact iNewHereOnGit on GitHub for support.`
	);
	process.exit(-1);
}

db.pragma("journal_mode = WAL");

export { db };
