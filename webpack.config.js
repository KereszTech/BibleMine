const path = require('path');
const webpack = require('webpack');

module.exports = {
	// Base directory for resolving entry points.
	context: path.resolve(__dirname, 'app'),
	// Where to start building the dependency tree.
	entry: {
		app: '/',
	},
	// Where to transpile the final JS file.
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js',
	},
	watchOptions: {
		aggregateTimeout: 300,
		poll: 1000,
	},
	// Make it work with NW.js
	target: 'electron',
	// Options for resolving module requests.
	resolve: {
		// Directories where to look for modules.
		modules: [
			'node_modules',
			path.join(__dirname, 'app'),
		],
		alias: {
			scenes: path.join(__dirname, 'app/scenes'),
			components: path.join(__dirname, 'app/components'),
		},
	},
	//devServer: {publicPath: "http://localhost:8080/build/"},
	module: {
		rules: [
			// Transpile JS/JSX.
			{
				test: /\.jsx?$/,
				use: [
					'babel-loader',
				],
				exclude: /node_modules/
			},
			// Transpile CSS.
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader?modules',
				],
			},
		],
	},
	plugins: [
		// Create readeable module names in the output.
		new webpack.NamedModulesPlugin(),
		// Enable HMR
		new webpack.HotModuleReplacementPlugin(),
		// Define NODE_ENV developement flag for transpiled frontend code as currently NODE_ENV only exists in Node.js.
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		}),
	],
	// A SourceMap is added as DataUrl to the JavaScript file.
	devtool: 'inline-source-map',
};
