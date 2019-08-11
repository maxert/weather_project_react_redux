const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const cssnano = require("cssnano");
const path = require('path');
const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html",
});

module.exports = {
  output: {
    publicPath: "/",
    // path: __dirname + "/dist",
    // filename: "main.js",
  },
  devServer: {
    historyApiFallback: true,
    inline: true,
    contentBase: "/",
    port: 5000,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env", "@babel/react"],
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              minimize: true,
            },
          },
        ],
      },
      { test: /\.(png|jpg)$/, loader: "file-loader" },
      { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: "file-loader" },
      { test: /\.php$/, loader: "ignore-loader" },
    ],
  },
  optimization: {
    namedModules: true,
    namedChunks: true,
    moduleIds: "hashed",
    concatenateModules: true,
    portableRecords: true,
    minimizer: [
      // we specify a custom UglifyJsPlugin here to get source maps in production
      new UglifyJsPlugin({
        test: /\.js(\?.*)?$/i,
        cache: true,
        parallel: 4,
        extractComments: "all",
        uglifyOptions: {
          compress: true,
          ecma: 6,
          mangle: true,
        },
        sourceMap: true,
      }),
    ],
  },
  plugins: [
    htmlWebpackPlugin,
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      'react': path.resolve('./node_modules/react')
    }
  },
};
exports.minifyCSS = ({ options }) => ({
  plugins: [
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: options,
      canPrint: false,
    }),
  ],
});
