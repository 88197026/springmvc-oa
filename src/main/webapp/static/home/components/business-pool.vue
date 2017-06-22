<style lang="sass" scoped>
    .category-row {
        margin-top: 10px;
    }
    .form-control {
        height: 30px;
    }
    .short-input {
        width: 100px !important;
    }
    .inline{
        display: inline-block;
    }
</style>

<template>
    <div class="selection-wrap">
        <div class="col-lg-12 form-inline">
            <div class="label">商家</div>
            <t-singleselector :value="sceneVal" :options="scene" val-name="sceneVal"></t-singleselector>
            <div class="label">招商子活动id</div>
            <div class="form-group">
                <input type="text" v-model="zsId" @paste = "changeZsId" @blur = "changeZsId" class="form-control short-input" placeholder="招商子活动id">
            </div>
            <div class="form-group"  v-show="zsId&&zsdata">
                <input type="text" class="form-control short-input" :value="businessName" disabled>
            </div>
            <div class="form-group" v-show="zsId&&zsdata">
                <t-singleselector :value="zsFieldVal" :options="zsField" val-name="zsFieldVal"></t-singleselector>
            </div>
            <div v-show="sceneVal=='B'&&zsId&&zsdata" class="inline">
                <div class="label">类目</div>
                <t-multipleselector  v-if="category.length" :main-cate="category" ></t-multipleselector>
             </div> 

            <button class="btn btn-sm btn-primary" @click="getBusinessInfo">确定</button>
        </div>
        <div class="container-fluid category-row">
            <div class="row">
                <div class="col-lg-4">
                </div>
                <div class="col-lg-12 btn-wrap">
                    <div class = "mr20 co_r">  在线抠图仅支持白底图，请选择白底图导入</div>
                    <div class = "choosed-num mr5">已选<span class="co_r" >{{selectNum}}</span>个
                    </div>
                    <div class="choose-all">
                        <input type="checkbox" v-model="chooseAllVal" @click="chooseAll" />
                        <div class="label">全选</div>
                    </div>
                    <button class="btn btn-sm btn-default mr20" @click="doAddTool">导入所选商品</button>
                    <button class="btn btn-sm btn-success" @click="doAddAllItems">一键导入全部</button>
<!--
                    <button class="btn btn-sm btn-success" @click="doAddTool">导入并开始抠图</button>
-->
                </div>
            </div>
        </div>
    </div>


    <t-picitemlist :type="type" :itemstatus = "showItemStatus" :itemlist="itemList" ></t-picitemlist>

    <div class="pagination-warp"    v-show= "totalPages>1" >
        <boot-pagination   :type="paginationType" :page="page" :paginationid = "paginationid"  :totalpages="totalPages"></boot-pagination>
    </div>

<!--
    <t-pagination v-show="itemList.length" :reachend="reachEnd" :errajax="errajax" :page="page" v-bind:tab="1"></t-pagination>
-->
</template>

