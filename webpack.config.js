const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: '[name].js',   // 入口代码块文件名的生成规则
        chunkFilename: '[name].js' //  非入口代码块文件名的生成规则
    },
    optimization: {
        usedExports: true,      // 标注使用到的导出
        moduleIds: 'deterministic',      // 模块名称的生成规则
        chunkIds: 'deterministic'        // 代码块名称的生成规则
    },
    resolve: {
        /* fallback: {
            'crypto': require.resolve('crypto-browserify'),
            'stream': require.resolve('stream-browserify'),
            'buffer': require.resolve('buffer')
        }, */
        fallback: {
            'crypto': false,
            'stream': false,
            'buffer': false
        }
    },
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