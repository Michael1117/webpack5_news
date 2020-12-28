const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    cache: {
        type: 'memory',  //memory  filesystem
        //cacheDirectory: path.resolve(__dirname, "node_modules/.cache/webpack")
    },
    devServer: {
        port: 8080
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    },
                    
                }]
            },
            {
                test: /\.png$/,
                type: 'asset/resource'  // 对标file-loader
            },
            {
                test: /\.ico$/,
                type: 'asset/inline'   // 对标url-loader 模块的大小<limit base64 字符串
            },
            {
                test: /\.txt$/,
                type: 'asset/source'        // 对标raw-loader
            },
            {
                test: /\.jpg$/,
                type: 'asset',          // 对标raw-loader
                parser: {
                    dataUrlCondition: {
                        maxSize: 4*1024
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}