const path = require("path");

module.exports = {
    devtool: "source-map",
    entry: "./source/TypeScript/index.tsx",
    mode: "production",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader"
            }
        ]
    },
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "public", "js")
    },
    resolve: {
        extensions: [".tsx"]
    }
}
