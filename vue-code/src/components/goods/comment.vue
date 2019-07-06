<template>
    <div class="tmpl">
        <nav-bar title="商品评论"></nav-bar>
        <!--引用公共comment组件-->
        <comment :cid="$route.query.gId"></comment>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                gId:''
            }
        }
    }
</script>

<style scoped>

</style>