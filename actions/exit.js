import { db } from "../utilities/database.js";

const exitApp = () => {
	db.close();
	process.exit(0);
};

export { exitApp };
