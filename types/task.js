class Task {
	constructor(name, note, priority, completed, due, created, modified, tag) {
		this.name = name;
		this.note = note;
		this.priority = priority;
		this.completed = completed;
		this.due = due;
		this.created = created;
		this.modified = modified;
		this.tag = tag;
	}
}

export { Task };
