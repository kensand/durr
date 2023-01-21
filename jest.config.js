/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  roots: ["lib"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testRegex: "^.+\\.test\\.ts$",
  moduleFileExtensions: ["ts", "js"],
  testEnvironment: "node",
};
