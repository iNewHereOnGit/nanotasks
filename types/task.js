class Task {
	constructor(
		name,
		description,
		priority = 0,
		completed = 0,
		dueDate
	) {
		this.name = name;
		this.description = description;
		this.priority = priority;
		this.completed = completed;
		this.dueDate = dueDate;
	}
}

export { Task };
