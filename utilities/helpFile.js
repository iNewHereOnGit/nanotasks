const commands = {
	add: {
		name: "add",
		description: "Adds a new task. You can optionally include a description, priority, and completion status.",
		usage: "add <name> [description] [priority] [completed]",
		parameters: [
			{
				name: "name",
				description: "The name of the task (required).",
				type: "string",
				required: true,
			},
			{
				name: "description",
				description: "A description of the task.",
				type: "string",
				required: false,
			},
			{
				name: "priority",
				description: "The priority of the task (default: 0).",
				type: "number",
				required: false,
				default: 0,
			},
			{
				name: "completed",
				description: "Whether the task is completed (default: false).",
				type: "boolean",
				required: false,
				default: false,
			},
		],
	},

	get: {
		name: "get",
		description: `Retrieves a task. Leave ID blank, '*', or 'all to retrieve all tasks.`,
		usage: "get [integer] | get * | get all | get",
		parameters: [
			{
				name: "id",
				description: "The integer ID of the task to retrieve.",
				type: "integer",
				required: false,
				default: null,
			},
		],
	},

	edit: {
		name: "edit",
		description: "Edits an existing task.",
		usage: "edit <id> <field> <value>",
		parameters: [
			{
				name: "id",
				description: "The ID of the task to edit (required).",
				type: "number",
				required: true,
			},
			{
				name: "field",
				description: "The field to edit (required).",
				type: "string",
				required: true,
			},
			{
				name: "value",
				description: "The new value for the field (required).",
				type: "string | boolean | number",
				required: true,
			},
		],
	},

	delete: {
		name: "delete",
		description: "Deletes a task.",
		usage: "delete <id>",
		parameters: [
			{
				name: "id",
				description: "The ID of the task to delete (required).",
				type: "number",
				required: true,
			},
		],
	},

	dump: {
		name: "dump",
		description: "Dump the entire database to a JSON file.",
		usage: "dump",
		parameters: null,
	},

	exit: {
		name: "exit",
		description: "Exits the NanoTasks application.",
		usage: "exit",
		parameters: null,
	},
};

export default commands;
