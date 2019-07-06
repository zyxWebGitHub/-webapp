const htmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    //main是默认入口，也可以是多入口
    entry:{
        main:'./src/main.js'
    },
    //出口
    output:{
        filename: './bundle.js', //指定js文件
        path:path.resolve(__dirname,'dist')//绝对路径
    },
    module: { //关于模块配置
        rules:[ //模块规则（匹配 loader、解析器等选项）
            {
                //test 属性，用于标识出应该被对应的loader 进行转换的某个或者某些文件
                test:/\.css$/,
                //use 属性，表示进行转换时，应该使用哪个 loader。顺序是反过来的
                //css-loader => 加载css文件，
                //style-loader => 使用<style>将css-loader内部样式注入到我们的HTML页面
                //autoprefixer-loader => 自动添加css前缀
                use:[
                     {
                        loader:"style-loader"
                     },{
                        loader:"css-loader",
                        options:{
                            sourceMap:true
                        }
                     }
                    ]
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread']
                    }
                }
            },
            {
                test: /vue-preview.src.*?js$/,
                use:{
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread']
                    }
                }

            },
            {
                test:/\.vue$/,
                use:['vue-loader'] //不需要vue-template-compiler，它是代码上的依赖
            },
            {
                test:/\.(png|jpg|gif|svg|ttf)$/i,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:8192
                        }
                    }
                ]
            }

        ]

    },
    plugins: [
        //插件的执行顺序是依次执行的
        new htmlWebpackPlugin({
            //将src下的template属性描述的文件根据当前配置的output.path,将文件移动到该目录
            template:'./src/index.html'
        }),
        new VueLoaderPlugin()
    ]
}
