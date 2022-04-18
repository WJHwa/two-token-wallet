const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const webpack = require("webpack");

// module.exports = {
//   resolve: {
//     fallback: {
//       assert: require.resolve("assert"),
//       crypto: require.resolve("crypto-browserify"),
//       http: require.resolve("stream-http"),
//       https: require.resolve("https-browserify"),
//       os: require.resolve("os-browserify/browser"),
//       stream: require.resolve("stream-browserify"),
//       buffer: require.resolve("buffer"),
//     },
//   },
// };

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
      }),
    ],
    resolve: {
      fallback: {
        stream: require.resolve("stream-browserify"),
        assert: require.resolve("assert"),
        crypto: require.resolve("crypto-browserify"),
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
        os: require.resolve("os-browserify/browser"),
        buffer: require.resolve("buffer"),
      },
    },
  });
};
