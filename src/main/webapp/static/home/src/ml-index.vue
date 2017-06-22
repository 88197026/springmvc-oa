<style lang="sass">

    @charset "utf-8";
    .page-container {
        background: #fff;
    }
    .conent-body{
        width:760px;
        margin: auto;
        color:#333;
        .title{
            border-bottom:1px dashed #000;
            font-size:24px;
            margin: 60px 0px;
        }
        .apply-box{
            width:280px;
            margin: auto;
            .apply-title{
                font-size:16px;
            }
            .price{
                width: 100%;
                font-size: 32px;
                color: #b20000;
                height: 78px;
                line-height: 78px;
                text-align: center;
                border: 1px solid #e0e0e0;
            }
            .apply-btn{
                width: 150px;
                height: 50px;
                line-height: 38px;
                font-size: 18px;
                margin: auto;
                display: block;
                a{
                    color: #fff;
                }
            }
        }
    }
</style>
<template>
    <div class="page-container">
        <layout-element :current-tab = 'currentTab'>

            <div slot="body" class="conent-body">
                <p class="title">但丁金融  跨境贷</p>
                 <div class="apply-box">
                     <p class="apply-title">您当前可贷金额</p>
                     <p class="price" v-text = "applyPrice" ></p>
                     <div class="btn btn-success apply-btn"><a href="../src/ml-askloan.html" >填写贷款申请</a> </div>
                 </div>
            </div>
        </layout-element>
        <loading  v-ref:loading ></loading>
        <m-alert  v-ref:malert ></m-alert>
    </div>

</template>
<script>
    import Env from '@ali/lib-env';
    import dispatch from "../common/js/dispatch";
    import { mAlert } from "../common/js/utils";
    import { mtopIo } from "../common/js/utils";
    import { getAjax } from "../common/js/utils";
    module.exports = {
        data: function () {
            return {
                currentTab:"index",
                applyPrice:233
            }
        },
        components: {
            loading: require('../components/loading.vue'),
            cAlert: require('../components/m-alert.vue'),
            layoutElement: require('../components/layout.vue'),
            modalManage: require('../components/modal-manage.vue')
        },
        methods: {

            getIndexAjax:function(){
                var self = this;
                getAjax( "../../../home/index",function(res){
                    self.applyPrice = res.obj.applyPrice;
                })
            },
            checkTuKu:function(){
            }
        },
        events: {
        },
        watch: {
        },
        ready: function() {
            this.getIndexAjax();

        }

    }
</script>