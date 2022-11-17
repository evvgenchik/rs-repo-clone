const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: {
    main: path.join(__dirname, 'js', 'script.js'),
    gallery: path.join(__dirname, 'js', 'gallery.js'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  devServer: {
    static: path.resolve(__dirname),
    port: 8080,
    open: true,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      template: path.join(__dirname, 'template.html'), // шаблон
      filename: 'index.html', // название выходного файла
      chunks: ["main"]
    }),
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      template: path.join(__dirname, 'galery.html'), // шаблон
      filename: 'galery.html', // название выходного файла
      chunks: ["gallery"]

    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      // изображения
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      }
    ],
  }
}