## 项目说明文件

说明：没有将项目所依赖的第三方包上传，可自行通过项目说明文件 package.json 下载对应包



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

3、可以在package.json中先提前申明，通过 npm run dev 开发测试效果

```shell
//开发的命令简化
"script":{
    "dev":".\\node_modules\\.bin\\webpack-dev-server --inline --hot --open --port"
    "build":"webpack"
}
```

4、完成打包配置webpack.config.js

5、项目结构

![1562425079397](C:\Users\钟宇雄\AppData\Local\Temp\1562425079397.png)

6、头部		Mint-ui		header

7、底部		MUI		tab bar

8、首页轮播图	Mint UI

9、首页九宫格	MUI

10、配置底部导航路由	

11、路由跳转方法：举一例子	新闻资讯图标 =>	新闻列表

​				a、去那里：方式1：router-link 	:to="{name:'news.list',query:{id:	}}"

​						      方式2：通过点击事件方法：this.$router.push({name:'',query:{id:}})

​				b、导航：	{name:'news.list', 	path:'/news/list',	要去的组件 }

​				c、去了干嘛： 在对应组件内：	发起请求 axios	get或者post

12、课程列表	MUI(图文列表)

13、时间处理	moment.js

14、头部返回	MUI

15、从列表进入详情的实现思想，每一个新闻事件点进去对应该新闻的详情和评论，可以通过一个共有的属		 									   性比如 titleId 进行匹配。

16、图片懒加载	mint-ui 中的 lazy load

17、图片缩列预览功能		vue-preview

18、发表评论	抽离组件		变为全局组件		供多出使用

19、商品列表	采用瀑布流展示	vue-waterfall-easy插件实现

20、加入购物车	

```
购买数量与底下购物车件数通信（子传父）  $emit   $on
crud与本地存储	localStorage	存储例如：{ X001:1, X002:1, X003:2 }//每个商品id作为key,购买数量作为值
```

21、登录注册 	axios + express + session

前端发送 axios 请求时，要想获取 session必须设置 withCreadentials : true
