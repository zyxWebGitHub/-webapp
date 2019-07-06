<template>
    <div class="tmpl">
        <!--引入头部导航栏组件-->
        <nav-bar title="新闻列表"></nav-bar>

        <!--新闻列表-->
        <ul class="mui-table-view mui-table-view-chevron">
            <li class="mui-table-view-cell mui-media" v-for="news in newslist" :key="news.id">
                <router-link class="mui-navigate-right" :to="{name:'news.detail',query:{ id:news.id }}">
                    <img class="mui-media-object mui-pull-left" :src="news.img_url">
                    <div class="mui-media-body">
                        {{ news.title }}
                        <p class='mui-ellipsis'>阅读量：{{ news.click }}  时间：{{ news.add_time | translateDate }}</p>
                    </div>
                </router-link>
            </li>

        </ul>

    </div>
</template>

<script>
    export default {
        data(){
            return {
                newslist:[],
            }
        },
        created(){
            this.$ajax.get('/news')
                .then(res=>{
                    //console.log(res.data)
                    this.newslist = res.data.message.news
                })
                .catch(err=>{
                    console.log(err)
                })
        }
    }
</script>

<style scoped>
    /*设置列表样式*/
    .mui-media-body{
        font-size: 14px;
    }
    .mui-ellipsis{
        font-size: 12px;
    }
</style>