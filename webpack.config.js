const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/scripts/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        plugins: ['transform-class-properties']
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: './vendor/fonts/[name].[ext]'
                    }
                }
            },
            {
                test: /\.(png|jpe?g|gif|ico|svg|webp)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: './images/[name].[ext]'
                    }
                },
                //         {
                //     loader: 'image-webpack-loader',
                //     options: {}
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ]
}
