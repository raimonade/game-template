const path = require('path');

module.exports = {
    mode: 'development',
    watch: true,
    entry: ["./app/src/App.ts"],
    devtool: 'eval-source-map',
    module: {
        rules : [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    devServer: {
        contentBase: './app',
        hot:true,
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname + "/dist")
    },
};