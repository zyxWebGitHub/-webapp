<template>
    <div>
        <nav-bar title="登录/注册"></nav-bar>
        <div class="login_register">
            <div class="select">
                <ul>
                    <li v-for="(select,index) in selectList" :class="activeClass == index ? 'active':''"  :key="index" @click="selected(index)">{{ select }}</li>
                </ul>
            </div>
            <div class="login" v-if="activeClass == 0">
                <input type="text" name="username" placeholder="用户名" v-model="username">
                <input type="password" name="password" placeholder="密码" v-model="password">
                <mt-button type="default" size="large" @click="toLogin">登录</mt-button>
            </div>
            <div class="register" v-if="activeClass == 1">
                <input type="text" name="phone" placeholder="手机号" v-model="phone">
                <input type="text" name="username" placeholder="用户名" v-model="username">
                <input type="password" name="password" placeholder="密码" v-model="password">
                <mt-button type="default" size="large" @click="toRegister">注册</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                selectList:['登录','注册'],
                activeClass:0,
                username:'',
                password:'',
                phone:''
            }
        },
        methods:{
            selected(index){
                this.activeClass = index
            },
            toLogin(){
                this.$ajax({
                    method:'post',
                    url:'/member/login',
                    data:{
                        username: this.username,
                        password: this.password
                    },
                    withCredentials: true

                })
                    .then(res=>{
                        let err_code = res.data.err_code
                        console.log(err_code)
                        if(err_code === 0){
                            this.$toast({
                                message: '登录成功',
                                position: 'middle',
                                duration: 1000
                            })
                            this.$router.replace({name:'member'})
                        }else if(err_code === 1){
                            this.$toast({
                                message: '用户名或者密码错误',
                                position: 'middle',
                                duration: 1000
                            })
                        }else if (err_code === 500){
                            this.$toast({
                                message: '服务器繁忙，请稍后重试',
                                position: 'middle',
                                duration: 1000
                            });
                        }

                    })
            },
            toRegister(){
                this.$ajax({
                    method: 'post',
                    url: '/member/register',
                    data: {
                        username:this.username,
                        password:this.password,
                        phone:this.phone
                    },
                    withCredentials: true
                })
                    .then(res=>{
                        let err_code = res.data.err_code
                        if(err_code === 0){//注册成功
                            this.$toast({
                                message: '注册成功',
                                position: 'middle',
                                duration: 1000
                            })
                            this.$router.replace({name:'member'})
                        } else if( err_code === 1){
                            this.$toast({
                                message: '手机号或者用户名已存在',
                                position: 'middle',
                                duration: 1000
                            })
                        } else if(err_code === 500){
                            this.$toast({
                                message: '服务器繁忙，请稍后重试',
                                position: 'middle',
                                duration: 1000
                            })
                        }
                    })
            }
        }
    }
</script>

<style scoped>
    .login_register {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 666;
        background-color: #FF7160;
    }
    .select ul{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 10%;
        width: 60%;
        height: 2.2em;
        line-height: 2.2em;
        border-top: 1px solid #fff;
        display: flex;
    }
    .select ul li {
        flex: 1;
        text-align: center;
        color: rgba(250,250,250,0.5);
    }
    .active {
        color: #fff!important;
        font-weight: 700;
    }
    .login,.register {
        position: absolute;
        width: 60%;
        height: 10em;
        left: 50%;
        top: 38%;
        transform: translate(-50%,-50%);
        color: #999;
    }
    input {
        border: 0;
    }
    .hide {
        display: none;
    }

</style>