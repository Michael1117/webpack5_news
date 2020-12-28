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


## 4. 资源模块

- 资源模块是一种模块类型，它允许使用资源文件() 而无需配置额外loader
- raw-loader => asset/source  导出资源的源代码
- file-loader => asset/resource 发送一个单独文件并导出URL
- url-loader => asset/inline    导出一个资源的data  URL
- asset 在导出一个data  URL和发送一个单独的文件之间自动选择，之前通过使用url-loader, 并且配置资源体积限制实现
- Rule.type
- asset-modules


## 5. URIs
- experiments
- Webpack 5支持在请求中处理协议
- 支持data  支持Base 64或原始编码。MimeType可以在module.rule中被映射到加载器和模块类型

## 6. modules & chunkId的优化
### 6.1 概念和选项
- module: 每一个文件其实都可以看成一个module
- chunk: webpack打包最终生成的代码块，代码块会生成文件，一个文件对应一个chunk
- 在webpack5之前，没有从entry打包的chunk文件，都会以1、2、3...的文件名方式输出，删除某些文件可能导致缓存失效
- 在生产模式下，默认启用这些功能chunkIds: "deterministic"，moduleIds: "deterministic", 此算法采用 确定性 的方式将短数字 ID(3 或 4个字符)短hash值分配给modules和chunks
- chunkId设置为deterministic，则output中chunkFilename里的[name]会被替换成确定性短数字ID
- 虽然chunkId不变(deterministic|natural|named)，但更改chunk内容，chunkhash还是会改变的

可选值|含义|示例
---|:--:|---:
natural|按使用调试的高可读性id|1
named|方便但是的高可读性id|src_two_js.js
deterministic|根据模块名称生成简短的hash值|915
size|根据模块大小生成的数字id|0

## 7. 移除Node.js的polyfill
- webpack4带来了许多node.js核心模块的polyfill，一旦模块中使用了任何核心模块(如crypto), 这些模块就会别自动启用
- webpack5 不再自动引入这些polyfill

```
npm i crypto-js crypto-browserify stream-browserify buffer -D
```
## 8. 更强大的tree-shaking
