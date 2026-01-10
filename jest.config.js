const dotenv = require("dotenv");
dotenv.config({
  path: ".env.development",
});

const nextJest = require("next/jest");

const jestConfig = nextJest({
  dir: "./",
});
const config = jestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimeout: 20000,
});

module.exports = config;
