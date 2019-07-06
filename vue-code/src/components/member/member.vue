<template>
    <div class="tmpl">
        <nav-bar title="我的信息"></nav-bar>
        <div class="personal">
            <!--未登录-->
            <div v-if="username == '你还未登录'">
            <router-link :to="{name:'member.login'}" class="image">
                <span>登录</span>
            </router-link>
            </div>
            <!--已登录-->
            <div v-else>
                <div class="image"><span>头像</span></div>
            </div>

            <h5>{{ username }}</h5>
        </div>
        <div class="main">
            <ul>
                <li>
                    <span class="mui-icon mui-icon-compose"></span>
                    <h5>我的资料</h5>
                </li>
                <li @click="shopCart">
                    <span class="mui-icon icon-gouwucheman"></span>
                    <h5>我的购物车</h5>
                </li>
                <li>
                    <span class="mui-icon mui-icon-chatboxes"></span>
                    <h5>我的评论</h5>
                </li>
            </ul>
        </div>

        <div class="list">
            <ul>
                <li>
                    <span>我的收藏</span>
                    <span class="mui-icon mui-icon-forward"></span>
                </li>
                <li>
                    <span>发表文章</span>
                    <span class="mui-icon mui-icon-forward"></span>
                </li>
                <li>
                    <span>阅读历史</span>
                    <span class="mui-icon mui-icon-forward"></span>
                </li>
                <li>
                    <span>系统设置</span>
                    <span class="mui-icon mui-icon-forward"></span>
                </li>
            </ul>
        </div>
        <!--退出登录-->
        <div class="logout">
            <mt-button plain type="danger" size="large" @click="logout">
                退出登录
            </mt-button>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                username:'你还未登录'
            }
        },
        created(){
            this.$ajax({
                method:'get',
                url:'/member',
                withCredentials: true//打开cookie
            })
                .then(res=>{
                    this.username = res.data.user.username
                })
        },
        methods:{
            shopCart(){
                this.$router.push({name:'shopcart'})
            },
            logout(){
                this.$ajax({
                    method: 'get',
                    url: '/logout',
                    withCredentials: true
                })
                    .then(res=>{
                        console.log(res.data)
                        this.username = res.data.user.username
                    })
                this.$router.push({name:'home'})
                this.$toast({
                    message: '你已经退出登录',
                    position: 'middle',
                    duration: 1000
                })
            }

        }
    }
</script>

<style scoped>
    .personal{
        width: 100%;
        height: 10em;
        background-color: #F5F5F5;
        position: relative;
    }
    .personal .image{
        position: absolute;
        width: 4em;
        height: 4em;
        line-height: 3.3em;
        left: 50%;
        top: 40%;
        transform: translate(-50%,-50%);
        padding: 0.2em;
        background-color: red;
        border: 2px solid #fff;
        border-radius: 50%;
        text-align: center;

    }
    .image span{
        color:#fff;
        font-weight: 700;
    }
    .personal h5{
        position: absolute;
        bottom: 2em;
        left:50%;
        transform: translateX(-50%);
    }
    .main ul{
        width: 100%;
        padding: 1em 0;
        display: flex;
        border-bottom: 0.4em solid #f5f5f5;
    }
    .main ul li {
        flex: 1;
        text-align: center;
    }
    .main ul li:nth-child(2){
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
    }
    .mui-icon-compose{
        color:#007AFF;
    }
    .icon-gouwucheman {
        color:#FFD412;
    }
    .mui-icon-chatboxes{
        color: #4cd964;
    }

    .list ul li {
        width: 100%;
        padding: 0.8em;
        border-bottom: 1px solid #ccc;
    }
    .mui-icon-forward {
        float: right;
        color: #999;
    }
    .logout{
        width: 100%;
        margin: 1em 0;
        padding: 1em;
    }

</style>