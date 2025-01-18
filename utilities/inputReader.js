import * as readline from 'node:readline/promises';

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: 'NanoTasks> ',
	completer: completer
});

async function completer(line) {
	const completions = ['get', 'add', 'edit', 'delete', 'help', 'exit'];
	const hits = completions.filter((c) => c.startsWith(line));
	return [hits.length ? hits : completions, line];
}

//prompts user for input
const getInput = async (question) => {
	return rl.question(question);
};

/**
 * Split user input into individual tokens. trims whitespace and converts first token to lowercase
 * @param {string} input
 * @returns {string[]}
 */
const splitTokens = (input) => {
	let tokens = input.split(/\s+/);
	tokens = tokens.map((token) => token.trim());
	tokens[0] = tokens[0].toLowerCase();
	return tokens;
};

export { getInput, splitTokens, rl };
