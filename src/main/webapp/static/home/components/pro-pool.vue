<style lang="sass">
.label {
    color: #000;
}

.btn-wrap {
    display: flex;
    height: 30px;
    align-content: center;
    justify-content: flex-end;
    align-items: center;
}

.choose-all {
    margin: 0 20px;
    height: 30px;
    line-height: 30px;
    input {
        margin-top: 0;
    }
}

.time-warp {
    width: 140px;
    display: inline;
}

.table-condensed {
    .prev {
        background: none;
    }
    .next {
        background: none;
    }
}
</style>
<template
    <div class="container-fluid selection-wrap">
        <div class="row">
            <div class="col-lg-12">
                <div class="label">业务方</div>
                <t-singleselector :value="sceneVal" :options="scene" val-name="sceneVal"></t-singleselector>

                <datetimepicker  :placeholder = "startPlaceholder"
                        id="act_time_end"  class="time-warp" :timetype="timetype"
                        v-model="releaseStart" >
                </datetimepicker>

                <datetimepicker  :placeholder = "endPlaceholder" :timetype="timetype"
                         class="time-warp"
                        v-model="releaseEnd" >
                </datetimepicker>

                <input  v-model="bizId"  placeholder="业务id" class="w100 mr5 inblock form-control" type="text" >
                <input  v-model="sellerId"  placeholder="卖家id" class="w100 mr5 inblock form-control" type="text" >
                <input  v-model="keyword"  placeholder="关键词" class="w100 mr5 inblock form-control" type="text" >


                <button class="btn btn-sm btn-primary" @click="getItemList(1)">搜索商品</button>
            </div>
        </div>
    </div>


    <div class="btn-wrap">
        <div class = "choosed-num mr5">已选<span class="co_r" v-text= "selectNum"></span>个</div>
        <div class="choose-all">
            <input type="checkbox" v-model="chooseAllVal" @click="chooseAll" />
            <div class="label">全选</div>
        </div>
        <button class="btn btn-sm btn-success mr20"  @click="addToPool">添加到商品池</butto>
    </div>

    <t-picitemlist :itemlist="itemList" :itemstatus = "showItemStatus" :type="type"></t-picitemlist>
    <!--<div class="pagination-warp"   v-show= "totalPages>1" >
        <boot-pagination   :page="page"  :totalpages="totalPages"></boot-pagination>
    </div>-->
    <t-pagination v-show="itemList.length"  :errajax="errajax" :reachend="reachEnd" :page="page" v-bind:tab="0"></t-pagination>

</template>

<script>
    import {IO} from '../common/js/utils';
    import utils from '../common/js/utils.js';
    import tSingleselector from './single-selector.vue';
    import tMultipleselector from './multiple-selector.vue';
    import datetimepicker from "../components/datetimepicker.vue";
    import tPicitemlist from './pic-itemlist.vue';
    import tPagination from './pagination.vue';
    import bootPagination from '../components/boot-pagination.vue';
    import Env from '@ali/lib-env';
    import dispatch from "../common/js/dispatch";

    module.exports = {
        props: {
            category: {
                type: Array
            }
        },
        data:function() {
        return {
            color: [],
            colorVal: '',
            selectNum:0,
            scene: [
                {
                    value: 'HK',
                    label: '天猫国际'
                }
            ],
            sceneVal: 'HK',
            itemList: [],
            mainCateVal: '',
            subCateVal: '',
            reachEnd:false,
            errajax:false,
            page: 1,
            totalPages:1,
            bizId:"",
            releaseEnd:"",
            releaseStart:"",
            startPlaceholder:"开始时间",
            endPlaceholder:"结束时间",
            chooseAllVal: false,
            timetype:"day",
            sellerId:"",
            keyword:"",
            api: '/luban/LbSourceScreen.do',
            type:"pro-pool",
            showItemStatus:"pool"
        }
    },
    methods: {
        getItemList(page,ishideloading) {
            var self = this;
            self.chooseAllVal = false;
            self.page = page ||1,
                    IO({
                        url: self.api,
                        type:"get",
                        dataType: "jsonp",
                        data: {
                            type: "bizsource",
                            sellerSource: self.sceneVal, 
                            releaseEnd: self.releaseEnd,
                            releaseStart:self.releaseStart,
                            pageNo: self.page,
                            pageSize: 120,
                            bizId:self.bizId,
                            bizType:self.sceneVal,
                            activityId: Env.params.activityId,
                            keyword:self.keyword,
                            sellerId:self.sellerId,
                            _input_charset: 'utf8'
                        },
                        success: function(res) {
                            if (res.success) {
                                self.errajax = false;
                                self.itemList = res.data.lbSourceListDTOList;
                                self.totalPages = res.data.pageCount||1;
                                if(self.itemList.length<36){
                                    self.reachEnd=true;
                                }else{
                                    self.reachEnd=false;
                                }

                            } else {
                                self.errajax = true;
                                alert(res.errorMsg);
                            }
                        },
                        error: function(res) {
                            alert(res.errorMsg);
                        }
                    },ishideloading);

        },
        addToPool() {
            var self = this;
            this.$broadcast('addToPool', 1 ,function() {
                self.getItemList(self.page);
            });
        },
        chooseAll() {
            if (!this.chooseAllVal) {
                this.$broadcast('chooseAll', true);
            } else {
                this.$broadcast('chooseAll', false);
            }
        }
    },
    components: {
        tSingleselector,
                tPicitemlist,
                tPagination,
                datetimepicker,
            bootPagination
    },
    ready:function(){
        var self = this;
        dispatch.on("pass-prosence",function(obj){
                 self.scene = obj.proSence;
                 self.sceneVal = self.scene[0].value;
        })
        dispatch.on("pro-pool-item-choose",function(obj){
            self.selectNum = obj.selected.length;
            self.addToPool();
        });

        dispatch.on("updata-pool-status",function(obj){
            self.getItemList(self.page,true);
        })

      /*  dispatch.on("changepag-page",function(obj){
            var type = obj.eletype;
            if(type =="default"){
                self.page = obj.page;
                self.getItemList(self.page);
            }
        })*/

    },
    events: {
        prevPage: function(page, tab) {
            if (tab == 0) {
                this.page = page;
                this.getItemList(page);
            }
        },
        nextPage: function(page, tab) {
            if(this.reachEnd){
                mAlert("已经到最后1页了");
                return;
            }else{
                if (tab == 0) {
                    this.page = page;
                    this.getItemList(page);
                }
            }

        },
        changeSelectItem:function(num){
            this.selectNum = num;
        },
        getSelection(selectionArr) {
            this.mainCateVal = selectionArr[0];
            if (selectionArr.length > 1) {
                this.subCateVal = selectionArr[1];
            }
        },
        getSingleSelection(valName, val) {
            this[valName] = val;
        }
    }
    }
</script>