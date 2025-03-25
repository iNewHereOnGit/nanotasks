import Database from "better-sqlite3";
import { DateTime } from "luxon";

const db = new Database("nanotasks.db");
db.pragma("journal_mode = WAL");

const timeNowSeconds = DateTime.utc().toUnixInteger().toString();

//initialize tasks table
try {
	db.prepare(
		'CREATE TABLE IF NOT EXISTS "tasks" ( "id" INTEGER NOT NULL UNIQUE, "title" TEXT NOT NULL, "note" TEXT, "tag" TEXT, "priority" INTEGER DEFAULT 0 CHECK(priority >= 0 AND priority <= 3), "completed" INTEGER NOT NULL DEFAULT 0 CHECK(completed = 0 OR completed = 1), "due" INTEGER NOT NULL DEFAULT -1, "created" INTEGER NOT NULL, "modified" INTEGER NOT NULL, "list" INTEGER NOT NULL DEFAULT 0 REFERENCES LISTS(id), PRIMARY KEY("id" AUTOINCREMENT))'
	).run();

	//initialize lists table
	db.prepare(
		`CREATE TABLE IF NOT EXISTS "lists" ("id" INTEGER NOT NULL UNIQUE,"name" TEXT NOT NULL,"description" TEXT, "tag" TEXT,"created"	INTEGER NOT NULL, "modified" INTEGER NOT NULL,"deleted"	INTEGER NOT NULL DEFAULT 0,"type"TEXT NOT NULL DEFAULT "standard", PRIMARY KEY("id" AUTOINCREMENT))
	`
	).run();

	//check if default list exists
	const defaultListRow = db.prepare(`SELECT id FROM LISTS WHERE name = 'default'`).get();

	if (defaultListRow === undefined) {
		db.prepare(
			`INSERT INTO LISTS (name, created, modified) VALUES ('default', '${timeNowSeconds}', '${timeNowSeconds}')`
		).run();
	}
} catch (error) {
	console.log(
		`[ERROR] failed to initialize database: ${error.message} Try again or contact iNewHereOnGit on GitHub for support.`
	);

	process.exit(-1);
}

export { db };
