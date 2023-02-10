const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

const devMode = process.env.NODE_ENV === "development";

module.exports = {
  entry: "./src/init.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  mode: none,
  watch: true,
  module: {
    rules: [
      {
        test: /\.html$/i,
        type: "asset/resource",
      },
      {
        test: /\.(s[ac]ss)$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|svg|jpeg|gif|ico)$/i,
        use: "file-loader",
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "./src/templates",
          to({ context, absoluteFilename }) {
            return `templates/${path.relative(context, absoluteFilename)}`;
          },
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "static/styles.css",
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new HtmlMinimizerPlugin({
        parallel: true,
        minimizerOptions: {
          collapseWhitespace: true,
          minifyURLs: true,
          removeComments: true,
        },
      }),
      new CssMinimizerPlugin(),
    ],
  },
};
