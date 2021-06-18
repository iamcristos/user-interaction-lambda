module.exports = {
    verbose: true,
    preset: '@shelf/jest-dynamodb',
    moduleDirectories: ["node_modules", "src"] ,
    "roots": [
    "<rootDir>"
  ],
  "testMatch": [
    "tests/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    'src/(.*)$': '<rootDir>/src/$1',
    'libs/(.*)$': '<rootDir>/src/libs/$1',
    'dynamoDb/(.*)$': '<rootDir>/src/dynamo/$1',
  },
    setupFiles: ["<rootDir>/setEnvVars.js"]
}