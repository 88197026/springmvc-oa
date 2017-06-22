<style lang="sass">
    .label {
        color: #000;

    }
    .btn-wrap {
        display: flex;
        height: 30px;
        align-content: center;
        justify-content: flex-end;
    }
    .choose-all {
        margin: 0 20px;
        height: 30px;
        line-height: 30px;
        input {
            margin-top: 0;
        }
    }

    .tab-warp{
    }

    .head-tab{
        text-align: center;
        font-size:14px;
        color:#ffffff;
        line-height:32px;
        height: 32px;
        text-align:center;
        background:#ffffff;
        margin-top: 8px;
        color: #333333;
        width: 150px;
        display: inline-block;
        border: 1px solid #3089dc;

    }
    .head-tab-warp{
        margin-top: -6px;
    }
    .fx3{

        margin-left: -6px;
    }
    .head-tab-active{
        background:#3089dc;
        color: #ffffff;

    }
</style>

<template>
    <div class="container-fluid selection-wrap">
        <div class="row">
            <div class="col-lg-4">
                <!--<div class="label">商品主色</div>-->
                <!--<t-singleselector :value="colorVal" :options="color"></t-singleselector>-->

                <div class="label">商品来源</div>
                <t-singleselector :value="itemSourceVal" :options="itemSource" val-name="itemSourceVal"></t-singleselector>

                <!--<div class="label">商家222</div>-->
                <!--<t-singleselector :value="sceneVal" :options="scene" val-name="sceneVal"></t-singleselector>-->
                <!--接口暂时不支持类目-->
                <!--<div class="label">类目</div>-->
                <!--<t-multipleselector v-if="category.length" :main-cate="category" ></t-multipleselector>-->
                <button class="btn btn-sm btn-primary" @click="getItemList()">搜索商品</button>

            </div>

            <div class="col-lg-6 head-tab-warp">
                <div  class="head-tab" @click="changePoolTab(2)" :class={"head-tab-active":tabStatus=='2'}>未审核 <span class="mr5">{{noPassCount}} </span></div>
                <div  class="head-tab  f3m fx3" @click="changePoolTab(1)" :class={"head-tab-active":tabStatus=='1'}>已通过<span class="mr5">{{passCount}}</span></div>
            </div>




        </div>
    </div>

    <div class="btn-wrap">
        <div class = "choosed-num mr5">已选<span class="co_r" v-text="selectNum"></span>个</div>
        <div class="choose-all">
            <input type="checkbox" v-model="chooseAllVal" @click="chooseAll" />
            <div class="label">全选</div>
        </div>
        <button class="btn  btn-primary mr20" @click="passPool" v-show="tabStatus == '2'">审核通过</button>
        <button class="btn btn-sm btn-danger mr20" @click="delFromPool">从此商品池移除</button>
    </div>
    <t-picitemlist :itemlist="itemList" :type = "type" :itemstatus = "showItemStatus"></t-picitemlist>


    <div class="pagination-warp"   v-show= "totalPages>1" >
        <boot-pagination  :type="paginationType"  :page="page" :paginationid = "paginationid" :totalpages="totalPages"></boot-pagination>
    </div>
<!--
    <t-pagination v-show="itemList.length" :errajax="errajax" :reachend="reachEnd" :page="page" v-bind:tab="0"></t-pagination>
-->

</template>

<script>
    import {IO} from '../common/js/utils';
    import utils from '../common/js/utils.js';
    import { mAlert } from "../common/js/utils";
    import tSingleselector from './single-selector.vue';
    import tMultipleselector from './multiple-selector.vue';
    import tPicitemlist from './pic-itemlist.vue';
/*
    import tPagination from './pagination.vue';
*/
    import Env from '@ali/lib-env';
    import bootPagination from '../components/boot-pagination.vue';

    import dispatch from "../common/js/dispatch";
    module.exports = {
        props: {
            category: {
                type: Array
            }
        },
        data:function(){
            return {
                color: [],
                selectNum:0,
                colorVal: '',
                scene: [
                    {
                        value: 'C',
                        label: '淘宝'
                    },
                    {
                        value: 'B',
                        label: '天猫'
                    }
                ],
                sceneVal: 'C',
                itemList: [],
                itemSource: [
                    {
                        value: '99',
                        label: '全部来源'
                    },
                    {
                        value: '1',
                        label: '从公共池导入'
                    },
                    {
                        value: '0',
                        label: '从招商导入'
                    },
                    {
                        value: '2',
                        label: '从业务池导入'
                    }
                ],
                itemSourceVal: '99',
                page: 1,
                totalPages:1,
                chooseAllVal: false,
                activityId: -1,
                reachEnd: false,
                errajax: false,
                showItemStatus:'poolmanage',
                tabStatus:2,
                type:"pool-manage",
                paginationid:"pool-manage-pagination",
                api: '/luban/LbReleaseSourceScreen.do',
                paginationType:"pool-manage",
                noPassCount:0,
                passCount:0


            }
        },
        methods: {
            getItemList(page) {
                var self = this;　
                self.chooseAllVal = false;
                self.page = page||1,
                IO({
                    url: '/luban/LbReleaseSourceScreen.do',
                    type:"get",
                    dataType: "jsonp",
                    data: {
                        type: 1,
                        activityId: self.activityId,
                        itemSource: self.itemSourceVal,
                        pageNo: self.page,
                        approveStatus:self.tabStatus,
                        pageSize: 120,
                        _input_charset: 'utf8'
                    },
                    success: function(res) {
                        if (res.success) {
                            self.errajax = false;
                            self.itemList = res.data.lbReleaseSourceListDTOList;
                            self.totalPages = res.data.pageCount||1;
                            self.passCount = res.data.approveCount;
                            self.noPassCount = res.data.notApproveCount;



                           /* if(self.tabStatus == 1){

                            }else if(self.tabStatus == 2){

                            }*/



                            if(self.itemList.length<36){
                                self.reachEnd=true;
                            }else{
                                self.reachEnd=false;
                            }
                        } else {
                            self.errajax = true;
                            mAlert(res.errorMsg,"danger");
                        }
                    },
                    error: function(res) {
                        console.log(res)
                        mAlert('获取商品管理池数据失败',"danger");
                    }
                });
            },
            passPool:function(){
                var self = this;
                this.$broadcast('poolManagePass',function() {
                    self.getItemList(self.page);
                });
            },
            changePoolTab:function(tab){
                this.tabStatus = tab;
                this.getItemList(1);
            },
            delFromPool() {
                var self = this;
                this.$broadcast('delFromPool', function() {
                    self.getItemList(self.page)
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
            tMultipleselector,
            tPicitemlist,
            bootPagination
        },
        events: {
            /*prevPage: function(page, tab) {
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
            },*/
            changeSelectItem:function(num){
                this.selectNum = num;
            },
            getSelection(selectionArr) {
                self.mainCateVal = selectionArr[0];
                if (selectionArr.length > 1) {
                    self.subCateVal = selectionArr[1];
                }
            },
            getSingleSelection(valName, val) {
                this[valName] = val;
            }
        },
        ready() {
            var self = this;
            dispatch.on("updata-manage-pool-list",function(){
                self.getItemList(1);
            })
            self.activityId = Env.params.activityId;
            self.getItemList(1);
            dispatch.on("pool-manage-item-choose",function(obj){
                self.selectNum = obj.selected.length;
                self.passPool();
            });
            dispatch.on("changepag-page",function(obj){
                var type = obj.eletype;
                if(type =="pool-manage"){
                    self.page = obj.page;
                    self.getItemList(self.page);
                }
            })
        }
    }
</script>