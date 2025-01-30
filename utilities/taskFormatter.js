const sortTasks = (userInput, tasks, ascending) => {
	switch (userInput.trim().toLowerCase()) {
		case "title":
			return sortTasksByTitle(tasks, ascending);
		case "priority":
			return sortTasksByPriority(tasks, ascending);
		case "completed":
			return sortTasksByCompletion(tasks, ascending);
		case "":
			return sortTasksByTitle(tasks, ascending);
		default:
			throw new Error("[ERROR] Invalid sort criteria: must be title, priority or completed");
	}
};

const sortTasksByPriority = (tasks, ascending) => {
	if (ascending) {
		return tasks.sort((a, b) => a.priority - b.priority);
	} else {
		return tasks.sort((a, b) => b.priority - a.priority);
	}
};

const sortTasksByTitle = (tasks, ascending) => {
	if (ascending) {
		return tasks.sort((a, b) => a.title.localeCompare(b.title));
	} else {
		return tasks.sort((a, b) => b.title.localeCompare(a.title));
	}
};

const sortTasksByCompletion = (tasks, ascending) => {
	if (ascending) {
		return tasks.sort((a, b) => a.completed - b.completed);
	} else {
		return tasks.sort((a, b) => b.completed - a.completed);
	}
};

const filterTasksByStatus = (tasks, targetStatus) => {
	return tasks.filter((task) => task.completed === targetStatus);
};

const filterTasksByPriority = (tasks, targetPriority) => {
	return tasks.filter((task) => task.priority === targetPriority);
};

/**
 * Formats Tasks
 * @param {Task[]} tasks
 * @returns {Task[]}
 */
const formatTaskList = (tasks) => {
	let formattedTasks = [];
	tasks.forEach((task) => {
		let formattedTask = "* " + task.title + " - " + task.description + ` [P${task.priority}]`;
		formattedTasks.push(formattedTask);
	});

	formattedTasks.push("====================== NanoTasks v1.0.0 =====================");
	return formattedTasks;
};
export { sortTasks, formatTaskList };
