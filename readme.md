## 1. webpack5新特性
- 启动命令
- 持久化缓存
- 资源模块
- moduleId & chunkId的优化
- 更智能的tree shaking
- nodejs的 polyfill脚本移除
- 模块联邦

## 2. 启动命令

### 2.1 安装

```
npm i webpack webpack-cli webpack-dev-server html-webpack-plugin babel-loader @babel/core @babel/preset-env @babel/preset-react style-loader css-loader
npm i react react-dom --save

```

### 2.2 webpack.config.js

```
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    devServer: {
        port: 8080
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}

```

## 3. 持久化缓存

- webpack会缓存生成的webpack模块和chunk，来改善构建速度
- 缓存在webpack5中默认开启，缓存默认是在内存里，但可以对cache进行设置
- webpack追踪了每个模块的依赖，并创建了文件系统快照，此快照会与真实系统进行比较，当检测到差异时，将触发对应模块的重新构建

https://github.com/cnpm/cnpm/issue/335
```

```

next.js  react ssr
nuxt.js  vue  ssr
nest.js  node框架