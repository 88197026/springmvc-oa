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



/*        .list-title{
            background: #e5e5e5;
            color: #666;
            font-size: 14px;
            height: 50px;
            line-height:50px;
            padding: 0px 20px;
            li{
                display: inline-block;
            }
        }
        .list-body{
            font-size: 14px;
            height: 50px;
            line-height:50px;
            padding: 0px 20px;
        li{
            display: inline-block;
        }
        }
        .list-body:nth-child(even){
            background-color: #fff;

        }
        .list-body:nth-child(odd){
            background-color: #fbfbfc;


        }*/

        .loan-a-btn{
            color:#fff;
        }
        .loan-a-btn:hover{
            color:#fff;
        }
        .loan-a-btn:visited{
            color:#fff;
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
                    <div class="time-icon icon-2 ">
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
                    <div class="list-title ">
                        <ul class="">
                            <li class="w150">获贷时间</li>
                            <li class="w250">贷款编号</li>
                            <li class="w120">归还本金</li>
                            <li class="w150">利息</li>
                            <li class="w100">详情</li>
                            <li class="w100">操作</li>
                        </ul>
                    </div>
                    <div  class="">
                        <ul v-for="item in list" class="list-body">
                            <li class="w150">{{item.time}}</li>
                            <li class="w250">{{item.number}}</li>
                            <li class="w120 co_g">{{item.price}}</li>
                            <li class="w150 ">{{item.interest}}</li>
                            <li class="w100"><a href="ml-loandetail.html">详情</a></li>
                            <li class="w100"><button type="button" class="btn btn-primary"><a class="loan-a-btn" href="../src/ml-backloan.html">提前还款</a> </button>
                            </li>
                        </ul>






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
                list:[]
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
                getAjax("../json/ml-choosebackloan.json",function(res){
                    console.dir(res);
                    self.list  = res.needBackRecordList;
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