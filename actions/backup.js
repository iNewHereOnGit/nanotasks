import { db } from "../utilities/database.js";
import { DateTime } from "luxon";

const backupDatabase = async () => {
	const dt = DateTime.now().toUnixInteger();
	try {
		await db.backup("tasks_backup_" + dt);
		return `tasks_backup_${dt}`;
	} catch (error) {
		return { err: error };
	}
};

export { backupDatabase };
