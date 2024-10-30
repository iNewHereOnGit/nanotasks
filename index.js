#!/usr/bin/env node
import * as actions from "./utilities/actionLoader.js";
import { getInput } from "./utilities/inputReader.js";

let running = true;

process.on("unhandledRejection", (reason, promise) => {
    console.log("Unhandled Rejection at:", promise, "reason:", reason);
});

async function main() {
    console.log(
        `====================== NanoTasks v1.0.0 =====================\nwelcome to NanoTasks, type 'help' for help\ncontact iNewHereOnGit on GitHub for support\n`
    );

    while (running) {
        const raw = await getInput("NanoTasks>  ");
        let response;

        response = raw.trim();

        switch (response) {
            case "add":
                try {
                    const result = await actions.addActions.addTask();
                    console.log(result);
                } catch (error) {
                    console.log(error.message);
                }
                break;
            case "exit":
                actions.exitActions.exitApp();
                running = false;
                break;
            case "edit":
                try {
                    const result = await actions.editActions.editTask();
                    console.log(result);
                } catch (error) {
                    console.log(error.message);
                }
                break;
            case "delete":
                try {
                    const result = await actions.deleteActions.deleteTask();
                    console.log(result);
                } catch (error) {
                    console.log(error.message);
                }
                break;
            case "help":
                actions.helpActions.helpFunction();
                break;
            case "get":
                try {
                    const result = await actions.getActions.getTask();
                    console.log(result);
                } catch (error) {
                    console.log(error.message);
                }
                break;
            default:
                console.log("Unknown command, try 'help'");
                break;
        }
    }
}

main();
