const sortTasksByPriority = (tasks, ascending) => {
	if (ascending) {
		return tasks.sort((a, b) => a.priority - b.priority);
	} else {
		return tasks.sort((a, b) => b.priority - a.priority);
	}
};

const sortTasksByName = (tasks, ascending) => {
	if (ascending) {
		return tasks.sort((a, b) => a.title - b.title);
	} else {
		return tasks.sort((a, b) => b.title - a.title);
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

export {
	sortTasksByPriority,
	sortTasksByName,
	sortTasksByCompletion,
	filterTasksByStatus,
	filterTasksByPriority
};
