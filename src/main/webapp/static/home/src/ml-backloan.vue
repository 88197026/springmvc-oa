<style lang="sass">

    @charset "utf-8";
    .page-container {
        background: #f1ebeb;
    }
    .conent-body{
        width:970px;
        margin: auto;
        background: #fff;
        padding:20px 10px;
        padding-bottom: 100px;
        color:#333;
        .title{
            border-bottom: 2px solid #e0e0e0;
            padding-bottom: 6px;

        }
        .time-line-box{
            position: relative;
            width: 880px;
            height: 200px;
            margin:auto;
            .line{
                width: 100%;
                height: 10px;
                background-color: #75ce66;
                border-radius: 5px;
                position: absolute;
                top:100px;
                left: 0px;

            }


            .time-icon{
                position: absolute;
                width: 100px;
                height: 100px;
                border-radius: 100%;
                line-height: 100px;
                text-align: center;
                background-color: #e0e0e0;
                color: #666;
                top:53px;
            }
            .time-icon-active{
                background-color:#75ce66;
                color: #fff;

            }
            .icon-1{
                left: 0px;
            }
            .icon-2{
                left: 250px;
            }
            .icon-3{
                left: 500px;
            }
            .icon-4{
                right: 0px;
            }


        }

        .backloan-title{
            padding-left: 10px;
            border-bottom: 1px dashed #e0e0e0;
            margin-bottom: 20px;
            padding-bottom: 6px;
        }

        .backloan-body{
            width: 850px;
            margin: auto;
            background-color: #fafafa;
            padding: 30px 0px 5px 0px;

        }
        .backloan-btn{
            width: 120px;
            height: 40px;
        }
    }
</style>
<template>
    <div class="page-container">
        <layout-element :current-tab = 'currentTab'>
            <div slot="body" class="conent-body">
                <div class="title">
                    <span class="fz24 mr5">
                        提前还款
                    </span>
<!--
                    <span class="fz14 co_gr" >为了帮助你快速获得贷款,以下信息均为必填</span>
-->
                </div>

                <div class="time-line-box">
                    <div class="line"></div>
                    <div class="time-icon icon-1 time-icon-active">
                        选择一笔贷款
                    </div>
                    <div class="time-icon icon-2 time-icon-active">
                        输入还款金额
                    </div>
                    <div class="time-icon icon-3">
                        确认还款金额
                    </div>
                    <div class="time-icon icon-4">
                        完成还款
                    </div>
                </div>

                <div>
                    <p class="backloan-title fz16">请输入需要提前还款的本金</p>
                     <div class="backloan-body mb15">
                         <div class="co_666 bs1 mb15">
                             <div class="form-group mb10 ">
                                 <div class="col-md-6 col-lg-6 t-r lh34">获取时间:</div>
                                 <div class="col-md-6 col-lg-6 ">
                                     <span class="lh34">{{time}}</span>
                                 </div>
                                 <div class="fx"></div>
                             </div>
                             <div class="form-group ">
                                 <div class="col-md-6 col-lg-6 t-r lh34">您可以提前归还的本金总额:</div>
                                 <div class="col-md-6 col-lg-6 ">
                                     <span class="lh34"><span class="co_r">{{price}}</span>元</span>
                                 </div>
                                 <div class="fx"></div>
                             </div>
                         </div>
                         <div class="form-group form-loan">
                             <span class="col-md-6 col-lg-6 t-r lh34 fz16 co_333">请输入您需要归还的本金:</span>
                             <div class="col-md-6 col-lg-6 price-input-warp">
                                 <input type="text"  v-model="backPrice" class="form-control w100 inblock" placeholder=""/>
                                 <span class="lh34 mr5">元</span>
                                 <span class=" fz12 co_gr lh34">支持部分还款</span>
                             </div>
                             <div class="fx"></div>
                         </div>

                     </div>
                    <div class="form-group mt20">
                        <div class="col-md-6 col-lg-6 t-r lh34"></div>
                        <div class="col-md-6 col-lg-6 lh34">
                            <button type="button" class="btn  btn-primary backloan-btn mr20 ">我要还款</button>
                            <a href="../src/ml-choosebackloan.html">返回上一步</a>
                        </div>
                        <div class="fx"></div>

                    </div>

                </div>
            </div>
        </layout-element>
        <loading  v-ref:loading ></loading>
        <c-alert  v-ref:malert ></c-alert>
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
                currentTab:"backloan",
                time:"",
                price:0,
                backPrice:""
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
                getAjax("../json/ml-backloan.json",function(res){
                    console.dir(res);
                    self.time = res.time;
                    self.price = res.price;

                })
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