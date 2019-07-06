<template>
    <div class="tmpl">
        <!--引入公共头部导航子组件-->
        <nav-bar title="图文详情"></nav-bar>

        <div class="photo-detail">
            <h1 class="photo-title" v-text="photoDetail.title"></h1>
            <span>发布时间：{{ photoDetail.add_time | translateDate }}</span>
            <span>浏览人数：{{ photoDetail.click }}</span>
            <div class="content" v-html="photoDetail.content"></div>
            <!--<img :src="photoDetail.img_url" alt="">-->
            <!--图片缩放预览-->
            <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
        </div>

        <!--评论组件-->
        <comment :cid="id"></comment>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                photoDetail:{},
                slide1:[],
                id:this.$route.params.id, //记录当前图文id
            }
        },
        created(){
            let id = this.$route.params.id
            this.$ajax.get('/photo/detail?id='+id)
                .then(res=>{
                    this.photoDetail = res.data.message
                    this.slide1 = res.data.message.img_url
                    //forEach
                    this.slide1.forEach((ele)=>{
                        ele.w=600
                        ele.h=400 //缩率图显示的高
                        ele.msrc = ele.src
                    })
                })
                .catch(err=>{
                    console.log(err)
                })

        },
        methods:{
            handleClose () {
                console.log('close event')
            }
        }
    }
</script>

<style scoped>
    .photo-detail{
        padding: 10px 8px;
    }
    .photo-title{
        font-size: 1em;
    }
    span {
        font-size: 12px;
        color:#999;
    }
    .content {
        font-size: 0.9em;
    }

    .content_list ul {
        width: 100%;
        font-size: 0.8em;
    }
    .content_list ul li{
        width: 100%;
        padding: 1em;
    }

</style>