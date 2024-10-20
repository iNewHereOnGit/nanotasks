const commands = {
    add: {
        name: "add",
        description:
            "Create a new task with an optional description, priority, and completed status",
        example: "add <name> [description] [priority] [completed]",
        parameters: [
            {
                name: "name",
                type: "string",
                description: "The task to add",
                required: true,
            },
            {
                name: "description",
                type: "string",
                description: "The description of the task",
                required: false,
                default: "",
            },
            {
                name: "priority",
                type: "number",
                description: "The priority of the task",
                required: false,
                default: 0,
            },
            {
                name: "completed",
                type: "boolean",
                description: "Whether the task is completed or not",
                required: false,
                default: false,
            },
        ],
    },

    list: {
        name: "list",
        description:
            "List tasks with an optional filter, omit filter to show all tasks",
        example: "list [filter]",
        parameters: [
            {
                name: "filter",
                type: "string",
                description: "The filter to apply to the tasks",
                required: false,
                default: "*",
            },
        ],
    },

    edit: {
        name: "edit",
        description: "Edit a task",
        example: "edit <id> <field> <value>",
        parameters: [
            {
                name: "id",
                type: "number",
                description: "The ID of the task to edit",
                required: true,
            },
            {
                name: "field",
                type: "string",
                description: "The field to edit",
                required: true,
            },
            {
                name: "value",
                type: "string|boolean|number",
                description: "The new value for the field",
                required: true,
            },
        ],
    },

    delete: {
        name: "delete",
        description: "Delete a task",
        example: "delete <id>",
        parameters: [
            {
                name: "id",
                type: "number",
                description: "The ID of the task to delete",
                required: true,
            },
        ],
    },

    exit: {
        name: "exit",
        description: "Exit NanoTasks",
        example: "exit",
        parameters: null,
    },
};

export default commands;
