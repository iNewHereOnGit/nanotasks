import { db } from "../utilities/database.js";

/**
 * retrieve all lists from the database sorted by name, shows description, if present
 * @param {string} sortType
 * @returns {Array<String>|Boolean}
 */
const getAllLists = () => {
	try {
		const rawLists = db.prepare("SELECT * FROM lists").all();
		return rawLists.sort();
	} catch (error) {
		return { err: `(error) couldn't read from database, try again. Msg: ${error.message}` };
	}
};

export { getAllLists };
