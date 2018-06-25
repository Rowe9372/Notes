const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	//入口设置
	entry:{
		index:"./src/index.js",
		index2:"./src/index2.js"
	},
	//出口设置
	output:{
		path:path.resolve(__dirname,'dist'),
		filename: "[name].bundle.js"
	},
	//module  rules规则设置
	module:{
		rules:[
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
			},
			{
				test:/\.png|jpg|gif$/,
				use:[
					{
						loader:'url-loader',
						options:{
							limit:10
						}
					}
				]
			},
			{
				test:/\.(sass|scss)$/,
				use:ExtractTextPlugin.extract({
					fallback:'style-loader',
					use:['css-loader','sass-loader'],
					publicPath:'../'
				})
			}
		]
	},
	//插件
	plugins:[
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			filename:'index.html', //生成多个页面，页面名
			chunks:['index'], //页面引用的js
			minify:{ //压缩代码
				collapseWhitespace:true, //去除代码空格
				removeAttributeQuotes:true //去除属性双引号
			},
			hash:true, // 清楚文件緩存
			title:'Webpack',
			template:'./index.html'
		}),
		new HtmlWebpackPlugin({
			filename:'idnex2.html',
			chunks:['index2'],
			minify:{
				collapseWhitespace:true,
				removeAttributeQuotes:true
			},
			hash:true,
			title:'W2',
			template:'./src/index2.html'
		}),
		new ExtractTextPlugin('css/index.css')
	],
	//开发服务器
	devServer:{
		//设置服务器访问的基本目录
		contentBase:path.resolve(__dirname,'dist'),
		//服务器ip地址，localhost /192.150.0.01
		host:'localhost',
		//设置端口号
		port:9000,
		open: true,
		
	},
	//mode 打包输出模式 development or production
	mode:"development"


}