<template>
    <div class="tmpl">
        <!--引入顶部公共子组件-->
        <nav-bar title="商品详情"></nav-bar>

        <!--商品图片详情预览-->
        <mt-swipe :auto="0">
            <mt-swipe-item v-for="(img,index) in imgs" :key="index">
                <img :src="img" alt="">
                <span>{{ index+1 }}/{{ imgs.length }}</span>
            </mt-swipe-item>
        </mt-swipe>

        <!--商品介绍-->
        <div class="goods_introduce">
            <span class="price">￥ {{ goodsDetail.price }}</span>
            <span class="oldPrice">价格 {{ goodsDetail.oldPrice }}</span>
            <div class="title">
                {{ goodsDetail.title }}
            </div>
        </div>

        <!--购买数量-->
        <div class="number">
            购买数量
            <span @click="decline">-</span><span>{{ num }}</span><span @click="add">+</span>
        </div>

        <!--详情-->
        <div class="detail" @click="introduce">
            详情介绍
            <span> 查看更多> </span>
        </div>

        <!--宝贝评论-->
        <div class="comment" @click="comment">
            宝贝评论
            <span> 查看更多> </span>
        </div>

        <!--加入购物车、立即购买-->
        <div class="shopCart-purchase">
            <span @click="addShopcart">加入购物车</span>
            <span>立即购买</span>
        </div>
    </div>
</template>

<script>
    //vue中组件通信的对象
    import connect from '../common/connect.js'
    //引入prod工具对象
    import prodTools from '../common/prodTools.js'
    export default {
        data(){
            return {
                goodsDetail:{},//存放商品详情对象
                imgs:[],//存放商品详情中的图片
                num:1
            }
        },
        created(){
            let gId = this.$route.query.gId
            this.$ajax.get('/goods/detail?gId='+gId)
                .then(res=>{
                    this.goodsDetail = res.data.message
                    this.imgs = this.goodsDetail.imgs
                })
                .catch(err=>{
                    console.log(err)
                })
        },
        methods:{
            add(){
                this.num++
            },
            decline(){
                if(this.num <=1) return
                this.num--
            },
            comment(){
                this.$router.push({name:'goods.comment',query:{gId:this.goodsDetail.gId}})
            },
            introduce(){
                this.$router.push({name:'goods.introduce',query:{gId:this.goodsDetail.gId}})
            },
            //添加购物车
            addShopcart(){
                //1、this.$emit（'自定义时间名',要传送的数据）；
                //2、触发当前实例上的时间，要传递的数据会传给监听器；
                connect.$emit('addShopcart',this.num)
                prodTools.addOrUpdate({id:this.goodsDetail.gId,num:this.num})

                this.$toast({
                    message: '添加购物车成功',
                    position: 'middle',
                    duration: 2000
                });

            }
        }
    }
</script>

<style scoped>
    /*商品图片*/
    .mint-swipe {
        height: 200px;
    }
    .mint-swipe img {
        height: 100%;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
    .mint-swipe span {
        display: inline-block;
        width: 2.2em;
        height: 1.3em;
        background-color: rgba(0,0,0,0.4);
        color:#fff;
        position: absolute;
        bottom: 1em;
        right:1.8em;
        border-radius: 1em;
        padding-left: 5px;
        font-size: 0.8em;
    }

    /*商品介绍*/
    .goods_introduce {
        width: 100%;
    }
    .price {
        color: red;
        margin: 1em;
    }
    .oldPrice {
        color:#999;
        font-size: 0.6em;
        text-decoration: line-through;
    }
    .title {
        font-size: 0.8em;
        font-weight: 700;
        padding: 1em;
    }

    /*购买数量*/
    .number,.detail,.comment{
        width: 100%;
        padding: 1em;
        font-size: 0.8em;
        border-top: 4px solid #eee;
    }
    .number span {
        float: right;
        display: inline-block;
        height: 1.6em;
        width: 1.6em;
        margin-right: 1px;
        background-color: #eee;
        text-align: center;
        line-height: 1.6em;
    }
    .detail span,.comment span {
        float: right;
        color: red;
    }

    /*加入购物车、立即购买*/
    .shopCart-purchase{
        height: 2.2em;
        line-height: 2.2em;
        width: 80%;
        margin: 1em auto;
        display: flex;
        color:#fff;
        font-weight: 700;
        text-align: center;
    }
    .shopCart-purchase span {
        flex: 1;
        display: inline-block;
    }
    .shopCart-purchase span:first-child{
        background-color: #FFD33A;
        border-bottom-left-radius: 1em;
        border-top-left-radius: 1em;
    }
    .shopCart-purchase span:last-child{
        background-color: #FF180E;
        border-top-right-radius: 1em;
        border-bottom-right-radius: 1em;
    }

</style>