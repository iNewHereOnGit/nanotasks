import { db } from "../utilities/database.js";
import { DateTime } from "luxon";
import * as fs from "node:fs";

const dumpDatabase = () => {
	console.log("dumping database...");

	var timeStamp = DateTime.now();
	const filename = `nanotasks_dump_${timeStamp.toFormat("yyyyMMddHHmm.ssSSS")}.json`;

	try {
		const tasks = db.prepare("SELECT * FROM tasks").all();
		fs.writeFileSync(filename, JSON.stringify(tasks));

		return `[success] dumped database to ${filename}`;
	} catch (error) {
		return { err: `[error] failed to dump database, try restaring nanotasks. error: ${error.message}` };
	}
};

export { dumpDatabase };
