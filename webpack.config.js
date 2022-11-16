require('dotenv').config();
const path = require('path');

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DIST_DIR = path.join(__dirname, '/client/dist');
const SRC_DIR = path.join(__dirname, '/client/src');

module.exports = {
  mode: 'development',
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
    // sourceMapFilename: 'source.js.map',
  },
  // entry: {
  //   index: `${SRC_DIR}/index.jsx`,
  //   another: `${SRC_DIR}/components/overview_module/Overview.jsx`,
  // },
  // output: {
  //   filename: `[name].bundle.js`,
  //   path: DIST_DIR,
  //   sourceMapFilename: 'source.js.map',
  // },
  // devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        exclude: [/node_modules/, /_tests_/],
        loader: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
    // moduleIds: 'deterministic',
    // runtimeChunk: 'single',
    // splitChunks: {
    //   chunks: 'async',
    // },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/dist/template.html',
      inject: 'body',
    }),
    new MiniCssExtractPlugin(),
  ],
};
