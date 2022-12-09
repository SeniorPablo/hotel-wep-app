const { defaults } = require("jest-config");

module.exports = {
  moduleFileExtensions: [
    ...defaults.moduleFileExtensions,
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
  ],
  moduleDirectories: ["node_modules", "src"],
  reporters: [
    "default",
    ["./node_modules/jest-html-reporter", { pageTitle: "Sentry Report" }],
  ],
  verbose: true,
};
