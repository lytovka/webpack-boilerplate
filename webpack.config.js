const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const OptimizeCssAssetPlugin = require("optimize-css-assets-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

//store hashed files of a given extension if in production mode
const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

const babelOptions = (preset) => {
  const opts = {
    presets: ["@babel/preset-env"],
    plugins: [["@babel/plugin-proposal-class-properties", { loose: true }]],
  };
  if (preset) {
    opts.presets.push(preset);
  }
  return opts;
};

//pass an extra loader to this function if you need to add a CSS preprocessor.
//E.g 'sass-loader' or 'less-loader'
const CSSLoaders = (extraLoader) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true,
      },
    },
    "css-loader",
  ];

  if (extraLoader) {
    loaders.push(extraLoader);
  }

  return loaders;
};

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: {
    main: ["@babel/polyfill", "./index.tsx"],
  },
  output: {
    filename: filename("js"),
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".css", ".js", ".json", ".jpg", ".jsx", ".ts", ".tsx"],
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
  },
  devServer: {
    port: 4200,
    hot: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: "./index.html",
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new MiniCssExtractPlugin({
      filename: filename(".css"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: {
          loader: "babel-loader",
          options: babelOptions(),
        },
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: {
          loader: "babel-loader",
          options: babelOptions("@babel/preset-react"),
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
      {
        test: /\.css$/,
        use: CSSLoaders(),
      },
    ],
  },
};
