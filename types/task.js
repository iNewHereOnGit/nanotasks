class Task {
	constructor(title, note, priority, completed, due, created, modified, tag, list = "default") {
		this.title = title;
		this.note = note;
		this.priority = priority;
		this.completed = completed;
		this.due = due;
		this.created = created;
		this.modified = modified;
		this.tag = tag;
		this.list = list;
	}
}

export { Task };
