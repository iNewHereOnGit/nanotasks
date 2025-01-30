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
		throw new Error("[ERROR] Couldn't read from database, try again.");
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
		throw new Error("[ERROR] Task ID must be an integer");
	}

	let singleRow;

	try {
		singleRow = db.prepare("SELECT * FROM tasks WHERE id = ?").get(trimmedId);

		if (singleRow === undefined) {
			return [`(warn) no tasks found, try adding a task with the 'add' command`];
		}
	} catch (error) {
		throw new Error("[ERROR] Couldn't read from database, try again.", error);
	}

	return formatTaskList([singleRow]);
};

export { getSingleTaskById, getAllTasks };
