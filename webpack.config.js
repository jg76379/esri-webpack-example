const path = require('path');
const ArcGISPlugin = require("@arcgis/webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.js',
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
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
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
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        modules: [path.resolve(__dirname, "/src"), "node_modules/"],
        extensions: [".js", ".scss"]
      },
    
    externals: [
        (context, request, callback) => {
            if (/pe-wasm$/.test(request)) {
            return callback(null, "amd " + request);
            }
            callback();
        }
    ],
    node: {
        process: false,
        global: false,
        fs: "empty",
    }
};