import { getInput } from "../utilities/inputReader.js";
import { db } from "../utilities/database.js";
import { Task } from "../types/task.js";
import { sortTasks, formatTaskList } from "../utilities/taskFormatter.js";
import { isValidTaskId } from "../utilities/inputValidator.js";

const getAllTasks = (sortType) => {
	try {
		const rawTasks = db.prepare("SELECT * FROM tasks").all();

		if (rawTasks.length === 0) {
			return [`(warn) no tasks found, try adding a task with the 'add' command`];
		}

		const sortedTasks = sortTasks(sortType, rawTasks, true);
		return formatTaskList(sortedTasks);
	} catch (error) {
		throw new Error("(error) couldn't read from database, try again.");
	}
};

/**
 * Retrieves a single task by ID
 * @param {number} rawInput
 * @returns {Task} Task
 */
const getSingleTaskById = (rawInput) => {
	const isValidId = isValidTaskId(rawInput);

	if (!isValidId) {
		throw new Error("(error) task ID must be an integer");
	}

	let singleRow;

	try {
		singleRow = db.prepare("SELECT * FROM tasks WHERE id = ?").get(rawInput);

		if (singleRow === undefined) {
			return `(warn) no tasks found with id ${rawInput}, try adding a task with the 'add' command`;
		}
	} catch (error) {
		throw new Error("(error) couldn't read from database, try again.", error);
	}

	return formatTaskList([singleRow]);
};

const searchTermByTitleOrNote = async () => {
	let isValidSearchTerm = false;
	let rawSearchTerm;

	do {
		rawSearchTerm = await getInput("Search term: ");
		if (rawSearchTerm.trim().length >= 3) isValidSearchTerm = true;
		else console.log("[WARN] search term must be at least 3 characters");
	} while (isValidSearchTerm === false);

	let parsedSearchTerm = rawSearchTerm.trim();

	const results = db
		.prepare(`SELECT * FROM tasks WHERE title LIKE '%${parsedSearchTerm}%' OR note LIKE '%${parsedSearchTerm}%'`)
		.all();

	if (results.length === 0) {
		throw `(warn) no tasks found with term '${parsedSearchTerm}', adjust your search and try again`;
	} else if (results.length === 1) {
		return formatTaskList([results[0]]);
	}

	return formatTaskList(results);
};

export { getSingleTaskById, getAllTasks, searchTermByTitleOrNote };
