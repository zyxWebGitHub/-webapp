<template>
    <div class="tmpl">
        <!--评论列表-->
        <div class="content_list">
            <ul>
                <li v-for="(comment,index) in comments" :key="index">
                    <span>{{ comment.username }}：</span>
                    <span class="time">{{ comment.time | translateDate }}</span>
                    <div class="speak" >
                        {{ comment.content }}
                    </div>
                </li>
            </ul>
        </div>

        <!--发表评论-->
        <div class="comments">
            <input type="text" name="content" placeholder="发表评论" v-model="msg">
            <button @click="sendComment">发布</button>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                msg:'', //发表的评论
                comments:[], //存放评论数据
                date:''
            }
        },
        created(){
            //调用函数显示评论列表数据
            this.loadList()
        },
        props:['cid'],
        methods:{
            //加载评论数据，显示
            loadList(){
                //获取路由参数  通过不同的请求参数id 匹配对应的评论数据表
                this.$ajax.get('/comments?id='+this.cid)
                    .then(res=>{
                        this.comments = res.data.message
                        //倒叙输出
                        this.comments.reverse()
                        //console.log(this.comments)
                    })
                    .catch(err=>{
                        console.log(err)
                    })
            },
            //发表评论
            sendComment(){
                this.date = new Date()
                let param = new URLSearchParams();
                param.append("username","匿名用户")
                param.append("titleId", this.cid);
                param.append("content", this.msg);
                param.append("time", this.date);
                //发表评论请求后台
                this.$ajax.post('/comments',param)
                    .then(res=>{
                        console.log(res)
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                //调用函数获取最新数据
                this.loadList()
                //清空输入框数据
                this.msg = ''
            }
        }
    }
</script>

<style scoped>
    span {
        font-size: 12px;
        color:#999;
    }
    .content_list ul {
        width: 100%;
        font-size: 0.8em;
    }
    .content_list ul li{
        width: 100%;
        padding: 1em;
    }
    .content_list ul li .time {
        float: right;
    }
    .comments{
        width: 100%;
        height: 50px;
        line-height: 50px;
        position: fixed;
        bottom: 0;
        z-index: 999;
        background-color: #fff;
    }
    .comments input {
        height: 30px;
        width: 78%;
        margin-left: 10px;
        padding-left: 8px;
        border-radius: 12px;
        color:#666;
        font-size: 0.8em;
        background-color: #eee;
    }
    .comments button {
        margin-top: 8px;
    }

</style>