<template>
    <div class="header">
        <site-header :current-tab = "currentTab" :user-nick="userNick"></site-header>
    </div>
    <div class="body">
        <slot name="body" ></slot>
    </div>
    <div class="footer">
        <site-footer></site-footer>
    </div>
</template>
<style lang='sass' scoped>
    .wrap {
        width:90%;
        height: 100%;
        margin:0 auto;
    }
    .header {
        width:100%;
        background: #b20000;
        height:60px;
    }
    .body {
        width: 1140px;
        margin: auto;
        min-height:500px;
    }
    .footer {
        text-align:center;
        height:50px;
        line-height:50px;
        background:#b20000;
        color: #fff;
        font-size: 24px;
    }
</style>
<script>
    import { IO } from "../common/js/utils";
    import siteHeader from "../components/site-header.vue";
    import siteFooter from "../components/site-footer.vue";
    import Env from '@ali/lib-env';
    import { getAjax } from "../common/js/utils";
    export default{
        props:{
            "dataSource":{
                type: String,
                default:""
            },
            currentTab:{}
        },

        data:function() {
            return {
                userNick: "未登录"
            }
        },
        methods: {

            getIndexAjax:function(){
                var self = this;
                getAjax("../json/ml-head-index.json",function(res){
                    self.userNick = res.userNick;
                })
            }
        },
        components:{
            siteHeader,
            siteFooter
        },
        // 页面的首屏数据请求放在这里
        ready:function() {
            var self = this;
            self.getIndexAjax();
        }
    }
</script>