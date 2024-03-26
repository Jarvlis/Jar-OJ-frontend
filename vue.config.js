const { defineConfig } = require("@vue/cli-service");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

// let productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

module.exports = defineConfig({
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  transpileDependencies: true,
  chainWebpack(config) {
    config.plugin("monaco").use(
      new MonacoWebpackPlugin({
        languages: ["java"],
        output: "./static/js/monaco-editor",
      })
    );
    config.plugin("bundleAnalyze").use(new BundleAnalyzerPlugin());
    if (process.env.NODE_ENV === "production") {
      config.plugin("loadshReplace").use(new LodashModuleReplacementPlugin());
      config.mode("production");
      config.optimization
        .minimize(true)
        .minimizer("terser")
        .tap((args) => {
          let { terserOptions } = args[0];
          terserOptions.compress.drop_console = true;
          terserOptions.compress.drop_debugger = true;
          return args;
        });
      config.optimization.splitChunks({
        chunks: "all",
        minSize: 20000,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
        cacheGroups: {
          monacoEditor: {
            chunks: "async",
            name: "chunk-monaco-editor",
            priority: 22,
            test: /[\\/]node_modules[\\/]monaco-editor[\\/]/,
            enforce: true,
            reuseExistingChunk: true,
          },
        },
      });
      config.plugin("CompressionPlugin").use(CompressionPlugin, [
        {
          filename: "[path][base].gz",
          algorithm: "gzip",
          // 要压缩的文件（正则）
          test: /\.(js|css|html|svg)\$/,
          // 最小文件开启压缩
          threshold: 10240,
          minRatio: 0.8,
        },
      ]);
    }
  },
});
