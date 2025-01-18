class Task {
	constructor(
		name,
		description,
		priority,
		completed,
		due,
		created,
		modified
	) {
		this.name = name;
		this.description = description;
		this.priority = priority;
		this.completed = completed;
		this.due = due;
		this.created = created;
		this.modified = modified;
	}
}

export { Task };
