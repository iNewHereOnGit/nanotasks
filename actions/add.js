import { getInput } from "../utilities/inputReader.js";
import { db } from "../utilities/database.js";
import { Task } from "../types/task.js";
import { DateTime } from "luxon";

const addTask = async () => {
	const name = await getInput("Name: ");
	let rawDescription = await getInput("Description: ");
	const priority = await getInput("Priority: ");
	const tag = await getInput("Tag: ");

	//set defaults for missing fields
	const trimmedName = name.trim();
	const trimmedDescription = rawDescription.trim();
	let parsedPriority = Number.parseInt(priority.trim(), 10);
	let parsedTag = tag.trim();

	if (isNaN(parsedPriority)) parsedPriority = 0;
	if (parsedTag.length === 0) parsedTag = null;

	const utcSeconds = DateTime.utc().toUnixInteger();

	if (name === "") {
		throw new Error("[ERROR]Task must have a name, try making your task again.");
	}

	let task = new Task(trimmedName, trimmedDescription, parsedPriority, 0, -1, utcSeconds, utcSeconds, parsedTag);
	let info;

	try {
		info = db
			.prepare(
				"INSERT INTO tasks (title, note, tag, priority, completed, due, created, modified) VALUES (?,?,?,?,?,?,?,?)"
			)
			.run(task.title, task.note, task.tag, task.priority, task.completed, task.due, task.created, task.modified);
	} catch (error) {
		return "[ERROR] Task could not be added, try again", error;
	}

	if (info.changes >= 1) {
		return `[Success] Created task '${task.title}'\n[Tip] Use 'get task ${task.title}' or 'edit task ${info.lastInsertRowid}' to update this task\n`;
	} else {
		throw new Error("[ERROR] Task could not be added, try again");
	}
};

export { addTask };
