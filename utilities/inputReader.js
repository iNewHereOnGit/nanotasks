import * as readline from 'node:readline/promises';
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

//prompts user for input
const getInput = async (question) => {
	return rl.question(question);
};

export { getInput };
