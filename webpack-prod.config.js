const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: ["./app/src/App.ts"],

	module: {
		rules: [
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
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname + "/dist")
	},

	plugins: [
		new CleanWebpackPlugin(),

		new UglifyJsPlugin({
			uglifyOptions: {
				compress: {
					drop_console: true
				},
				output: {
					comments: false,
					beautify: false
				}
			}
		}),

		new CopyWebpackPlugin(
			[
				{
					from: './app/assets', to: './assets',
                }			
            ]
		),
		new webpack.DefinePlugin({
			CANVAS_RENDERER: JSON.stringify(true),
			WEBGL_RENDERER: JSON.stringify(true)
		})
	]
};
