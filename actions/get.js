import { getInput } from '../utilities/inputReader.js';
import { db } from '../utilities/database.js';
import { Task } from '../types/task.js';
import { sortTasks, formatTaskList } from '../utilities/taskFormatter.js';

/**
 * Retrieve a single task or multiple tasks - defaults to all tasks
 * @returns {Task[]} Tasks
 */
const getTask = async () => {
	const rawId = await getInput('Enter ID (blank for all): ');

	if (rawId === '') {
		const rawUserInputSortType = await getInput(
			'Enter task sorting (blank for default): '
		);
		return getAllTasks(rawUserInputSortType);
	} else {
		return getSingleTaskById(rawId);
	}
};

const getAllTasks = (sortType) => {
	try {
		const rawTasks = db.prepare('SELECT * FROM tasks').all();
		const sortedTasks = sortTasks(sortType, rawTasks, true);
		return formatTaskList(sortedTasks);
	} catch (error) {
		throw new Error("[ERROR] Couldn't read from database, try again.");
	}
};

/**
 * Retrieves a single task
 * @param {number} targetId
 * @returns {Task}
 */
const getSingleTaskById = (targetId) => {
	let trimmedId = targetId.trim();
	let singleRow = [];

	trimmedId = Number.parseInt(trimmedId, 10);

	if (typeof trimmedId === NaN || Number.isInteger(trimmedId) === false) {
		throw new Error('[ERROR]Task ID must be an integer');
	}

	if (trimmedId < 0) {
		throw new Error('[ERROR]Task ID must be a positive integer');
	}

	try {
		singleRow = db
			.prepare('SELECT * FROM tasks WHERE id = ?')
			.get(trimmedId);
	} catch (error) {
		throw new Error(
			"[ERROR] Couldn't read from database, try again.",
			error
		);
	}

	return formatTaskList([singleRow]);
};

export { getTask };
