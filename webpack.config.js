const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve("web"),
        filename: "index.js",
    },
    mode: "development",
    devtool: "source-map",
};
