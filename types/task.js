import { DateTime } from 'luxon';

class Task {
	constructor(
		name,
		description,
		priority = 0,
		completed = 0,
		dueDate,
		createdDate = DateTime.utc().toSeconds(),
		modifiedDate
	) {
		this.name = name;
		this.description = description;
		this.priority = priority;
		this.completed = completed;
		this.dueDate = dueDate;
		this.createdDate = createdDate;
		this.modifiedDate = modifiedDate;
	}
}

export { Task };
