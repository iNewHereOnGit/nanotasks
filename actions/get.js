import { getInput } from "../utilities/inputReader.js";
import { db } from "../utilities/database.js";
import { Task } from "../types/task.js";
const getTask = async () => {
    const rawId = await getInput("Enter ID or leave blank for all tasks: ");
    let trimmedId = rawId.trim();
    let singleRow;

    if (trimmedId === "") {
        let tasks = db.prepare("SELECT * FROM tasks").all();
        return tasks;
    }

    trimmedId = Number.parseInt(trimmedId, 10);

    if (typeof trimmedId === NaN || Number.isInteger(trimmedId) === false) {
        throw new Error("[ERROR]Task ID must be an integer");
    }

    if (trimmedId < 0) {
        throw new Error("[ERROR]Task ID must be a positive integer");
    }

    try {
        singleRow = db
            .prepare("SELECT * FROM tasks WHERE id = ?")
            .get(trimmedId);
    } catch (error) {
        throw new Error("[ERROR] Couldn't read from database, try again.");
    }

    if (singleRow === undefined) {
        return `[WARN] Task with ID ${trimmedId} not found, check the ID and try again`;
    } else {
        return singleRow;
    }
};

export { getTask };