<script>
    import utils from '../common/js/utils.js';
    import {IO} from '../common/js/utils.js';
    import { mAlert } from "../common/js/utils";
    import Env from '@ali/lib-env';
    import tSingleselector from './single-selector.vue';
    import tMultipleselector from './multiple-selector.vue';
    import tPicitemlist from './pic-itemlist.vue';
    import tPagination from './pagination.vue';
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
                zsField: [],
                selectNum:0,
                zsFieldVal: '',
                buckleNum:0,
                timerout:null,
                countTimer:null,
                beginTimer:false,
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
                businessName: '',
                searchVal: '',
                curSource: true,
                chooseAllVal: false,
                mainCateVal: '',
                subCateVal: '',
                zsId: '',
                zsdata:false,
                api: '/luban/LbSourceScreen.do',
                reachEnd:false,
                errajax:false,
                isfirst:false,
                isend:false,
                page:1,
                totalPages:1,
                type:"business",
                paginationid:"business-manage-pagination",
                paginationType:"business",
                showItemStatus:"pool",
                isFireUpdata:false
            }
        },
        methods: {
            changeZsId:function (){
                this.zsdata =false;
            },
            getItemList:function(page,ishideloading) {
                var self = this;
                self.page = page||1;
                self.curSource = true;
                self.chooseAll = false;
                if (!self.zsId) {
                    if(!self.isFireUpdata){
                    }
                    self.isFireUpdata = false;
                    return;
                }
                IO({
                    url: self.api,
                    type:"get",
                    dataType:"jsonp",
                    jsonp: "callback",
                    data: {
                        type: 4,
                        itemSource: 0,
                        sellerSource: self.sceneVal,
                        rgb: '',
                        cateLevel1Id: self.mainCateVal,
                        cateLevel2Id: self.subCateVal,
                        pageNo: self.page,
                        pageSize: 120,
                        zsId: self.zsId,
                        zsField: self.zsFieldVal,
                        activityId: Env.params.activityId,
                        _input_charset: 'utf8'
                    },
                    success: function(res) {
                        if (res.success) {
                            self.itemList = res.data.lbSourceListDTOList;
                            self.totalPages = res.data.pageCount||1;


                            if(self.itemList.length<36){
                                self.reachEnd=true;
                            }else{
                                self.reachEnd=false;
                            }
                        } else {
                            mAlert(res.errorMsg,"danger");
                        }
                    },
                    error: function(res) {
                        self.errajax = true;

                        mAlert(res.errorMsg,"danger");
                    }
                },ishideloading);
            },
            searchItem:function() {
                var self = this;
                self.page = 1;
                self.curSource = false;
                self.chooseAllVal = false;
                IO({
                    url: self.api,
                    type:"get",
                    dataType: "jsonp",
                    data: {
                        page: self.page,
                        key: self.searchVal
                    },
                    success: function(res) {
                        if (res.success) {
                            self.itemList = res;
                        } else {
                            mAlert(res.errorMsg,"danger");
                        }
                    },
                    error: function(res) {
                        mAlert(res.errorMsg,"danger");
                    }
                });
            },
            doAddAllItems:function(){
                var self = this;
                if (!self.zsId) {
                    return;
                }
                IO({
                    url: '/luban/LbSourceScreen.do',
                    type:"post",
                    dataType: "json",
                    data: {
                        type:"zskeyimport",
                        sellerSource:self.sceneVal,
                        zsId:self.zsId,
                        zsField:self.zsFieldVal,
                        cateLevel1Id:self.mainCateVal,
                        cateLevel2Id:self.subCateVal,
                        cateLevel3Id:"",
                        activityId: Env.params.activityId
                    },
                    success: function(res) {
                        if (res.success) {
                            window.app.$refs.loading.showDaoRuTip();
                            window.app.$refs.loading.initLodingNum("鲁小班正在一键导入...");
                            setTimeout(self.getResAjax,1000);

                        } else {
                            mAlert(res.errorMsg,"danger");
                        }
                    },
                    error: function(res) {
                        console.log("getPagination error "+res);
                    }
                },true);
            },
            getResAjax:function(){
                var self = this;
                IO({
                    url: '/luban/LbReleaseSourceScreen.do',
                    type:"get",
                    dataType: "jsonp",
                    data: {
                        type:4,
                        activityId: Env.params.activityId
                    },
                    success: function(res) {
                        if (res.success) {
                            var finished = res.data.finished;
                            if(finished){
                                window.app.$refs.loading.closeLoading();
                                self.getItemList(self.page);
                                mAlert("一键导入成功");
                                dispatch.fire("business-pool-result",{res:res});
                            }else{
                                window.app.$refs.loading.setLodingNum(res.data.approveCnt,res.data.notApproveCnt)
                                setTimeout(self.getResAjax,1000)
                            }
                        } else {
                            mAlert(res.errorMsg,"danger");
                        }
                    },
                    error: function(res) {
                        console.log("getPagination error "+res);
                    }
                },true);
            },
         /*   getPagination:function() {
                var self = this;
                var params = {
                    type: 4,
                    itemSource: 0,
                    //rgb: '(38, 57, 212)',
                    pageNo: self.page,
                    pageSize: 40,
                    _input_charset: 'utf8'
                }
                self.chooseAllVal = false;

                if (!self.curSource) {
                    params.key = self.searchVal
                } else {
                    if (!self.zsId) {
                        mAlert('请输入招商子活动id',"danger");
                        return;
                    }
                    params.sellerSource = self.sceneVal;
                    params.cateLevel1Id = self.mainCateVal;
                    params.cateLevel2Id = self.subCateVal;
                    params.zsId = self.zsId;
                    params.zsField = self.zsFieldVal;
                }

                IO({
                    url: '/luban/LbSourceScreen.do',
                    type:"get",
                    dataType: "jsonp",

                    data: params,
                    success: function(res) {
                        if (res.success) {
                            self.errajax = false;
                            self.itemList = res.data.lbSourceListDTOList;
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
                    	console.log("getPagination error "+res);
                    }
                });
            },*/
            getBusinessInfo:function() {
                var self = this;
                if (!self.zsId) {
/*
                    mAlert('请输入招商子活动id',"danger");
*/
                    return;
                }
                if(self.zsId&&self.zsdata){
                    self.getItemList();
                    return;
                }
                self.getFieldValAjax();
                // 招商池下拉框数据
            },

            getFieldValAjax:function(){
                var self = this;
                IO({
                    url: '/luban/LbSourceScreen.do',
                    type:"get",
                    dataType: "jsonp",
                    data: {
                        type: 2,
                        zsId: self.zsId,
                        sellerSource: self.sceneVal,
                        _input_charset: 'utf8'
                    },
                    success: function(res) {
                        if (res.success) {
                            var info = res.data.lbZsInfoDTO;
                            self.zsField = info.fieldList;
                            self.zsFieldVal = self.zsField[0].value;
                            self.businessName = info.zsName;
                            self.zsdata = true;
                            self.getItemList();
                        } else {
                            mAlert(res.errorMsg,"danger");
                            self.zsdata = false;
                        }
                    },
                    error: function(res) {
                        mAlert('招商数据请求失败',"danger");
                        self.zsdata = false;
                    }
                });


            },
            chooseAll:function() {
                if (!this.chooseAllVal) {
                    this.$broadcast('chooseAll', true);
                } else {
                    this.$broadcast('chooseAll', false);
                }
            },
            doAddTool:function(){
                var self = this;
                if(!self.selectNum){
                    mAlert("请选择要导入的商品","danger");
                    return;
                }
                if(window.app.$refs && window.app.$refs.loading){
                    if(self.selectNum > 1){
                        window.app.$refs.loading.showLoadingNum();
                    }
                    window.app.$refs.loading.initLodingNum("鲁小班正在吭哧吭哧抠图中…(不添加重复的图片！)");
                    self.chooseAllVal = false;
                    self.addToPool(true);
                }
            },
            countMake:function (){
                var activityId = Env.params.activityId;
                var com = this;
                var req = {
                    type:"6",
                    activityId:activityId
                };
                IO({
                    url : "/luban/LbSourceScreen.do?_input_charset=utf8",
                    type : "get",
                    data : req,
                    dataType : "jsonp",
                    success : function(res) {
                        if(res.success){
                            var data  = res.data;
                            var n = parseFloat(data["1"]);
                            var m = parseFloat(data["0"]||0);
                            window.app.$refs.loading.setLodingNum(n+m,n);
                            if(m == 0){
                                com.buckleNum = 0 ;
                                setTimeout(function(){
                                    if(com.selectNum > 1) {
                                        mAlert("抠图并添加商品成功");
                                    }
                                    window.app.$refs.loading.closeLoading();
                                },1000);
                            }else{
                                if(com.buckleNum==m){
                                    if(!com.beginTimer){
                                        com.beginTimer = true;
                                        com.timerout = setTimeout(function(){
                                            if(com.selectNum > 1) {
                                                mAlert("因等待时间过长，后台默认进行抠图工作");
                                            }
                                            window.app.$refs.loading.closeLoading();
                                            clearTimeout(com.countTimer);
                                            com.beginTimer =false
                                        },8000)
                                    }
                                }else{
                                    clearTimeout(com.timerout);
                                    com.beginTimer =false
                                }
                                com.buckleNum = m;
                                com.countTimer = setTimeout(com.countMake,1000);

                            }
                        }else{
                            window.app.$refs.loading.closeLoading();
                        }
                    },
                    error: function() {
                        window.app.$refs.loading.closeLoading();
                        mAlert("扣图出错","danger");
                    }
                },true);
            },
            addToPool:function(ishideloading){
                var self = this;
                this.$broadcast('addToBizPool', 0,self.sceneVal,self.zsId,self.zsFieldVal,ishideloading,function(){
                    self.getItemList(self.page,true);
                    setTimeout(self.countMake,1000);
                });
            }
        },
        components: {
            tSingleselector,
            tMultipleselector,
            tPicitemlist,
            tPagination,
            bootPagination
        },



        watch: {
            zsId:function(){
                this.zsdata =false;
            }
        },
        ready:function(){
            var self = this;
            dispatch.on("business-pool-item-choose",function(obj){
                self.selectNum = obj.selected.length;
                self.doAddTool();
            });
            dispatch.on("change-select-itemLen",function(obj){
                self.selectNum = obj.num;

            });
            dispatch.on("changepag-page",function(obj){
                var type = obj.eletype;
                if(type =="business"){
                    self.page = obj.page;
                    self.getItemList(self.page);
                }
            })
            dispatch.on("updata-pool-status",function(obj){
                self.isFireUpdata = true;
                self.getItemList(self.page,true);
            })

        },
        events: {
           /* prevPage(page, tab) {
                if (tab === 1) {
                    this.page = page;
                    this.getPagination();
                }
            },
            nextPage(page, tab) {
            	if(this.reachEnd){
                    mAlert("已经到最后1页了");
            		return;
            	}else {
                    if (tab === 1) {
                        this.page = page;
                        this.getPagination();
                    }
                }
            },*/
            changeSelectItem:function(num){
                this.selectNum = num;
            },
            getSelection(selectionArr) {
                this.mainCateVal = selectionArr[0];
                if (selectionArr.length > 1){
                    this.subCateVal = selectionArr[1];
                }
            },
            getSingleSelection(valName, val) {
                this[valName] = val;
            }
        }
    }
</script>