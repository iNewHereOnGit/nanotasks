const validateString = (rawInput) => {
	return typeof rawInput.trim() === 'string' && rawInput.length > 0;
};

/**
 * Checks if a given string is a valid task ID. A task ID is an integer >= 0
 * @param {string} rawInput - The input to check
 * @returns {boolean} - True if the input is a valid task ID, false otherwise
 */
const isValidTaskId = (rawInput) => {
	if (rawInput === '') rawInput = undefined;
	const result = Number(rawInput);
	if (Number.isInteger(result) && result >= 0) return true;
	else return false;
};

export { validateString, isValidTaskId };
