const devMode = process.env.NODE_ENV !== "production";
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",
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
        use: {
          loader: ["style-loader", "css-loader", "sass-loader"],
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
};
