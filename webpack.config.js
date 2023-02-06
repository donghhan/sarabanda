const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.bundle.js",
    clean: true,
  },
  mode: "development",
  watch: "development" ? true : false,
  module: {
    rules: [
      {
        // Javascript
        test: /\.m?js$/,
        exclude: [
          /(node_modules|bower_components)/,
          /node_modules[\\\/]webpack[\\\/]buildin/,
        ],
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
      // SCSS
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { sourceMap: true } },
          { loader: "sass-loader", options: { sourceMap: true } },
        ],
        exclude: /node_modules/,
      },
      // HTML
      {
        test: /\.html$/i,
        type: "asset/resource",
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        test: /\.css$/i,
        exclude: /node_modules/,
      }),
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        exclude: /node_modules/,
      }),
      new HtmlMinimizerPlugin({
        minimizerOptions: { collapseWhitespace: true },
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
      linkType: "text/css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "src/templates/",
          to: "templates",
        },
      ],
    }),
  ],
};
