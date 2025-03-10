const sortTasks = (userInput = "title", tasks, sortDirection = true) => {
	switch (userInput.trim().toLowerCase()) {
		case "title":
		case "name":
			return sortTasksByTitle(tasks, sortDirection);
		case "priority":
			return sortTasksByPriority(tasks, sortDirection);
		case "completed":
			return sortTasksByCompletion(tasks, sortDirection);
		case "":
		case undefined:
			return sortTasksByTitle(tasks, sortDirection);
		default:
			return sortTasksByTitle(tasks, sortDirection);
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
		let completedTaskSymbol = task.completed ? "[✓]" : "[O]";
		let formattedTask = completedTaskSymbol + " " + task.title + " - " + task.note + ` [P${task.priority}]`;
		formattedTasks.push(formattedTask);
	});

	formattedTasks.push("====================== tasks =====================");
	return formattedTasks;
};
export { sortTasks, formatTaskList };
