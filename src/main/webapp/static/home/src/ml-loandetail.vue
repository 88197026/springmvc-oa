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
        .use-detail-info{
            margin-top:45px;
            .progress-warp{
                width: 360px;
                position: relative;
                height:34px;
            .bg-progress{
                background-color: #edf9ef;
                width: 100%;

            }
            .progress{
                position: absolute;
                top:0px;
                left: 0px;
                height: 100%;
            }
            .fd-progress{
                background-color: #059b05;
                width: 30%;
            }

            }
        }

        .detail-info-warp{
            .detail-body-ul{
                padding: 0px 20px;
            }
            .detail-body-ul:nth-child(odd){
                background-color: #f5f5f5;
            }
            .detail-body-ul:nth-child(even){
                background-color: #fff;

            }


        }


    }
</style>
<template>
    <div class="page-container">
        <layout-element :current-tab = 'currentTab'>
            <div slot="body" class="conent-body">
                <div class="title">
                    <span class="fz24 mr5">
                        贷款详情
                    </span  >
                </div>

                <form action="" method="post" role="form" class="form-horizontal">
                    <div class="use-detail-info">
                        <div class=" ">
                            <div class="col-md-3 col-lg-3 t-r lh34 "></div>
                            <div class="col-md-9 col-lg-9 fz16">
                                使用中
                            </div>
                            <div class="fx"></div>
                        </div>
                        <div class=" ">
                            <div class="col-md-3 col-lg-3 t-r lh34"></div>
                            <div class="col-md-9 col-lg-9">
                                已还本金 <span class="co_r">{{baseLoanInfo.backPrice}}</span>元,使用中 <span class="co_g">{{baseLoanInfo.usedPrice}}</span>
                            </div>
                            <div class="fx"></div>

                        </div>
                        <div class="">
                            <div class="col-md-3 col-lg-3 t-r lh34"></div>
                            <div class="col-md-9 col-lg-9 ">
                                <div class="progress-warp mr5 fl">
                                    <div class="progress bg-progress"></div>
                                    <div class="progress fd-progress"></div>
                                </div>
                                <div class="fl">已经还{{baseLoanInfo.usedPricePercentage}}</div>
                            </div>
                            <div class="fx"></div>

                        </div>
                    </div>



                    <div class="detail-info-warp">
                        <div>
                            <div class="col-md-12 col-lg-12 loan-info-title">贷款情况:</div>
                            <div class="clearfix"></div>
                        </div>

                        <div class="detail-body-ul mb20">
                            <div class=" ">
                                <div class="col-md-4 col-lg-4 lh34">贷款编号:{{loanInfo.loanNumber}}</div>
                                <div class="col-md-4 col-lg-4 lh34">
                                    获得贷款金额:{{loanInfo.loanPrice}}元
                                </div>
                                <div class="col-md-4 col-lg-4 lh34"></div>
                                <div class="fx"></div>
                            </div>
                            <div class=" ">
                                <div class="col-md-4 col-lg-4 lh34">贷款时间:{{loanInfo.startTime}}</div>
                                <div class="col-md-4 col-lg-4 lh34">
                                    日利率:{{loanInfo.dayRate}}
                                </div>
                                <div class="col-md-4 col-lg-4 lh34">放款方:{{loanInfo.loanCompany}}</div>
                                <div class="fx"></div>
                            </div>
                            <div class=" ">
                                <div class="col-md-4 col-lg-4 lh34">到期时间:{{loanInfo.endTime}}</div>
                                <div class="col-md-4 col-lg-4 lh34">
                                    合同编号:{{loanInfo.contractNumber}}
                                </div>
                                <div class="col-md-4 col-lg-4 lh34"></div>
                                <div class="fx"></div>
                            </div>
                        </div>

                        <div class="detail-body-ul mb20">
                            <div class=" ">
                                <div class="col-md-4 col-lg-4 lh34">使用金额: <span class="co_r">{{usedLoanInfo.loanPrice}}</span></div>
                                <div class="col-md-4 col-lg-4 lh34">
                                    逾期天数: <span class="co_r">{{usedLoanInfo.delayDay}}天</span>
                                </div>
                                <div class="col-md-4 col-lg-4 lh34"></div>
                                <div class="fx"></div>
                            </div>
                            <div class=" ">
                                <div class="col-md-4 col-lg-4 lh34">应还本金: <span class="co_r">{{usedLoanInfo.backCapital}}</span>  </div>
                                <div class="col-md-4 col-lg-4 lh34">
                                    应还利息: <span class="co_r">{{usedLoanInfo.backInterest}}</span>
                                </div>
                                <div class="col-md-4 col-lg-4 lh34">  应还罚息:  <span class="co_r">{{usedLoanInfo.backBadInterest}}</span>  </div>
                                <div class="fx"></div>
                            </div>
                            <div class=" ">
                                <div class="col-md-4 col-lg-4 lh34">已还本金: <span class="co_g">{{usedLoanInfo.haveBackCapital}}</span>  </div>
                                <div class="col-md-4 col-lg-4 lh34">
                                    <span class="co_g">应还利息: <span class="co_g">{{usedLoanInfo.haveBackInterest}}</span> </span>
                                </div>
                                <div class="col-md-4 col-lg-4 lh34"> 已还罚息: <span class="co_g">{{usedLoanInfo.haveBackBadInterest}}</span> </div>
                                <div class="fx"></div>
                            </div>
                        </div>


                    </div>





                    <div class="loan-code-warp">
                        <div>
                            <div class="col-md-12 col-lg-12 loan-info-title">还款记录:</div>
                            <div class="clearfix"></div>
                        </div>

                        <div>
                            <div class="list-title ">
                                <ul class="">
                                    <li class="w150">创建时间</li>
                                    <li class="w250">支付流水号</li>
                                    <li class="w300">已还金额</li>
                                    <li class="w150">还款方式</li>
                                </ul>
                            </div>
                            <div  class="">
                                <ul class="list-body" v-for="item in  backRecordList">
                                    <li class="w150">{{item.time}}</li>
                                    <li class="w250">{{item.number}}</li>
                                    <li class="w300"> <span class="co_r">{{item.price}}</span>(本金{{item.capital}} 利息{{item.interest}} 手续{{item.procedures}}) </li>
                                    <li class="w150 ">到期扣款</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="loan-code-other">
                        <div>
                            <div class="col-md-12 col-lg-12 loan-info-title">还款记录:</div>
                            <div class="clearfix"></div>
                        </div>

                        <div>
                            <div class="list-title ">
                                <ul class="">
                                    <li class="w150">创建时间</li>
                                    <li class="w250">支付流水号</li>
                                    <li class="w300">发声金额</li>
                                    <li class="w150">还款方式</li>
                                </ul>
                            </div>
                            <div  class="">
                                <ul class="list-body" v-for="item in otherRecordList">
                                    <li class="w150">2016.08.19</li>
                                    <li class="w250">20363437487384789</li>
                                    <li class="w300"> <span class="co_r">672.76</span>(本金657 利息0.00 手续0.00) </li>
                                    <li class="w150 ">到期扣款</li>
                                </ul>
                            </div>
                        </div>
                    </div>


                </form>
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
                baseLoanInfo:{},
                loanInfo:{},
                usedLoanInfo:{},
                backRecordList:[],
                otherRecordList:[]

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
                getAjax("../json/ml-loandetail.json",function(res){
                    console.dir(res);
                    self.baseLoanInfo = res.baseLoanInfo;
                    self.loanInfo = res.loanInfo;
                    self.usedLoanInfo = res.usedLoanInfo;
                    self.backRecordList = res.backRecordList;

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