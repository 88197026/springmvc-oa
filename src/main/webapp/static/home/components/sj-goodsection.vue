<style lang = "sass" >

    .leftMeun {
        position: absolute;
        box-sizing: border-box;
        width: 170px;
        height: 100%;
        background: #ffffff bottom;
    }
    .leftMeun >div {
        padding-left: 20px;
    }



    .toggle-btn {
        display: none;
        border: none;
        width: 52px;
        height: 50px;
        font-size: 20px;
        padding: 15px;
        cursor: pointer;
        float: left;
        color: #212121;
        -moz-transition: all 0.2s ease-out 0s;
        -webkit-transition: all 0.2s ease-out 0s;
        transition: all 0.2s ease-out 0s;
    }

    .pd0px {
        padding-left: 170px!important;
    }
    .contant-panle{
        padding-bottom: 40px;


    }



</style>
<template>

    <div class="meun-btn" v-show=showMenuBtn @click="showRightMenu">
        <a class="toggle-btn" id="nimei">
            <i class="glyphicon glyphicon-align-justify"></i>
        </a>
    </div>
    <div class="leftMeun" v-show = showMenu  id="leftMeun">
        <div class="meun-item" @click="changeMenuTab(1)"  :class="{'meun-item-active':currentMenuIndex=='1'}"   role="tab" data-toggle="tab">我的店铺商品</div>
        <div class="meun-item" @click="changeMenuTab(2)"  :class="{'meun-item-active':currentMenuIndex=='2'}"  role="tab" data-toggle="tab">导入商品ID</div>
        <div class="meun-item" @click="changeMenuTab(3)"  :class="{'meun-item-active':currentMenuIndex=='3'}"  role="tab" data-toggle="tab">历史商品池</div>
        <div class="meun-item" @click="changeMenuTab(4)"  :class="{'meun-item-active':currentMenuIndex=='4'}"  role="tab" data-toggle="tab">已导入商品池</div>
    </div>
    <div  class="contant-panle" :class = "{'pd0px':showMenu}">
        <div class="r-content-title">
            <div v-show="menunum=='1'">
                <form class="form-inline">
                    <div class="form-group">
                        <div class="label">商家</div>
                        <v-select   placeholder='商品分类' :value.sync= goodSort >
                            <v-option track-by="$index" v-for = "item in sortlist" :value= item>{{item}}</v-option>
                        </v-select>
                        <input type="text"  class="form-control" placeholder="关键词搜索">
                    </div>
                    <button class="btn btn-sm btn-primary" @click="getItemList(1)">搜索商品</button>
                </form>
            </div>
            <div v-show="menunum=='2'">
                <textarea class="form-control" rows="4"></textarea>
            </div>
            <div v-show="menunum=='3'">
                <form class="form-inline">
                    <div class="form-group">
                        <div class="label">活动名称</div>
                        <v-select   placeholder='活动名称分类' :value.sync= goodSort >
                            <v-option track-by="$index" v-for = "item in sortlist" :value= item>{{item}}</v-option>
                        </v-select>
                        <input type="text"  class="form-control" placeholder="关键词搜索">
                    </div>
                    <button class="btn btn-sm btn-primary" @click="getItemList(1)">搜索商品</button>
                </form>
            </div>

            <div v-show="menunum=='4'">
                <form class="form-inline">
                    <div class="form-group">
                        <div class="label">商家</div>
                        <v-select   placeholder='商品分类' :value.sync= goodSort >
                            <v-option track-by="$index" v-for = "item in sortlist" :value= item>{{item}}</v-option>
                        </v-select>
                        <input type="text"  class="form-control" placeholder="关键词搜索">
                    </div>
                    <button class="btn btn-sm btn-primary" @click="getItemList(1)">搜索商品</button>
                </form>
            </div>
        </div>
        <t-picitemlist :itemlist = "itemlist" ></t-picitemlist>

        <div class="pagination-warp"   v-show= "totalPages>1" >
            <boot-pagination   :paginationid="paginationid" :type = "type" :page="page"  :totalpages="totalPages" ></boot-pagination>
        </div>
    </div>
    <cm-foot :type = currentSection></cm-foot>
</template>

<script>
    import {IO} from '../common/js/utils';
    import Env from '@ali/lib-env';
    import { mAlert } from "../common/js/utils";
    import dispatch from "../common/js/dispatch";
    import tPicitemlist from './pic-itemlist.vue';

    module.exports = {
        props: {
        },
        data: function () {
            return {
                page: 1,
                totalPages:1,
                goodSort:"",
                currentSection:"cm-chooseItems",
                sortlist:[1,2],
                itemlist:[],
                showMenu:true,
                showMenuBtn:true,
                menunum:1,
                paginationid:"sj-goodsection-pagination",
                type:"sj-goodsection"
            }
        },
        components: {
            tPicitemlist,
            vSelect: VueStrap.select,
            vOption: VueStrap.option,
            cmFoot: require('../components/cm-foot.vue'),
            bootPagination: require('../components/boot-pagination.vue')
        },
        methods:{

            getItemList:function(page,ishideloading) {
                var self = this;
                self.page = page||1;
                self.chooseAll = false;
                IO({
                    url: '/luban/LbSourceScreen.do',
                    type:"get",
                    dataType:"jsonp",
                    jsonp: "callback",
                    data: {
                        type:4,
                        itemSource:0,
                        sellerSource:"B",
                        rgb:"",
                        cateLevel1Id:"",
                        cateLevel2Id:"",
                        pageNo:self.page,
                        pageSize:120,
                        zsId:71703,
                        zsField:"logo素材图片",
                        activityId:3595,
                        _input_charset:"utf8"
                    },
                    success: function(res) {
                        if (res.success) {
                             console.dir(res)
                            self.itemlist = res.data.lbSourceListDTOList;
                            self.totalPages = res.data.pageCount||1;

                        } else {
                            mAlert(res.errorMsg,"danger");
                        }
                    },
                    error: function(res) {
                        mAlert(res.errorMsg,"danger");
                    }
                },ishideloading);
            },
            showRightMenu:function(){
                this.showMenuBtn = !this.showMenuBtn;
            },
            changeMenuTab: function(index){
                this.menunum = index;
            }
        },
        events: {
        },
        watch: {
        },
        ready:function() {
            var self = this;
            self.getItemList(1);
            dispatch.on("changepag-page",function(obj){
                var type = obj.eletype;
                if(type =="sj-goodsection"){
                    self.page = obj.page;
                    self.getItemList(self.page);
                }
            })



        }
    }
</script>