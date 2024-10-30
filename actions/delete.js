import { getInput } from "../utilities/inputReader.js";
import { db } from "../utilities/database.js";
const deleteTask = async () => {
    const rawInput = await getInput("Task name or ID: ");
    let sqlString;

    const trimmedInput = rawInput.trim();
    const parsedId = Number.parseInt(trimmedInput, 10);

    if (typeof parsedId === NaN || Number.isInteger(parsedId) === false) {
        throw new Error("[ERROR] Task ID must be an integer");
    }

    const stmt = db.prepare(sqlString);
    const info = stmt.run(parsedId);

    if (info.changes >= 1) {
        return `[Success] Deleted task '${parsedId}'\n[TIP] Use 'get' to see all tasks`;
    } else {
        throw new Error(
            "[ERROR] Task could not be deleted, check the ID or name and try again.\n[TIP] Use 'get' to see all tasks"
        );
    }
};

export { deleteTask };
