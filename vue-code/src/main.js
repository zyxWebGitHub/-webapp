//引入第三方包开始====================================

import Vue from 'vue'


//引入路由对象
import VueRouter from 'vue-router'
//安装路由
Vue.use(VueRouter)


//引入mint-ui
import Mint from 'mint-ui'
//引入ui的css样式
import 'mint-ui/lib/style.css'
//安装mint-ui
Vue.use(Mint)
//引入MUI样式
import './static/vendor/mui/dist/css/mui.css'

//引入自己的css样式
import './static/css/global.css'


//引入axios
import Axios from 'axios'
import qs from 'qs'
//挂载axios到vue原型中
Vue.prototype.$ajax = Axios
Vue.prototype.$qs = qs

//设置默认的公共url部分
Axios.defaults.baseURL = 'http://t2b4730032.zicp.vip'
//引入moment格式化时间
import Moment from 'moment'

//引入vue-preview 图片缩放
import VuePreview from 'vue-preview'
Vue.use(VuePreview)


//这是一个vue组件，包含瀑布流布局和无限滚动加载
import vueWaterfallEasy from 'vue-waterfall-easy'
Vue.component('vueWaterfallEasy',vueWaterfallEasy)





//引入第三方包结束=====================================


//引入全局公用组件
import NavBar from './components/common/navbar.vue'
import Comment from './components/common/comment.vue'

//定义全局组件或过滤器，大家都能使用 开始
Vue.filter('translateDate',function(value){
    return Moment(value).format('YYYY-MM-DD')
})
Vue.component('navBar', NavBar)
Vue.component('comment',Comment)




//引入自己的vue文件开始=================================

import App from './app.vue'
import Home from './components/home/home.vue'
import Member from './components/member/member.vue'
import Login from './components/member/login.vue'
import Shopcart from './components/shopcart/shopcart.vue'
import Search from './components/search/search.vue'
import NewsList from './components/news/list.vue'
import NewsDetail from './components/news/detail.vue'
import PhotoShare from './components/photo/share.vue'
import PhotoDetail from './components/photo/detail.vue'
import GoodsList from './components/goods/list.vue'
import GoodsDetail from './components/goods/detail.vue'
import GoodsComment from './components/goods/comment.vue'
import GoodsIntroduce from './components/goods/introduce.vue'
import VideoList from './components/video/list.vue'
import VideoDetail from './components/video/detail.vue'

//引入自己的vue文件结束=================================




//创建对象并配置路由规则 导航==============================
let router = new VueRouter({
    linkActiveClass:'mui-active',
    routes:[
        //配置路由规则
        { path:'/' , redirect:{name:'home'} }, //重定向
        { name:'home', path:'/home', component:Home }, //首页
        { name:'member', path:'/member',component: Member }, //我的
        { name:'member.login', path:'/member/login', component: Login},//登录
        { name:'shopcart', path:'/shopcart', component:Shopcart}, //购物车
        { name:'search', path:'/search', component: Search }, //查找
        { name:'news.list', path:'/news/list', component:NewsList }, //新闻列表
        { name:'news.detail', path:'/news/detail', component:NewsDetail}, //新闻详情
        { name:'photo.list',path:'/photo/share', component:PhotoShare}, //图文列表
        { name:'photo.detail',path:'/photo/detail/:id',component:PhotoDetail }, //图文详情
        { name:'goods.list', path:'/goods/list' , component:GoodsList }, //商品列表
        { name:'goods.detail', path:'/goods/detail',component:GoodsDetail }, //商品详情
        { name:'goods.comment', path:'/goods/comment',component:GoodsComment }, //商品评论
        { name:'goods.introduce',path:'/goods/introduce',component:GoodsIntroduce},//商品介绍
        { name:'video.list',path:'/video/list',component:VideoList},//视频列表
        { name:'video.detail',path:'/video/detail',component:VideoDetail}//视频列表
    ]
})





//创建vue实例==========================================
new Vue({
    el:'#app',
    router:router,
    render:c => c(App)
})