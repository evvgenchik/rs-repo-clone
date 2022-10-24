const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		main: path.resolve(__dirname, './src/index.js'),
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].bundle.js',
	},
	devServer: {
		historyApiFallback: true,
		open: true,
		compress: true,
		hot: true,
		port: 8080,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './src/index.html'), // шаблон
			filename: 'index.html', // название выходного файла
		}),
		new CleanWebpackPlugin(),
	],
	module: {
		rules: [
			// JavaScript
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.(scss|css)$/,
				use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
			},
		],
	}
}