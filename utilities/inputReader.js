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
 * @returns {string[]} An array of tokens, error if empty input
 */
const splitTokens = async (input) => {
	const quotePattern = /\"/g;
	const trimmedInput = input.trim();

	if (trimmedInput === '')
		throw new Error(`[ERROR] Empty input, use 'help' for help`);

	const quotesCount = [...trimmedInput.matchAll(quotePattern)].length;

	if (quotesCount % 2 !== 0)
		throw new Error(
			`[ERROR] Invalid string argument, are you missing a quote? use 'help' for help`
		);

	let tokens = trimmedInput.split(/\s+/);
	tokens = tokens.map((token) => token.trim());
	tokens[0] = tokens[0].toLowerCase();
	return tokens;
};

export { getInput, splitTokens, rl };
