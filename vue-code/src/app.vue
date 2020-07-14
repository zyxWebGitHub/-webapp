<template>
    <div>
        <!--顶部-->
        <mt-header title="钟宇雄的webApp"></mt-header>

        <router-view></router-view>

        <!--底部-->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item " :to="{name:'home'}">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" :to="{name:'member'}">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">我的</span>
            </router-link>
            <router-link class="mui-tab-item" :to="{name:'shopcart'}">
                <span class="mui-icon icon-gouwucheman"><span class="mui-badge">{{ pickNum }}</span></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item" :to="{name:'search'}">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">查找</span>
            </router-link>
        </nav>
    </div>
</template>

<script>
    import connect from './components/common/connect.js'
    import prodTools from './components/common/prodTools.js'
    export default {
        data(){
            return {
                pickNum:prodTools.getTotalCount()
            }
        },
        created(){
            // //1、实例.$on('事件名',callback) -------callback回调$emit要传送的数据；
            // //2、监听当前实例上自定义时间；
            // connect.$on('addShopcart',function(num) {
            //     //console.log(this)
            //     //这里的this是connect（即new Vue()）,不是我们需要的vueComponent
            //     //要么使用箭头函数，要么提前将this赋值给另一个变量，如何使用另一个变量进行操作
            //
            //     this.pickNum = this.pickNum + num
            // })
            connect.$on('addShopcart',num => {
                console.log(this)
                this.pickNum = this.pickNum + num
            })
        }
    }
</script>

<style scoped>
    /*顶部样式*/
    .mint-header{
        background-color: red;
    }
    /*底部样式*/
    .mui-bar-tab .mui-tab-item.mui-active{
        color: red;
    }
</style>
