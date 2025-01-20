#!/usr/bin/env node
import * as actions from './utilities/actionLoader.js';
import { getInput, rl, splitTokens } from './utilities/inputReader.js';

console.log(
	`====================== NanoTasks v1.0.0 =====================\nwelcome to NanoTasks, type 'help' for help\ncontact iNewHereOnGit on GitHub for support\n`
);

rl.prompt();

rl.on('line', async (input) => {
	input = input.trim();
	const values = await splitTokens(input).catch((err) => {
		console.log(err.message, '\n');
	});

	rl.prompt();
}).on('close', () => {
	console.log(
		'exiting NanoTasks, goodbye! contact iNewHereOnGit on GitHub for support'
	);
	process.exit(0);
});
