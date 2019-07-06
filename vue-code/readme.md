## 项目说明文件

1、初始化项目包说明书

```shell
npm init -y
```

2、下载相关依赖包

```shell
npm i mint-ui	//vue的一个UI框架 
npm i vue-preview	//图片预览
npm i axios		//发起请求
npm i vue-router	//路由插件
npm i moment	//日期转换
npm i vue 	//前端框架
一起下载
npm i mint-ui vue-preview axios vue-router moment vue -S  

npm i webpack	//打包
npm i html-webpack-plugin	//插件，生成HTML
npm i css-loader	//加载css文件
npm i style-loader	//使用<style>将css-loader内部样式注入到我们的HTML页面
npm i babel-loader @babel/core @babel/preset-env webpack		//转译js代码
npm i @babel/plugin-transform-runtime	//辅助代码
npm i url-loader file-loader	//文件加载器
npm i vue-loader vue-template-compiler 	//支持打包vue
npm i webpack-dev-server	//小型的Node.js Express服务器
npm i webpack-cli
一起下载
npm i webpack html-webpack-plugin css-loader style-loader babel-loader @babel/core @babel/preset-env webpack @babel/plugin-transform-runtime url-loader file-loader vue-loader vue-template-compiler webpack-dev-server webpack-cli -D  
```

3、可以在package.json中先提前申明

```shell
//开发的命令简化
"script":{
    "dev":".\\node_modules\\.bin\\webpack-dev-server --inline --hot --open --port"
    "build":"webpack"
}
```

4、完成打包配置webpack.config.js

