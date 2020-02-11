const path = require('path');
const ArcGISPlugin = require("@arcgis/webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.js',
    },
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                // images
                test: /\.(jpe?g|png|gif|webp)$/,
                use: [
                    {
                    loader: 'file-loader',
                    options: {
                        // Inline files smaller than 10 kB (10240 bytes)
                        limit: 10 * 1024,
                    }
                    }
                ],
            },
            {
                // fonts
                test: /\.(wsv|ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                          name: "build/[name].[ext]"
                        }
                    }
                ],
            },
            {
                // CSS
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    },
    plugins: [
        new ArcGISPlugin({
            useDefaultAssetLoaders: false
        }),
        new HtmlWebpackPlugin({
            title: 'ESRI Webpack Test',
            chunksSortMode: "none",
            meta: {
                viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
            }
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
    ],
    // Change module resolution, ArcGIS JS API fails to bundle without this
    resolve: {
        modules: [path.resolve(__dirname, "/src"), "node_modules/"],
        extensions: [".js", ".scss"]
      },
    // exclude these modules to reduce bundle size
    externals: [
        (context, request, callback) => {
            if (/pe-wasm$/.test(request)) {
            return callback(null, "amd " + request);
            }
            callback();
        }
    ],
    // Ignore node globals used in ArcGIS JS API,
    // otherwise webpack will try to bundle them.
    node: {
        process: false,
        global: false,
        fs: "empty",
    },
    // Include source maps in the output
    // devtool: 'cheap-module-eval-source-map',
    // Tell webpack dev server where the build directory is
    devServer: {
        contentBase: './dist'
    },
};