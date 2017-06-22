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
</style>
<template>
    <div class="page-container">
        <layout-element :current-tab = 'currentTab'>
            <div slot="body" class="conent-body">
                <div class="title">
                    <span class="fz24 mr5">
                        仓储贷款
                    </span  >
                    <span class="fz14 co_gr" >为了帮助你快速获得贷款,以下信息均为必填</span>
                </div>

                <form action="" method="post" role="form" class="form-horizontal">

                    <div class="form-group form-loan">
                        <div class="col-md-4 col-lg-4 t-r lh34">申请贷款:</div>
                        <div class="col-md-3 col-lg-3 price-input-warp">
                            <input type="text"   v-model="loanInfo.loanPrice" class="form-control " placeholder=""/>
                            <span class="lh34">元</span>
                        </div>
                        <div class="col-md-5 col-lg-5 fz14 co_gr lh34">您可申请金额不能超过{{loanInfo.limitPrice}}元</div>
                    </div>
                    <div class="form-group">
                        <div class="col-md-4 col-lg-4 t-r lh34">还款方式:</div>
                        <div class="col-md-8 col-lg-8 lh34" v-text="loanInfo.backLoanStyleDes">

                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-md-4 col-lg-4 t-r lh34">日利率:</div>
                        <div class="col-md-8 col-lg-8 lh34">
                            <span>{{loanInfo.dayRate}}%/天(例如)</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-md-4 col-lg-4 t-r lh34">店铺类型:</div>
                        <div class="col-md-8 col-lg-8 lh34">
                            <label for ="shopStyle1"  class="m0">独立平台</label>
                            <input id="shopStyle1" v-model="loanInfo.shopStyle" class="m0 mr5" type='radio'  value= "1" name="shopStyle"/>
                            <label for ="shopStyle2" class="m0">淘宝全球购</label>
                            <input id="shopStyle2" v-model="loanInfo.shopStyle" class="m0 mr5" type='radio' value= "2" name="shopStyle"/>
                        </div>
                    </div>



                    <div>
                        <div>
                            <div class="col-md-12 col-lg-12 loan-info-title">企业基本信息:</div>
                            <div class="clearfix"></div>
                        </div>


                        <div class="form-group ">
                            <div class="col-md-4 col-lg-4 t-r lh34">公司名称:</div>
                            <div class="col-md-4 col-lg-4 ">
                                <input type="text"  class="form-control" v-model="companyInfo.companyName"  placeholder=""/>
                            </div>
                        </div>
                        <div class="form-group ">
                            <div class="col-md-4 col-lg-4 t-r lh34">工商注册号:</div>
                            <div class="col-md-4 col-lg-4 lh34">
                                <span>{{companyInfo.companyCode}}</span>
                                <a href=""> 点击修改</a>
                            </div>
                        </div>
                        <div class="form-group ">
                            <div class="col-md-4 col-lg-4 t-r lh34">公司固定电话:</div>
                            <div class="col-md-3 col-lg-3 ">
                                <input type="text"  class="form-control" v-model="companyInfo.companyPhone" placeholder=""/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div class="col-md-12 col-lg-12 loan-info-title">法定代表人基本信息:</div>
                            <div class="clearfix"></div>
                        </div>


                        <div class="form-group ">
                            <div class="col-md-4 col-lg-4 t-r lh34">真实姓名:</div>
                            <div class="col-md-4 col-lg-4 ">
                                <input type="text"  class="form-control "  v-model="companyOwnerInfo.name"   placeholder=""/>
                            </div>
                        </div>
                        <div class="form-group ">
                            <div class="col-md-4 col-lg-4 t-r lh34">支付宝绑定手机号:</div>
                            <div class="col-md-4 col-lg-4 lh34">
                                <span>{{companyOwnerInfo.phone}}</span>
                            </div>
                        </div>
                        <div class="form-group ">
                            <div class="col-md-4 col-lg-4 t-r lh34">身份证号码:</div>
                            <div class="col-md-4 col-lg-4 lh34">
                                <span>{{companyOwnerInfo.identityCard}}</span>
                                <a href=""> 点击修改</a>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-4 col-lg-4 t-r lh34">婚姻状况:</div>
                            <div class="col-md-8 col-lg-8 lh34">
                                <input class="m0" id="marriageinfo1"  v-model="companyOwnerInfo.marriageinfo" value= "1" type='radio' name="marriageinfo"/>
                                <label class="m0 mr10" for="marriageinfo1">未婚</label>
                                <input class="m0 " id="marriageinfo2" v-model="companyOwnerInfo.marriageinfo" value= "2" type='radio' name="marriageinfo"/>
                                <label class="m0 mr10"  for="marriageinfo2">已婚</label>
                                <input class="m0 " id="marriageinfo3" v-model="companyOwnerInfo.marriageinfo" value= "3" type='radio' name="marriageinfo"/>
                                <label class="m0 mr10" for="marriageinfo3">离异</label>
                                <input class="m0 " id="marriageinfo4" v-model="companyOwnerInfo.marriageinfo" value= "4" type='radio' name="marriageinfo"/>
                                <label class="m0 mr10" for="marriageinfo4">丧偶</label>
                            </div>
                        </div>

                        <div class="form-group ">
                            <div class="col-md-4 col-lg-4 t-r lh34">配偶姓名:</div>
                            <div class="col-md-3 col-lg-3 ">
                                <input type="text"  class="form-control" v-model="companyOwnerInfo.mateName" placeholder=""/>
                            </div>
                        </div>

                        <div class="form-group ">
                            <div class="col-md-4 col-lg-4 t-r lh34">身份号码:</div>
                            <div class="col-md-4 col-lg-4 ">
                                <input type="text"  class="form-control" v-model="companyOwnerInfo.mateIdentityCard" placeholder=""/>
                            </div>
                        </div>

                        <div class="form-group ">
                            <div class="col-md-4 col-lg-4 t-r lh34">手机号码:</div>
                            <div class="col-md-3 col-lg-3 ">
                                <input type="text"  class="form-control" v-model="companyOwnerInfo.matePhone" placeholder=""/>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-4 col-lg-4 t-r lh34">经营人与注册人的关系:</div>
                            <div class="col-md-8 col-lg-8 lh34">
                                <input class="m0 " id="operateRegisterRelation1" type='radio' v-model="companyOwnerInfo.operateRegisterRelation" value="1" name="operateRegisterRelation"/>
                                <label class="m0 mr10" for="operateRegisterRelation1">本人</label>
                                <input class="m0 " id="operateRegisterRelation2" type='radio'  v-model="companyOwnerInfo.operateRegisterRelation" value="2" name="operateRegisterRelation"/>
                                <label class="m0 mr10" for="operateRegisterRelation2">夫妻</label>
                                <input class="m0 " id="operateRegisterRelation3" type='radio'  v-model="companyOwnerInfo.operateRegisterRelation" value="3" name="operateRegisterRelation"/>
                                <label class="m0 mr10" for="operateRegisterRelation3">朋友</label>
                                <input class="m0 " id="operateRegisterRelation4" type='radio'  v-model="companyOwnerInfo.operateRegisterRelation" value="4" name="operateRegisterRelation"/>
                                <label class="m0 mr10" for="operateRegisterRelation4">直系亲属</label>
                                <input class="m0 " id="operateRegisterRelation5" type='radio'  v-model="companyOwnerInfo.operateRegisterRelation" value="5" name="operateRegisterRelation"/>
                                <label class="m0 mr10" for="operateRegisterRelation5">其他</label>
                            </div>
                        </div>

                        <div class="form-group ">
                            <div class="col-md-4 col-lg-4 t-r lh34">店铺经营地:</div>
                            <div class="col-md-4 col-lg-4 ">
                                <input type="text"  class="form-control " v-model="companyOwnerInfo.adress" placeholder=""/>
                            </div>
                        </div>

                        <div class="form-group ">
                            <div class="col-md-4 col-lg-4 t-r lh34">常驻地址:</div>
                            <div class="col-md-4 col-lg-4 ">
                                <input type="text" class="form-control " v-model="companyOwnerInfo.shopAdress" placeholder=""/>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div>
                            <div class="col-md-12 col-lg-12 loan-info-title">紧急联系人:</div>
                            <div class="clearfix"></div>
                        </div>
                        <div class="form-group ">
                            <div class="col-md-4 col-lg-4 t-r lh34">联系人姓名:</div>
                            <div class="col-md-2 col-lg-2 ">
                                <input type="text"  class="form-control" v-model="exigencyLinkManInfo.name" placeholder=""/>
                            </div>
                        </div>

                        <div class="form-group ">
                            <div class="col-md-4 col-lg-4 t-r lh34">手机号码:</div>
                            <div class="col-md-3 col-lg-3 lh34">
                                <input type="text"  class="form-control" v-model="exigencyLinkManInfo.phone"  placeholder=""/>
                            </div>
                        </div>



                        <div class="form-group">
                            <div class="col-md-4 col-lg-4 t-r lh34">与借贷企业关系:</div>
                            <div class="col-md-8 col-lg-8 lh34">
                                <input class="m0" id="registerRelation1" value="1" type='radio' v-model="exigencyLinkManInfo.registerRelation" name="registerRelation"/>
                                <label class="m0 mr10" for="registerRelation1">直系亲属</label>
                                <input class="m0 " id="registerRelation2" value="2" type='radio'  v-model="exigencyLinkManInfo.registerRelation" name="registerRelation"/>
                                <label class="m0 mr10" for="registerRelation2">合伙人</label>
                                <input class="m0 " id="registerRelation3" value="3" type='radio'  v-model="exigencyLinkManInfo.registerRelation" name="registerRelation"/>
                                <label class="m0 mr10" for="registerRelation3">朋友</label>
                                <input class="m0 " id="registerRelation4" value="4" type='radio'  v-model="exigencyLinkManInfo.registerRelation" name="registerRelation"/>
                                <label class="m0 mr10" for="registerRelation4">其他</label>
                            </div>
                        </div>

                        <div class="send-code-box">
                            <div class="form-group ">
                                <div class="col-md-4 col-lg-4 t-r lh34"></div>
                                <div class="col-md-8 col-lg-8 lh34">
                                    <button type="button" class="btn btn-primary ">获取短信验证码</button>
                                    <span class="co_gr">短信将发送至企业支付宝账号绑定的手机</span>
                                </div>
                            </div>
                            <div class="form-group ">
                                <div class="col-md-4 col-lg-4 t-r lh34"></div>
                                <div class="col-md-8 col-lg-8 lh34">
                                    <input type="text"  class="form-control code-input" placeholder="请输入验证码"/>
                                    <span class="co_gr">如果收到首都时尚西红柿的话说喜欢是是树大根深东莞市的 闪光灯</span>
                                </div>
                            </div>

                        </div>
                        <div class="form-group ">
                            <div class="col-md-4 col-lg-4 t-r lh34"></div>
                            <div class="col-md-8 col-lg-8 lh34">
                                <input type="checkbox" class="m0 mr5"/>
                                <span class="">我已经阅读并同意</span>
                                <a href=""> <<贷款服务条款>> </a>

                            </div>
                        </div>
                        <div class="form-group ">
                            <div class="col-md-4 col-lg-4 t-r lh34"></div>
                            <div class="col-md-8 col-lg-8 lh34">
                                <button type="button" class="btn btn-primary loan-btn">提交申请表</button>

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
                currentTab:"askloan",
                loanInfo:{},
                exigencyLinkManInfo:{},
                companyOwnerInfo:{},
                companyInfo:{}
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
                getAjax("../json/ml-askloan.json",function(res){
                    self.loanInfo = res.loanInfo;
                    self.exigencyLinkManInfo = res.exigencyLinkManInfo;
                    self.companyOwnerInfo = res.companyOwnerInfo;
                    self.companyInfo = res.companyInfo;
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