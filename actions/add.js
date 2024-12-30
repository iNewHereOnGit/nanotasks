import { getInput } from '../utilities/inputReader.js';
import { db } from '../utilities/database.js';
import { Task } from '../types/task.js';
const addTask = async () => {
	const name = await getInput('Name: ');
	let rawDescription = await getInput('Description: ');

	//trim description and name
	const trimmedName = name.trim();
	const trimmedDescription = rawDescription.trim();

	if (name === '' || rawDescription === '') {
		throw new Error(
			'[ERROR]Task must have a name and description, try making your task again.'
		);
	}

	let task = new Task(trimmedName, trimmedDescription);

	try {
		const info = db
			.prepare('INSERT INTO tasks (title, description) VALUES (?,?)')
			.run(task.name, task.description);
	} catch (error) {
		return '[ERROR] Task could not be added, try again';
	}

	if (info.changes >= 1) {
		return `[Success] Created task '${task.name}'\n[Tip] Use 'get task ${task.name}' or 'set task ${info.lastInsertRowid}' to update this task\n`;
	} else {
		throw new Error('[ERROR] Task could not be added, try again');
	}
};

export { addTask };
