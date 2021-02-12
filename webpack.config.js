const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: `./src/index.ts`,
  output: {
    path: `${__dirname}/public`,
    filename: 'index.js',
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" }
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
  devServer: {
    publicPath: '/',
    contentBase: './public',
    hot: true,
  },
};
