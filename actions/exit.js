import { db } from "../utilities/database.js";

const exitApp = () => {
	db.close();
	console.log("\nexiting NanoTasks, goodbye! contact iNewHereOnGit on GitHub for support");
	process.exit(0);
};

export { exitApp };
