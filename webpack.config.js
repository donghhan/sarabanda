const devMode = process.env.NODE_ENV !== "production";
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.bundle.js",
  },
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
    ],
  },
  plugins: [new MiniCssExtractPlugin({ filename: "css/styles.css" })],
};
