## Webpack 4.x

- [official website](https://webpack.js.org/)

### Get Started 
##### 1、Install Webpack --cli 
First let's create a directory, initialize npm, install webpack locally, and install the webpack-cli (the tool used to run webpack on the command line):
```
    mkdir webpack-demo && cd webpack-demo
    npm init -y
    npm install webpack webpack-cli --save-dev
```

##### 2、project
Now we'll create the following directory structure,
```
      webpack
      |- package.json
    + |- index.html
    + |- /src
    +   |- index.js
```


##### 3、webpack.config.js
```javascript
    module.exports = {
        //入口设置   
        entry:{

            },
        //出口设置
        output:{

            },
        //module 
        module:{

            },
        //插件
        plugins:[

        ],
        //开发服务器
        devServer:{

            },
        //mode
        mode:{

        }

    }
```

- entry 入口设置
 三中写法
```
    entry: 'index.js'

    entry: ['./src/index.js','./src/index2.js'] // 多入口

    entry:{
        index:'./src/index.js',
        index2:'./src/index2.js'
    }
```

- output 出口设置

```
    output:{
        //path要设置绝对路径，不然会报错
        path: path.resolve(__dirname,'dist'), //node 中path方法 绝对路径
        filename:[name].bundle.js  //多文件输出  单文件bundle.js
    }
```


##### 4、bundle
``` cmd
    webpack
```

报错：没有设置mode 即开发模式（development） or 生产模式（production）
```
    WARNING in configuration
    The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
    You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/concepts/mode/
```

解决：
```cmd
    webpack --mode production
```

##### 5、package.json
设置script 
```
    "scripts": {
        "build": "webpack --mode production"
        "builds":"webpack --config my.config.js" 
    }
```

```cmd
    npm run build  // 回去找 webpack --mode production并执行
    npm run builds // 会去执行my.config.js中的配置 即webpack.config.js可以修改文件名 
```

##### 6、plugins
[html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin)
下载需要支持的插件，例：html-webpack-plugin  html动态生成插件

```
    npm i html-webpack-plugin -D //-D --save-dev 即只在开发环境使用
```

[clean-webpack-plugin](https://www.npmjs.com/package/clean-webpack-plugin)
清除文件插件 在生成页面之前使用
```
    npm i clean-webpack-plugin -D 
```

##### 7、devServer
[devServer](https://webpack.js.org/configuration/dev-server/#src/components/Sidebar/Sidebar.jsx)
```
    npm i webpack-dev-server -D
```
USER
```
    devServer:{
        //设置服务器访问的基本目录
        contentBase:path.resolve(__dirname,'dist'),
        //服务器ip地址，localhost /192.150.0.01
        host:'localhost',
        //设置端口号
        port:9000,
        //自动打开浏览器
        open:true,
        //热模块
        hot:true,
    },
```

##### 8、loader 

- style-loader  css-loader 解析css样式支持
```
    npm i style-loader css-loader -D
```

user  loader 使用以及三种写法
```
    module :{
        rules:[
            {
                test:/\.css$/,
                //use:['style-loader','css-loader']
                //loader:['style-loader','css-loader']
                use:[
                    {loader:'style-loader'},
                    {loader:'css-loader'}
                ]
            }
        ]
    }
```

- url-loader 图片处理
```
    npm i url-loader file-loader -D
```
url-loader 依赖于file-loader
配置：
```
    rules:[
        {
            test:/\.(png|jpg|gif)$/,
            use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:50;
                        }
                    }
                ]
        }
    ]
```

##### 9、分离css
extract-text-webpack-plugin  分离文件插件
```
    npm i extract-text-webpack-plugin -D

    npm i extract-text-webpack-plugin@next -D  // @next 下载下一个版本
```
配置
```
    module:{
        rules:{
            {
                test:/\.css$/,
                //use:['style-loader','css-loader']
                //loader:['style-loader','css-loader']
                /*use:[
                    {loader:'style-loader'},
                    {loader:'css-loader'}
                ]*/
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:'css-loader',
                    publicPath:'../'  // 解决css背景图，路径问题
                })
            }
        }
    }

    plugin:[
        new ExtractTextPlugin('css/index.css') 
    ]
```

##### less / sass 处理

- less 
```
    npm i less-loader -D

    {
        test:/\.less$/,
        use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:['css-loader','less-loader'],
                    publicPath:'../' 
                })

    }
```

- sass 
```
    npm i node-sass sass-loader -D

    {
        test:/\.(scss/sass)$/,
        use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:['css-loader','sass-loader'],
                    publicPath:'../' 
                })
    }
```

- 前缀处理
```
    npm i postcss-loader autoprefixer -D
```

- 消除冗余css代码
```
    npm i purifycss-webpack purify-css -D

    //引入一个额外的包
    npm i glob -D
    
    //配置路径
    new PurifycssWebpack({
            path:glob.sync(path.join(__dirname,'src/*.html'))
        })
```


### 环境配置、调试

- webpack4.x 开启调试模式
mode :'development'  //即模式为开发模式，在浏览器中的sources 中webpack.文件夹中调试

 - babel 
 编译js
```
    npm i babel-loader babel-core babel-preset-env -D

    //配置：
```

### json、模块化配置 

- webpack 中使用json
webpack4.x默认支持json
- 静态资源输出
```
    npm i copy-webpack-plugin -D

    new CopyWepackPlugin([
            {
                from:path.resolve(__dirname,'src/assets'),
                to:'./public' //输出的路径
             }
        ])
```

### 使用第三方库、优化js
##### 使用第三方库
- npm 直接下载
```
    const jquery = require('jquery');

    //使用
    import $ from './jquery';
```
- ProvidePlugin
```
    const webpack = require('webpack');
    //plugins
    new webpack.ProvidePlugin({
         $:'jquery',
         lodash:'lodash'
        })
```

区别：第一种无论是否使用库，打包都会打进去，代码冗余；第二种，只用使用库，才会打包

##### 提取第三方js库
optimization
```
    optimization:{
        splitChunks:{
            cachaGroups:{
                vendor:{  
                    chunks:'initial',
                    name:'jquery', //入口名称
                    enforce:true
                },
                name:{  
                    chunks:'initial',
                    name:'name', //入口名称
                    enforce:true
                }
            }
        }
    }

```
