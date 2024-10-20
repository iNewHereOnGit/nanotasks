import * as readline from "node:readline/promises";
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const getInput = async (question) => {
    return rl.question(question);
};

export { getInput };
