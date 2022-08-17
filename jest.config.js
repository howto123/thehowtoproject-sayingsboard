/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	preset: "ts-jest",
	transform: {
			"node_modules/variables/.+\\.(j|t)sx?$": "babel-jest"
		},
	transformIgnorePatterns: [
			"node_modules/(?!variables/.*)"
		]
};