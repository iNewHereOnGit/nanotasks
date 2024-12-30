import Database from 'better-sqlite3';
const db = new Database('tasks.db');

//initialize tasks table using prepared statement
try {
	db.prepare(
		'CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, description TEXT, priority INTEGER, completed INTEGER)'
	).run();
} catch (error) {
	console.log(
		`[ERROR] Failed to initialize Tasks table. Does the database already exist?`
	);
	process.exit(-1);
}

db.pragma('journal_mode = WAL');

export { db };
