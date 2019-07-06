<template>
    <div class="tmpl">
        <nav-bar title="视频列表"></nav-bar>


        <div class="video">
            <ul>
                <li @click="goVideo(video.id)" v-for="video in videolist" :key="video.id">
                    <div class="image">
                        <img :src="video.img_url" alt="">
                        <div class="cover">
                            <h5 class="title">{{ video.title }}</h5>
                            <span>▶</span>
                        </div>
                    </div>
                    <div class="content">
                        <span>时间：{{ video.add_time }}</span>
                        <span>浏览：{{ video.click }}</span>
                    </div>
                </li>
            </ul>

        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                videolist:[],
            }
        },
        created(){
            this.$ajax.get('/video')
                .then(res=>{
                    //console.log(res.data)
                    this.videolist = res.data.message.videos
                })
                .catch(err=>{
                    console.log(err)
                })
        },
        methods:{
            goVideo(vId){
                this.$router.push({name:'video.detail',query:{id:vId}})
            }
        }
    }
</script>

<style scoped>
    /*设置列表样式*/
    .video{
        width: 100%;
        overflow: hidden;
        padding: 1em;
    }
    .video ul li{
        margin-bottom: 2em;
    }
    .video ul li img{
        width: 100%;
        height: 10em;
        margin-bottom: -0.4em;
    }
    .content {
        width: 100%;
        height: 2.2em;
        line-height: 2.2em;
        padding-left: 1em;
        border-bottom: 4px solid #F5F5F5;
    }
    .content span {
        margin-right: 2em;
        font-size: 0.8em;
    }
    .image {
        position: relative;
    }
    .image .cover{
        position: absolute;
        width: 100%;
        height: 10em;
        line-height: 10em;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,0.2);
        color: #fff;
    }
    .cover span {
        position:absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        font-size: 2em;
    }
    .title {
        position: absolute;
        margin: 1em;
        color:#fff;
    }
</style>