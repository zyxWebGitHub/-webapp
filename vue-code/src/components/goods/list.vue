<template>
    <div class="tmpl">
        <!--顶部公共组件-->
        <nav-bar title="商品列表"></nav-bar>

        <!--vue瀑布流组件-->

        <vue-waterfall-easy :imgsArr="imgsArr" @scrollReachBottom="getData" @click="clickFn">
            <div class="img-info" slot-scope="props">
                <p class="some-info">{{props.value.title}}</p>
            </div>
        </vue-waterfall-easy>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                imgsArr: [],//存放图片
                group:0
            }
        },
        created() {
            this.getData()
        },
        methods: {
            getData() {
                this.$ajax.get('/goods/list?group='+this.group)
                    .then(res => {
                        this.imgsArr = this.imgsArr.concat(res.data.message)
                        console.log(this.imgsArr)
                        this.group++
                    })
            },
            clickFn(index,value){
                //瀑布流中每个图片(商品)的索引值
                let i = value.index
                //获取每个商品的id
                let gId = this.imgsArr[i].gId
                this.$router.push({name:'goods.detail',query:{gId:gId}})

            }

        }

    }
</script>

<style scoped>
    .vue-waterfall-easy-container[data-v-ded6b974]{
        position: absolute;
    }
    .some-info {
        padding: 0.4em;
        font-size: 0.6em;
    }
    .img-info {
        width: 100%;
    }

</style>