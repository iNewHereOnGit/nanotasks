class Task {
    constructor(name, description, priority = 0, completed = 0) {
        this.name = name;
        this.description = description;
        this.priority = priority;
        this.completed = completed;
    }
}

export { Task };
