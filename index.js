#!/usr/bin/env node
import * as actions from "./utilities/actionLoader.js";
import { getInput, rl, splitTokens } from "./utilities/inputReader.js";

console.log(
	`====================== nanotasks v1.0.0 =====================\nwelcome to nanotasks, type 'help' for commands\ncontact iNewHereOnGit on GitHub for support\n`
);

rl.prompt();

rl.on("line", async (input) => {
	const values = splitTokens(input.trim());

	switch (values[0]) {
		case "get":
			if (values[1] === "all" || values[1] === "*" || values.length === 1) {
				try {
					const allTasks = actions.getActions.getAllTasks(values[1]);
					allTasks.forEach((Task) => {
						console.log(Task);
					});
				} catch (error) {
					console.log(error.message, "\n");
				}
			} else {
				try {
					const singleTask = actions.getActions.getSingleTaskById(values[1]);
					console.log(singleTask);
				} catch (error) {
					console.log(error.message, "\n");
				}
			}

			break;
		case "add":
			let result;
			try {
				result = await actions.addActions.addTask();
				console.log(result);
			} catch (error) {
				console.log(error);
			}

			break;
		case "edit":
			actions.editActions.editTask(values);
			break;
		case "delete":
			actions.deleteActions.deleteTask(values);
			break;
		case "help":
			actions.helpActions.helpFunction();
			break;
		case "exit":
			actions.exitActions.exitApp();
			break;
		case "search":
			try {
				const result = await actions.getActions.searchTermByTitleOrNote();
				console.log(result);
			} catch (error) {
				console.log(error);
			}
			break;
		case "dump": {
			const result = actions.dumpActions.dumpDatabase();
			if (result.err) console.log(result.err);
			else console.log(result);

			break;
		}
		default:
			console.log(`invalid command, type 'help' for available commands`);
	}

	rl.prompt();
}).on("close", () => {
	actions.exitActions.exitApp();
});
