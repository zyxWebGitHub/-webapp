<template>
    <div class="tmpl">

        <nav-bar title="购物车"></nav-bar>

        <div class="shopCart">
            <!--没有商品，指引去逛商品-->
            <div class="goShop" :class="{'show':isShow}">
                <span>你的购物车空空如也，快去逛逛商品，添加你的购物车吧！</span>
                <router-link class="go" :to="{name:'goods.list'}">逛逛商品</router-link>
            </div>
            <!--购物车列表-->
            <ul>
                <li v-for="(goods,index) in goodsList" :key="goods.gId">
                    <mt-switch v-model="goods.isPicked"></mt-switch>
                    <div class="delete" @click="del(index)">
                        删除
                    </div>
                    <div class="img_title" @click="goGoods(goods.gId)">
                        <img :src="goods.imgs[0]" alt="">
                        <div class="goods_title">
                            {{ goods.title }}
                        </div>
                    </div>
                    <div class="price_num">
                        <span class="price">￥{{ goods.price }}</span>
                        <div class="number">
                            <span @click="add(index)">+</span>
                            <span>{{ goods.num }}</span>
                            <span @click="dec(index)">-</span>
                        </div>
                    </div>

                </li>
            </ul>
        </div>
        <!--统计结算-->
        <div class="count">
            <span>已选择商品 {{ count.count_num }} 件</span>
            <span>合计 ￥{{ count.count_price }} </span>
            <button>结算</button>
        </div>
        
    </div>
</template>

<script>
    //引入商品操作工具对象
    import prodTools from "../common/prodTools.js"
    //通知底部变更数据
    import connect from "../common/connect.js"

    export default {
        data(){
            return{
                goodsList:[],
                isShow:false
            }
        },
        created(){
            //获取local的数据
            let prods = prodTools.getProds()
            //prods{"G0":4,"G1":2,.....}

            //判断如果没有商品，return
            if(Object.keys(prods).length === 0){
                this.isShow = true
                return
            }

            let url = 'goods/getshopcarlist/'
            url += Object.keys(prods).join(',')

            //发起请求，将本地存储的数据挂载url上
            this.$ajax.get(url)
                .then(res=>{
                    this.goodsList = res.data.message
                    //console.log(this.goodsList)
                    //把localStorage里面存储的商品数量添加到数组的每个对象属性中
                    this.goodsList.forEach((ele,index)=>{
                        if(prods[ele.gId]){

                            // 通过以下在vue中添加属性，是没有办法做到响应的，也就是等下要对其进行动态修改不行
                            // ele.num = prods[ele.gId]
                            // ele.isPicked = true

                            // 解决办法：采用this.$set添加属性
                            this.$set(ele,'num',prods[ele.gId])
                            this.$set(ele,'isPicked',false)
                        }
                    })
                })
                .catch(err=>{

                })
        },
        methods:{
            add(i){
                this.goodsList[i].num++
                connect.$emit('addShopcart',1)
                prodTools.addOrUpdate({
                    id:this.goodsList[i].gId,
                    num:1 //如果存在，追加1，否则新增1
                })
            },
            dec(i){
                if(this.goodsList[i].num <= 1) return
                this.goodsList[i].num--
                connect.$emit('addShopcart',-1)
                prodTools.addOrUpdate({
                    id:this.goodsList[i].gId,
                    num:-1
                })
            },
            del(i){
                // 1、删除localStorage 2、删除内存 3、通知下方小球

                //获取点击删除的对应商品
                let goods = this.goodsList[i]
                //删除localStorage
                prodTools.detel(goods.gId)

                //删除内存
                this.goodsList.splice(i,1)

                //通知下方小球
                connect.$emit('addShopcart',-goods.num)

                // 如果购物车没有商品，出现goShop
                if(this.goodsList.length === 0){
                    this.isShow = true
                }
            },
            //从购物车去到该商品详情
            goGoods(i){
                this.$router.replace({name:'goods.detail',query:{gId:i}})
            }
        },
        //computed比较适合对多个变量或者对象进行处理后返回一个结果值，
        // 也就是数多个变量中的某一个值发生了变化则我们监控的这个值也就会发生变化，
        // 举例：购物车里面的商品列表和总金额之间的关系，只要商品列表里面的商品数量发生变化，
        // 或减少或增多或删除商品，总金额都应该发生变化。
        // 这里的这个总金额使用computed属性来进行计算是最好的选择
        computed:{
            count(){
                //遍历数组goodsList,把所有被选中的商品的价格和数量进行累加
                let count_num = 0
                let count_price = 0
                this.goodsList.forEach((ele)=>{
                    if(ele.isPicked){//如果被选中
                        count_num += ele.num
                        count_price += ele.num * ele.price
                    }
                })
                return {
                    count_num,count_price
                }

            }
        }
    }
</script>

<style scoped>
    .shopCart {
        width: 100%;
        background-color: #F8F8F8;
        padding: 0.8em;
    }
    .goShop {
        width: 100%;
        height: 8em;
        background-color: #fff;
        border-radius: 0.5em;
        padding: 1.2em;
        display: none;
    }
    .goShop span {
        color: #FF8D1C;
        font-size: 0.8em;
        font-weight: 700;
    }
    .goShop .go {
        display: block;
        width: 80%;
        margin: 1em auto;
        height: 2.2em;
        line-height: 2.2em;
        background-color: red;
        color: #fff;
        text-align: center;
        border-radius: 0.6em;
    }
    .show {
        display: block;
    }

    /*购物车列表*/
    .shopCart ul li {
        position: relative;
        width: 100%;
        background-color: #fff;
        border-radius: 6px;
        padding: 0.6em;
        margin-bottom: 1em;
    }
    .shopCart ul li .delete {
        position: absolute;
        right: 2em;
        top: 1em;
        color: red;
        font-size: 0.8em;
    }
    .shopCart ul li .img_title{
        width: 100%;
        padding: 0.4em;
        overflow: hidden;
    }
    .img_title img {
        float: left;
        height: 4em;
        
    }
    .img_title .goods_title{
        font-size: 0.7em;
        width: 60%;
        float: right;
    }
    .price_num{
        margin-top: 0.4em;
        overflow: hidden;
    }
    .price_num .price{
        color: red;
        margin-left: 1em;
    }
    .price_num .number {
        float: right;
        width:4.2em;
        height: 1.2em;
        line-height: 1.2em;
        display: flex;
        margin-right: 1em;
    }
    .price_num .number span {
        background-color: #fff;
        flex: 1;
        text-align: center;
        border: 1px solid #ddd;
    }

    /*统计结算*/
    .count {
        width: 100%;
        height: 3.2em;
        line-height: 3.2em;
        position: fixed;
        bottom: 50px;
        font-size: 0.8em;
        border-top: 1px solid #ddd;
        background-color: #fff;
    }
    .count span {
        margin-left: 1.2em;
    }
    .count span:nth-child(2){
        color: red;
    }
    .count button {
        float: right;
        margin: 0.4em 1.2em;
        background-color: red;
        color: #fff;
        border: 0;
    }
</style>