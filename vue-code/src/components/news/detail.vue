<template>
    <div>
        <!--引入头部导航栏组件-->
        <nav-bar title="新闻详情"></nav-bar>

        <div class="news-detail">
        <h1 class="news-title" v-text="newsDetail.title"></h1>
        <span>发布时间：{{ newsDetail.add_time | translateDate }}</span>
        <span>浏览人数：{{ newsDetail.click }}</span>
        <div class="content" v-html="newsDetail.content"></div>
        <div class="image"><img :src="newsDetail.img_url" alt=""></div>
        </div>

        <!--评论组件-->
        <comment :cid="id"></comment>

    </div>
</template>

<script>
    export default {
        data(){
            return {
                newsDetail:{},
                id:this.$route.query.id
                }

        },
        created(){
            //1. 获取路由参数
            let id = this.$route.query.id
            this.$ajax.get('/news/detail?id='+id)
                .then(res=>{
                    this.newsDetail = res.data.message
                })
                .catch(err=>{
                    console.log(err)
                })

        }

    }
</script>

<style scoped>
    .news-detail{
        padding: 10px 8px;
    }
    .news-title{
        font-size: 16px;
    }
    span {
        font-size: 12px;
        color:#999;
    }
    .content {
        font-size: 14px;
    }
    .image img {
        width: 100%;
    }
</style>