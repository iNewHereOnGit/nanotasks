import { getInput } from "../utilities/inputReader.js";
import { db } from "../utilities/database.js";

/**
 * Checks if a given field exists in the tasks table
 * @param {string} field - The field to check
 * @returns {boolean} - True if the field is valid, false otherwise
 */
function checkValidField(field) {
    let trimmedField = field.toLowerCase();

    if (trimmedField === "" || trimmedField.length === 0) return false;

    switch (trimmedField) {
        case "name":
        case "priority":
        case "description":
        case "completed":
            return true;
        default:
            return false;
    }
}

const editTask = async () => {
    let rowInfo;
    const rawId = await getInput("Enter ID ");
    let sqlString;

    let trimmedId = rawId.trim();
    trimmedId = Number.parseInt(trimmedId, 10);
    console.log(trimmedId);

    if (trimmedId === "") {
        throw new error("[ERROR]Must enter a task ID");
    }

    trimmedId = Number.parseInt(trimmedId, 10);

    if (
        typeof trimmedId === NaN ||
        Number.isInteger(trimmedId) === false ||
        trimmedId < 1
    ) {
        throw new Error("[ERROR] Task ID must be >= 1");
    }

    const rawField = await getInput(
        "Update the name, priority, descripton or completed status "
    );

    const result = checkValidField(rawField);

    if (!result) {
        throw new Error("[ERROR] Invalid field");
    }

    const rawValue = await getInput("Enter new value ");

    let trimmedField = rawField.trim();
    let trimmedValue = rawValue.trim();

    switch (trimmedField.toLowerCase()) {
        case "name":
            sqlString = `update tasks set title = '${trimmedValue}' where id = ${trimmedId}`;
            console.log(sqlString);
            break;
        case "priority":
            let priority = Number.parseInt(trimmedValue, 10);
            if (
                typeof priority === NaN ||
                Number.isInteger(priority) === false
            ) {
                throw new Error("[ERROR] Priority must be an integer");
            }

            sqlString = `update tasks set priority = ${priority} where id = ${trimmedId}`;
            break;
        case "description":
            sqlString = `update tasks set description = '${trimmedValue}' where id = ${trimmedId}`;
            break;
        case "completed":
            let completed = trimmedValue.toLowerCase();
            if (completed !== "true" && completed !== "false") {
                throw new Error(
                    "[ERROR] Completed status must be 'true' or 'false'"
                );
            }

            if (completed === "true") {
                trimmedValue = true;
            } else if (completed === "false") {
                trimmedValue = false;
            }

            sqlString = `update tasks set completed = ${trimmedValue} where id = ${trimmedId}`;
            break;
        default:
            throw new Error(
                "[ERROR] Invalid field, check the field you're editing and try again"
            );
    }

    try {
        const stmt = db.prepare(sqlString);
        rowInfo = stmt.run();
    } catch (error) {
        throw new Error(
            `[ERROR] Couldn't read from database, try again ${error}`
        );
    }

    if (rowInfo.changes >= 1) {
        return `[Success] Updated task '${trimmedId}'\n[Tip] Use 'get task ${trimmedId}' or 'edit task ${trimmedId}' to update this task\n`;
    } else {
        throw new Error(
            `[ERROR] Task could not be updated, check the ID and try again ${error}`
        );
    }
};

export { editTask };
