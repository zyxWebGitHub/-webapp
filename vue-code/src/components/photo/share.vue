<template>
    <div class="tmpl">
        <!--引入头部公共导航栏子组件-->
        <nav-bar title="图片列表"></nav-bar>

        <!--图片分类导航栏-->
        <div class="category">
            <ul>
                <li v-for="(category,index) in categorys" :class="activeClass == index ? 'active':''"  :key="index">
                    <a href="javascript:;" @click="loadImg(category.id,index)">{{ category.title }}</a>
                </li>
            </ul>
        </div>

        <!--图文内容-->
        <div class="photo-list">
            <ul >
                <li v-for="img in photos" :key="img.id">
                    <router-link :to="{name:'photo.detail',params:{id:img.id}}">
                        <!--<img :src="img.img_url" alt="">-->
                        <!--图片懒加载-->
                        <img v-lazy="img.img_url">
                        <p>
                        <span v-text="img.title"></span><br/>
                        <span v-text="img.content"></span>
                        </p>
                    </router-link>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
    export default {
        data(){
            return {
                categorys:[],
                photos:[],
                activeClass: 0
            }
        },
        created(){
            this.$ajax.get('/photo/category')
                .then(res=>{
                    this.categorys = res.data.message.categorys
                    //将 “全部” 这个分类添加到数组第一个
                    this.categorys.unshift({
                        id:0,
                        title:'全部'
                    })
                })
                .catch(err=>{
                    console.log(err)
                })
            //当页面加载默认显示全部图片数据
            this.loadImg(0)
            this.activeClass = 0

        },
        methods:{
            loadImg(id,index){
                this.$ajax.get('/getPhotos?id='+id)
                    .then(res=>{
                        this.photos = res.data.message
                    })
                this.activeClass = index
            }
        }

    }
</script>

<style scoped>

    .category li{
        list-style: none;
        display: inline-block;
        margin-left: 10px;
        height: 30px;
    }
    .category ul{
        /*强制不换行*/
        white-space: nowrap;
        overflow-x: auto;
        padding-left: 0;
        margin: 10px 0;
    }
    .category a{
        color:#999;
    }
    .active{
        font-weight: bolder;
    }

    /*下面的图片*/

    .photo-list li {
        list-style: none;
        position: relative;
        margin-bottom: 6px;
    }

    .photo-list li img {
        width: 100%;
        height: 230px;
        vertical-align: top;
    }

    .photo-list ul {
        padding: 8px;
        margin: 0;
    }

    .photo-list p {
        position: absolute;
        bottom: 0;
        color: white;
        background-color: rgba(0, 0, 0, 0.3);
        margin-bottom: 0;
        padding: 8px;
        height: 116px;
    }

    .photo-list p span:nth-child(1) {
        font-weight: bold;
        font-size: 16px;
    }
    /*图片懒加载样式*/
    image[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
    }
</style>