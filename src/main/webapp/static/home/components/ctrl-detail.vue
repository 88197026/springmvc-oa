<style lang="sass" scoped>
.closefix {
    right: 16px;
    position: absolute;
}

.text-model-body {
    padding: 20px;
}

.control-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 100%;
}

.active-info-box {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    .active-name {
        font-size: 26px;
        color: #000;
    }
    .time-range {
        font-size: 8px;
        color: #999;
    }
}

.active-h-box {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    align-content: center;
}

.more {
    text-align: left;
}

.active-tool {
    display: flex;
    justify-content: flex-end;
    .tool-box {
        margin: 0 10px;
        cursor: pointer;
    }
    .passed {
        width: 60px;
        height: 60px;
        border-radius: 100px;
        border: 1px solid #DAE2EB;
        display: flex;
        color: red;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        align-items: center;
    }
    .tool-icon {
        width: 30px;
        height: 30px;
        background-size: contain;
    }
    .download-icon {
        background-image: url(../images/iconfont-down.png);
    }
    .preview-icon {
        background-image: url(https://gw.alicdn.com/tps/TB1itLjHVXXXXaaaXXXXXXXXXXX-25-25.png);
    }
    .push-icon {
        background-image: url(https://gw.alicdn.com/tps/TB1ROHfHVXXXXbuXVXXXXXXXXXX-25-25.png);
    }
}

.tips {
    width: 'auto';
}

.active-button {
    display: flex;
    width: 400px;
    justify-content: flex-end;
    .tool-box {
        margin: 0 10px;
        cursor: pointer;
    }
    .tool-icon {
        width: 40px;
        height: 40px;
        background-size: contain;
    }
    .download-icon {
        background-image: url(../images/iconfont-down.png);
    }
}

.tip-box-warp {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-box-pack: center;
    width: 108px;
    -webkit-box-align: center;
    text-align: center;
    .tipbox {
        position: relative;
        width: 40px;
        .icon {
            width: 40px;
            height: 40px;
            .mt10 {
                margin-top: 10px;
            }
            .mt5 {
                margin-top: 5px;
            }
        }
        .tip-icon {
            position: absolute;
            min-width: 10px;
            border-radius: 10px;
            background: red;
            right: -30%;
            top: -5px;
            padding: 0 5px;
            color: white;
        }
    }
}
.bs-example {
    margin-top: 20px;
}
.releaselimit-body{
   padding:20px;     
}

.business-pool-tip{
    text-align: center;
    font-size: 16px;
    color: #333;
    padding: 15px;
}
</style>
<style>
</style>
<!-- example页面的control部分 -->
<template>
    <div class="control-box">
        <div class="control-box-col active-info-box">
            <div class="active-name">{{activityName}}</div>
            <div class="time-range">{{activityDO.updateNick}}{{activityDO.updateTime}}最后更新，投放结束时间：{{activityEndTime}}</div>
        </div>
        <div class="control-box-col active-h-box">
            <div class="tip-box-warp"  @click="showPoolModal(0)">
                <div class="tipbox">
                    <div class="icon"><img src="https://gw.alicdn.com/tps/TB1TG15JXXXXXbcXpXXXXXXXXXX-36-37.png" width="100%" alt=""></div>
                </div>
                <span class=""> 添加商品</span>
            </div>
            <div class="tip-box-warp" @click="showPoolModal(3)">
                <div class="tipbox">
                    <div class="icon"><img class="mt5" src="https://gw.alicdn.com/tps/TB1MF3DJXXXXXcsapXXXXXXXXXX-43-38.png" width="100%" alt=""></div>
                    <span class = "tip-icon" v-text="itemNum"></span>
                </div>
                <span class=""> 商品池管理</span>
            </div>
        </div>
        <div class="control-box-col active-tool">
            <div class="tool-box passed"><div>{{passedNum}}</div><div>已通过</div></div>
            <div class="tool-box push"><div class="tool-icon push-icon" @click="bannerRelease = true" ></div>投放</div>
        </div>
    </div>
    <modal  :show.sync="addItemModal" large width="1200px">
        <div slot="modal-header" class="modal-header hide"></div>
        <div slot="modal-body" class="modal-body">
            <button @click="addItemModal=false" type="button" class="close closefix"><span>×</span></button>
            <t-additem v-ref:mypool type="1" :category="category"></t-additem>
        </div>
        <div slot="modal-footer"  class="modal-footer hide"></div>
    </modal>

    <modal title="提示" :show.sync="businessPoolTip">
        <div slot="modal-body" class="modal-body business-pool-tip">
            <p>已导入<span class="co_r">{{approveCnt}} </span>张免审图,默认通过审核 </p>
            <p>已导入<span class="co_r">{{notApproveCnt}} </span>张待审核图,需审核后才会合图</p>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-success" @click="goPoolMange()">查看导入结果</button>
        </div>
    </modal>


    <!--商品池管理-->
    <modal title="商品池管理" :show.sync="itemManageModal" large>
        <div slot="modal-body" class="modal-body">
            <t-additem type="2" :itemnum = "itemNum" :category="category"></t-additem>
        </div>
        <div slot="modal-footer" class="modal-footer hide"></div>
    </modal>
    <!-- 预览 -->
    <modal title="投放预览" :show.sync="bannerPreview" large >
        <div slot="modal-body" class="modal-body">
            <banner-preview v-ref:modulebannerpreview></banner-preview>
        </div>
        <div slot="modal-footer" class="modal-footer"></div>
    </modal>
    <!-- 投放 -->
    <modal title="投放" :show.sync="bannerRelease" large >
        <div slot="modal-body" class="modal-body">
            <release-list v-ref:modulereleaselist ></release-list >
        </div>
        <div slot="modal-footer" class="modal-footer"></div>
    </modal>
      <modal :show.sync="bannerReleaseLimit" title="修改投放任务" effect="fade" width="400" >
        <div slot="modal-body" class="modal-body releaselimit-body">
        <p class="co_r mt5">投放结束时间请截至到当前时间的七天以后</p>
          <table class="table" >
            <tbody >
            <tr>
              <th>投放开始时间</th>
              <th class="form-group">
                <datetimepicker
                    :selectejq="datetimepickerStartId"
                    v-model="startTime">
                </datetimepicker>
              </th>
              <th>必填</th>
            </tr>
            <tr>
              <th>投放结束时间</th>
              <th class="form-group">
                <datetimepicker
                    :selectejq="datetimepickerEndId"
                    v-model="endTime">
                </datetimepicker>
              </th>
              <th>必填</th>
            </tr>
            </tbody>
          </table>

        </div>
        <div slot="modal-footer" class="modal-footer">
          <button type="button" class="btn btn-success" @click='doedit(editItem)'>保存</button>
        </div>
      </modal>
</template>
<script>
    import utils from '../common/js/utils.js';
    import {IO} from '../common/js/utils.js';
    import { modal } from 'vue-strap';
    import bannerPreview from '../components/banner-preview.vue';
    import releaseList from '../components/release-list.vue';
    import tAdditem from '../components/add-item.vue';
    import tTextmanage from '../components/text-manage.vue';
    import tRawmanage from '../components/raw-manage.vue';
    import datetimepicker from "../components/datetimepicker.vue";
    import { mAlert } from "../common/js/utils";



    import Env from '@ali/lib-env';
    import dispatch from "../common/js/dispatch";
    export default{
        data: function() {
            return {
            	rawModal:false,
                addItemModal: false,
                itemManageModal: false,
                bannerPreview: false,
                bannerRelease:false,
                bannerReleaseLimit:false,
                activityDO:[],
                category: [],
                textList: [],
                rawList:[],
                positionList:[],
                hasGetCategory: false,
                activityId: -1,
                activityName: '',
                itemNum:0,
                copywriteNum:0,
                passedNum: '',
                activityStartTime: '',
                activityEndTime: '',
                startTime:"",
                endTime:"",
                itemId:0,
                proSence:[],
                api: '/luban/LbSourceScreen.do',
                textApi: '/luban/LbCopywriterScreen.do',
                datetimepickerStartId:"ctrl-detail-tiemstart",
                datetimepickerEndId:"ctrl-detail-timeend",
                notApproveCnt:0,
                approveCnt:0,
                businessPoolTip:false


            }
        },
        components:{
            modal,
            tAdditem,
            tTextmanage,
            tRawmanage,
            releaseList,
            bannerPreview,
            datetimepicker

        },
        methods: {
            showEdit:function(item){
              var com = this;
              com.startTime = com.activityStartTime;
              com.endTime =  com.activityEndTime;
              com.bannerReleaseLimit = true;
            },
            showPoolModal:function(index){
                this.$refs.mypool.changeTabIndex(index);
                this.addItemModal = true;

            },
            goPoolMange:function(){
                this.$refs.mypool.changeTabIndex(3);
                dispatch.fire("updata-manage-pool-list");
                this.businessPoolTip = false;
            },
            doedit:function(item){
              var com=this;
              var req = {
                type:3,
                id:com.itemId,
                releaseBegin:com.startTime + ":00",
                releaseEnd:com.endTime + ":00"
              };
              IO({
                url : "/luban/LbActivityScreen.do?_input_charset=utf8",
                type : "get",
                data : req,
                dataType : "jsonp",
                success : function(res) {
                  if(res.success){
                    com.activityStartTime = com.startTime;
                    com.activityEndTime = com.endTime;
                    com.bannerReleaseLimit=false;
                    mAlert("更新成功");
                  }else{                    
                    mAlert("更新失败");
                  }
                },
                error: function() {
                  console.log("error");
                }
              });
            },
            getCategory(val) {
                // 类目下拉框数据
                var self = this;
                if (val && !self.hasGetCategory) {
                    IO({
                        url: self.api,
                        type:"get",
                        dataType:"jsonp",

                        data: {
                            type: 1,
                            _input_charset: 'utf8'
                        },
                        success: function(res) {
                            dispatch.fire("pass-prosence",{
                                    proSence:res.data.bizMenu    
                            })
                            self.hasGetCategory = true;
                            self.category = res.data.lbCategoryDTOList;
                        },
                        error: function() {
                            console.log('category io error')
                        }
                    });
                }
            }
        },
        watch: {
            addItemModal(val, old) {
                this.getCategory(val);
            },
            bannerPreview(val, old) {
            	if(val==true){
            	  var com=this;
            	  com.$refs.modulebannerpreview.reload();
            	}
            },
            bannerRelease(val, old) {
            	if(val==true){
            	  var com=this;
            	  com.$refs.modulereleaselist.load();
            	}
            },
            rawModal(val,old){
            	if(val==false){
            	}else{
            		this.rawModal=true;
            	}
            }
        },
        events: {
            PAGE_DATA_GET(data) {
                this.itemId = data.lbReleasePositionActivityDTO.activityId;
                this.activityName = data.lbReleasePositionActivityDTO.activityName;
                this.passedNum = data.lbReleasePositionActivityDTO.totalNum;
                this.activityStartTime = data.lbReleasePositionActivityDTO.releaseBegin;
                this.activityEndTime = data.lbReleasePositionActivityDTO.releaseEnd;
                this.activityDO= data.lbReleasePositionActivityDTO;
                this.positionList=data.lbReleasePositionListDTOList;
                this.itemNum = data.lbReleasePositionActivityDTO.itemNum;
/*
                this.$refs.mypool.changeItemNum();
*/
                this.copywriteNum = data.lbReleasePositionActivityDTO.copywriteNum;


            },
            changeItemNum(num){
                this.itemNum = num;
                window.app.$refs.modulemanage.itemNum = num;
                window.app.$refs.moduleresultshow.clearElement();


            }
        },
        ready() {
            var self = this;
            self.activityId = Env.params.activityId;
            dispatch.on("timelimt",function(obj){
                  var item = obj.item;
                  self.bannerRelease = false;
                  self.showEdit(item);
            });
            dispatch.on("ctrl-detail-change-itemNum",function(obj){
                self.itemNum = obj.num;
                window.app.$refs.modulemanage.itemNum = obj.num;
                window.app.$refs.moduleresultshow.clearElement();
/*
                this.$refs.mypool.changeItemNum();
*/

            });
            dispatch.on("business-pool-result",function(obj){
                var res = obj.res;
                self.businessPoolTip = true;
                self.approveCnt = res.data.approveCnt;
                self.notApproveCnt = res.data.notApproveCnt;
            });




        if(!this.activityId){
                window.location.href = window.location.href.replace("detail.html","list.html");
            }
        }
    }
</script>