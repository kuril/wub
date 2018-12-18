module.exports = {
  preset: 'ts-jest',
  testEnvironment: "jsdom",
  collectCoverageFrom: [
    "**/*.ts?(x)",
    "!**/index.ts?(x)",
    "!**/*.d.ts",
    "!**/node_modules/**"
  ],
  moduleNameMapper: {
    "\\.(sass|css)$": "identity-obj-proxy"
  },
};