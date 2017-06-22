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
</style>

<template>
    <div class="container-fluid selection-wrap">
        <div class="row">
            <div class="col-lg-9">
                <!--<div class="label">商品主色</div>-->
                <!--<t-singleselector :value="colorVal" :options="color" val-name="colorVal"></t-singleselector>-->
                <div class="label">商家</div>
                <t-singleselector :value="sceneVal" :options="scene" val-name="sceneVal"></t-singleselector>
                <div class="label">类目</div>
                <t-multipleselector v-if="category.length" :main-cate="category" ></t-multipleselector>
                <button class="btn btn-sm btn-primary" @click="getItemList(1)">搜索商品</button>
            </div>
        </div>
    </div>
    <div class="btn-wrap">
        <div class = "choosed-num mr5">已选<span class="co_r" v-text=selectNum></span>个</div>
        <div class="choose-all">
            <input type="checkbox" v-model="chooseAllVal" @click="chooseAll" />
            <div class="label">全选</div>
        </div>
        <button class="btn btn-sm btn-success mr20" @click="addToPool">添加到商品池</button>
    </div>

    <t-picitemlist :itemlist="itemList"></t-picitemlist>

    <t-pagination v-show="itemList.length"  :errajax="errajax" :reachend="reachEnd" :page="page" v-bind:tab="0"></t-pagination>

</template>

<script>
    import {IO} from '../common/js/utils';
    import utils from '../common/js/utils.js';
    import tSingleselector from './single-selector.vue';
    import tMultipleselector from './multiple-selector.vue';
    import tPicitemlist from './pic-itemlist.vue';
    import tPagination from './pagination.vue';
    import dispatch from "../common/js/dispatch";
    import Env from '@ali/lib-env';



    module.exports = {
        props: {
            category: {
                type: Array
            }
        },
        data() {
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
            chooseAllVal: false,
            api: '/luban/LbSourceScreen.do'
        }
    },
    methods: {
        getItemList(page) {
            var self = this;
            self.chooseAllVal = false;
            self.page = page ||1,

                    IO({
                        url: self.api,
                        type:"get",
                        dataType: "jsonp",
                        data: {
                            type: 4,
                            itemSource: 1, // 公共池:1,招商:0
                            sellerSource: self.sceneVal, // 天猫B  ||  淘宝C
                            rgb: '',
                            cateLevel1Id: self.mainCateVal,
                            cateLevel2Id: self.subCateVal,
                            pageNo: self.page,
                            activityId: Env.params.activityId,
                            pageSize: 120,
                            _input_charset: 'utf8'
                        },
                        success: function(res) {
                            if (res.success) {
                                self.itemList = res.data.lbSourceListDTOList;
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
                    });

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
                tMultipleselector,
                tPicitemlist,
                tPagination
    },
    ready:function(){
        var self = this;
        dispatch.on("pool-item-choose",function(obj){
            self.selectNum = obj.selected.length;
            self.addToPool();
        });
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