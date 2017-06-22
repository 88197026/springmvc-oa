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
        color:#333;
        .title{
            border-bottom: 2px solid #e0e0e0;
            padding-bottom: 6px;
        }
        .form-loan{
            margin-top:20px;
           .lh34{
               line-height: 34px;
           }
            .price-input-warp{
                input{
                    display: inline;
                    width: 190px;
                }
            }
        }

        .loan-info-title{
            margin-bottom: 20px;
            font-size: 18px;
            border-bottom: 1px dashed #eeeeee;
        }
        .code-input{
            width: 125px;
            display: inline-block;
        }
        .send-code-box{
            background: #f9f7f8;
            padding: 20px 0px;
            margin-bottom: 10px;
        }
        .loan-btn{
            width: 160px;
            height: 46px;
        }
    }
    .loan-tip-warp{
        height: 220px;
        padding: 20px 0px;
        .tip-left{
            float: left;
            width: 300px;
            text-align: center;
            padding-top: 1px;

        }
        .tip-right{
            float: left;
            .tip-price-warp{
                width: 300px;
                height: 30px;

                .tip-icon{
                    display: inline-block;
                    width: 14px;
                    height: 14px;
                    margin-right: 5px;
                }
                .l-color{
                    background-color: #ffe981;
                }
                .h-color{
                    background-color: #fcca60;
                }
            }
        }
    }
    .detail-box-warp{
        .nav-tab{
            padding-left: 20px;
            border-bottom: 2px solid #b20000;
            height: 40px;
            .tab-li{
                width: 126px;
                color: #333;
                background-color: #eae5e1;
                height: 38px;
                text-align: center;
                line-height: 38px;
                display: inline-block;
                margin-right: 2px;
                cursor: pointer;
            }
            .tab-li-active{
                background-color: #b20000;
                color:#fff;
            }

        }

        .detail-box{
            .detail-title{
                padding-left: 40px;
                height: 60px;
                line-height: 60px;
            }
        }

        .list-title{
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
        }
    }
</style>
<template>
    <div class="page-container">
        <layout-element :current-tab = 'currentTab'>
            <div slot="body" class="conent-body">
                <div class="title">
                    <span class="fz24 mr5">
                        贷款管理
                    </span >
                    <a href="">使用中遇到问题</a>
                </div>
                <div class="loan-tip-warp">
                    <div class="tip-left">
                        <p> <span class="co_r" v-text="loanPriceInfo.loanPriceNum"></span>笔贷款总额:</p>
                        <p><span class="co_g" v-text="loanPriceInfo.loanPriceTotal"></span>元</p>
                    </div>
                    <div class="tip-right">
                        <p class="fz18 mb10">使用中的贷款情况 <span class="fz14 co_999">(未还本金):</span></p>
                        <div>
                            <div class="tip-price-warp"><div class="fl"> <span class="tip-icon l-color"></span> <span class="fz16">剩余额度</span></div>  <p class="co_333 fr"><span class="co_g" v-text="loanPriceInfo.loanPriceLeave"></span><span>元</span></p></div>
                            <div class="tip-price-warp"><div class="fl"> <span class="tip-icon h-color"></span> <span class="fz16">贷款额度</span></div>  <p class="co_333 fr"><span class="co_g" v-text="loanPriceInfo.loanPriceUesed"></span><span>元</span></p></div>

                        </div>
                    </div>
                </div>
                <div class="detail-box-warp">
                    <div class="nav-tab">
                        <li class="tab-li" @click ="changeTab(1)" :class="{'tab-li-active': currentTabIndex=='1'}">贷款记录</li>
                        <li class="tab-li" @click="changeTab(2)" :class="{'tab-li-active': currentTabIndex=='2'}">还款记录</li>
                        <li class="tab-li" @click="changeTab(3)" :class="{'tab-li-active': currentTabIndex=='3'}">所有明细</li>
                    </div>
                    <div class="detail-box">
                        <p class="detail-title fz16">获得总贷为: <span class="co_g" v-text="loanPriceInfo.loanPriceTotal"></span>元</p>
                        <div>
                            <div class="list-title ">
                                <ul class="">
                                    <li class="w150">获贷时间</li>
                                    <li class="w250">贷款编号</li>
                                    <li class="w120">产品</li>
                                    <li class="w150">获贷金额</li>
                                    <li class="w100">详情</li>
                                    <li class="w100">所有状态</li>
                                </ul>
                            </div>
                            <div  class="">
                                <ul v-for="item in list" class="list-body">
                                    <li class="w150" >{{item.time}}</li>
                                    <li class="w250">{{item.number}}</li>
                                    <li class="w120">{{item.produce}}</li>
                                    <li class="w150 co_g">{{item.price}}</li>
                                    <li class="w100"><a href="./ml-loandetail.html">详情</a></li>
                                    <li class="w100">{{item.status}}</li>
                                </ul>
                            </div>
                        </div>
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
                currentTab:"loanmange",
                loanPriceInfo:{},
                loanRecordInfo:[],
                loanBackRecordInfo:[],
                loanAllRecordDetailInfo:[],
                list:[],
                currentTabIndex:1
            }
        },
        components: {
            loading: require('../components/loading.vue'),
            cAlert: require('../components/m-alert.vue'),
            layoutElement: require('../components/layout.vue'),
            modalManage: require('../components/modal-manage.vue')
        },
        methods: {
            changeTab:function(index){
                this.currentTabIndex = index;
                index = parseInt(index);
                switch (index){
                    case 1:
                       this.list =  this.loanRecordInfo;
                        break;
                    case 2:
                        this.list =  this.loanBackRecordInfo;

                        break;
                    case 3:
                        this.list =  this.loanAllRecordDetailInfo;
                        break;


                }

            },

            getIndexAjax:function(){
                var self = this;
                getAjax("../json/ml-loanmange.json",function(res){
                    console.dir(res);
                    self.loanPriceInfo = res.loanPriceInfo;
                    self.list = self.loanRecordInfo = res.loanRecordInfo;
                    self.loanBackRecordInfo = res.loanBackRecordInfo;
                    self.loanAllRecordDetailInfo = res.loanAllRecordDetailInfo;
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