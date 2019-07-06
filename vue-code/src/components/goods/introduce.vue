<template>
    <div class="tmpl">
        <nav-bar title="商品介绍"></nav-bar>

        <div class="images" v-for="(img,index) in imgs_url" :key="index">
            <img v-lazy="img">
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                imgs_url:[]
            }
        },
        created(){
            let gId = this.$route.query.gId
            this.$ajax.get('/goods/introduce?gId='+gId)
                .then(res=>{
                    this.introduce = res.data.message
                    this.imgs_url = this.introduce.imgs_url
                })
        }
    }
</script>

<style scoped>
    .images{
        width: 100%;
        padding: 4px;
    }
    .images img {
        width: 100%;
    }
</style>