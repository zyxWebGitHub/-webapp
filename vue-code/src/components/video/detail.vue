<template>
    <div class="tmpl">
        <nav-bar title="视频详情"></nav-bar>

        <div class="video-detail">
            <div class="video">
                <video :src="videoDetail.video" :poster="videoDetail.img_url" :controls="control">
                    your browser does not support the video tag
                </video>
            </div>
            <h1 class="video-title" v-text="videoDetail.title"></h1>
            <span>发布时间：{{ videoDetail.add_time | translateDate }}</span>
            <span>浏览人数：{{ videoDetail.click }}</span>
            <div class="content" v-html="videoDetail.content"></div>

        </div>

        <!--评论组件-->
        <comment :cid="id"></comment>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                videoDetail: {},
                id: this.$route.query.id,
                control: true
            }
        },
        created(){
            //1. 获取路由参数
            let id = this.$route.query.id
            this.$ajax.get('/video/detail?id='+id)
                .then(res=>{
                    this.videoDetail = res.data.message
                })
                .catch(err=>{
                    console.log(err)
                })

        }
    }
</script>

<style scoped>
    .video-detail{
        padding: 1em;
    }
    .video-title{
        font-size: 16px;
    }
    span {
        font-size: 12px;
        color:#999;
    }
    .content {
        font-size: 14px;
        margin-top: 1em;
    }
    .video{
        width: 100%;
        overflow: hidden;
    }
    .video video{
        width: 100%;
    }
</style>