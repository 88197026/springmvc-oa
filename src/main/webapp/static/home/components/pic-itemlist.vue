<style lang = "sass" scoped>
    .itemlist-wrap {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        height: 450px;

        margin-top: 10px;
        overflow-y: auto;
    }
    .itemlist-tip {
        color: #666;
        font-size: 20px;
    }

    .choosebgColor{
        position: absolute;
        top:0px;
        left:0px;
        display:block;
        width:44px;
        height:44px;
        background-image: url(https://img.alicdn.com/tps/TB153hwKXXXXXXWXVXXXXXXXXXX-44-44.png) !important;
        border: 0px;
    }


    .item-preview-layer{
        width: 280px;
        position: absolute;
        left: 120px;
        top:0px;
        background: #e0e0e0;
        padding: 10px;
        border-radius: 4px;
        text-align: center;
        z-index:1000;
        .item-preview-img{
            width: 100%;
        }
        .preview-des{
            font-size: 14px;
            margin-top: 5px;
        }
    }
    .item-preview-layer:hover{
        display: block;
    }
</style>
<template>
    <div class="itemlist-wrap p-r"  :style= "{ backgroundColor: '#'+bgcolor}" >
        <p class="itemlist-tip" v-if="!itemlist.length">请选择商品</p>
        <t-picitem   v-for="item in itemlist" :item="item"  :itemstatus = itemstatus :selected="selected"></t-picitem>
        <div class="item-preview-layer"  :style="showimgcss" v-show="isshowimg" @mouseenter = "mouseenter()" @mouseleave = "mouseleave()">
            <img class="item-preview-img"  v-bind:src="previewUrl" alt="">
            <div class="preview-des"></div>
        </div>


<!--
        <button type="text" class="choosebgColor jscolor {valueElement:'bgcolor'}">
-->

<!--
        <input type="hidden" id="bgcolor" v-model="bgcolor">
-->



    </div>
</template>

<script>
    import {IO} from '../common/js/utils';
    import Env from '@ali/lib-env';
    import { mAlert } from "../common/js/utils";
    import dispatch from "../common/js/dispatch";
    module.exports = {
        props: {
            itemlist: {
                type: Array
            },
            type:{
            },
            itemstatus:{},
        },
        data: function () {
            return {
                bgcolor:"49B7FB",
                selected: [],
                activityId: -1,
                idPicSts:[],
                showimgcss:{left:"0px"},
                currentChooseItem:null,
                isshowimg:false,
                previewUrl:"",
                api: '/luban/LbSourceScreen.do',
                manageApi: '/luban/LbReleaseSourceScreen.do',
                showBigTimer:""
            }
        },
        components: {
            tPicitem: require('./pic-item.vue')
        },
        methods:{
            mouseenter:function() {
                var self = this;
                clearTimeout(self.showBigTimer);
                self.isshowimg = true;
            },
            mouseleave:function() {
                this.isshowimg = false;
            }
        },
        events: {
            choose: function(item) {
                var self = this;
                self.type = self.type||"pool";
                if(item.status == -2 && self.type != "pool-manage"){
                    var idPicSts = item.itemId + "=" + item.picStatus;
                    self.currentChooseItem = item;
                    self.selected.push(item.id);
                    self.idPicSts.push(idPicSts);
                    switch (self.type){
                        case "business":
                            dispatch.fire("business-pool-item-choose",{selected:this.selected});
                            break
                        case "pro-pool":
                            dispatch.fire("pro-pool-item-choose",{selected:this.selected});
                            break
                        case "pub-pool":
                            dispatch.fire("pub-pool-item-choose",{selected:this.selected});
                            break
                    }
                }

                // 审核的
                if(self.type == "pool-manage"){
                        if(item.checked){
                            for(var i = 0; i < this.selected.length; i++){
                                var selected = self.selected[i];
                                if(selected == item.id){
                                    item.checked =false;
                                    self.selected.splice(i, 1);
                                    Vue.set(item,"checked",false);
                                    return;
                                }
                            }
                        }else{
                            self.selected.push(item.id);
                            Vue.set(item,"checked",true);

                        }

                }

            },
           changechoosestatus:function(item){
                var self = this;
                if(item.checked){
                    for(var i = 0; i < this.selected.length; i++){
                        var selected = self.selected[i];
                        if(selected == item.id){
                            item.checked =false;
                            self.selected.splice(i, 1);
                            Vue.set(item,"checked",false);
                            return;
                        }
                    }
                }else{
                    self.selected.push(item.id);
                    Vue.set(item,"checked",true);

                }

            },
            chooseAll: function(chooseAll) {
                var self = this;
                self.idPicSts = [];
                self.selected = [];
                if (chooseAll) {
                   /* if(!this.selected.length){*/
                        for (var i = 0; i < self.itemlist.length; i++) {
                            var item = this.itemlist[i];
                            if (item.status == -2 ||self.type=="pool-manage" ) {
                                var idPicSts = item.itemId + "=" + item.picStatus;
                                self.idPicSts.push(idPicSts);
                                self.selected.push(item.id);

                                Vue.set(item,"checked",true);
                            }
                        }
                /*    }else{
                        for (var i = 0; i < this.itemlist.length; i++) {
                            for (var j = 0; j < this.selected.length; j++) {
                                var item = this.itemlist[i];
                                if (item.status == -2 ||self.type=="pool-manage" ) {
                                    var idPicSts = item.itemId + "=" + item.picStatus;
                                    if (item.id == this.selected[j]) {
                                        break;
                                    } else if (j < this.selected.length - 1) {
                                        continue;
                                    }
                                    this.idPicSts.push(idPicSts);
                                    this.selected.push(item.id);
                                    Vue.set(item, "checked", true);
                                    break;
                                }
                            }
                        }
                    }*/
                }else{
                    for (var i = 0; i < self.itemlist.length; i++) {
                        var item = this.itemlist[i];
                        if (item.status == -2||self.type=="pool-manage"){
                            Vue.set(item,"checked",false);
                        }
                    }

                  /*  for (var i = 0; i < this.itemlist.length; i++) {
                        for (var j = 0; j < this.selected.length; j++) {
                            var item = this.itemlist[i];
                            if (item.id == this.selected[j]) {
                                this.idPicSts.splice(j, 1);
                                this.selected.splice(j, 1);
                                Vue.set(item,"checked",false);
                                break;
                            }
                        }
                    }*/


                }

/*
                if (chooseAll) {
                    if (!this.selected.length) {
                        for (var i = 0; i < this.itemlist.length; i++) {
                            var item = this.itemlist[i];
                            var idPicSts = item.itemId + "=" + item.picStatus;
                            this.idPicSts.push(idPicSts);
                            this.selected.push(item.id);
                        }
                    } else {
                        for (var i = 0; i < this.itemlist.length; i++) {
                            for (var j = 0; j < this.selected.length; j++) {
                                var item = this.itemlist[i];
                                var idPicSts = item.itemId + "=" + item.picStatus;
                                if (this.itemlist[i].id == this.selected[j]) {
                                    break;
                                } else if (j < this.selected.length - 1) {
                                    continue;
                                }
                                this.idPicSts.push(idPicSts);
                                this.selected.push(this.itemlist[i].id);
                                break;
                            }
                        }
                    }
                } else {
                    for (var i = 0; i < this.itemlist.length; i++) {
                        for (var j = 0; j < this.selected.length; j++) {
                            if (this.itemlist[i].id == this.selected[j]) {
                                this.idPicSts.splice(j, 1);
                                this.selected.splice(j, 1);
                                break;
                            }
                        }
                    }
                }*/
            },
            addToPool: function(itemSource, callback) {
                //存入商品池
                var self = this;
                IO({
                    url: self.api,
                    type:"post",
                    dataType: "json",

                    data: {
                        type: 3,
                        itemSource: itemSource, // 公共池:1,招商:0
                        activityId: self.activityId, // 活动id
                        ids: self.selected.join(','),
                        idPicSts:self.idPicSts.join(','),
                        _input_charset: 'utf8'
                    },
                    success: function(res) {
                        if (res.success) {
                            if(self.selected.length>1){
                                mAlert(res.data.msg);
                            }
                            dispatch.fire("ctrl-detail-change-itemNum",{num:res.data.count});

/*
                            self.$dispatch("changeItemNum",res.data.count)
*/
                            callback && callback();
                            dispatch.fire("updata-manage-pool-list");
                        } else {
                            mAlert('添加商品失败',"danger")
                        }
                        self.selected = [];
                        self.idPicSts = [];
                    },
                    error: function() {
                        self.selected = [];
                        self.idPicSts = [];
                        mAlert('添加商品失败',"danger")
                    }
                });
            },

        /*    addPool:function(obj){
                var self = this;
                var req = {
                    type: 3,
                    zsId:obj.zsId,
                    zsField:obj.zsField,
                    sellerSource:obj.sellerSource,
                    itemSource: obj.itemSource, // 公共池:1,招商:0
                    activityId: self.activityId, // 活动id
                    ids: self.selected.join(','),
                    idPicSts:self.idPicSts.join(','),
                    _input_charset: 'utf8'
                };
                IO({
                    url: "/luban/LbSourceScreen.do",
                    type:"post",
                    dataType: "json",
                    data: req,
                    success: function(res) {
                        if (res.success) {
                            self.selected = [];
                            mAlert(res.data.msg);
                            dispatch.fire("ctrl-detail-change-itemNum",{num:res.data.count});
                        } else {
                            mAlert('添加商品失败',"danger");
                        }
                    },
                    error: function() {
                        mAlert('添加商品失败',"danger");

                    }
                });
            },*/
/*
            pool-manage-passpool
*/
            poolManagePass:function(callback){
                var self = this;
                IO({
                    url: '/luban/LbReleaseSourceScreen.do',
                    type:"post",
                    dataType: "json",
                    data: {
                        type: 3,
                        activityId: self.activityId, // 活动id
                        ids: self.selected.join(','),
                        _input_charset: 'utf8'
                    },
                    success: function(res) {
                        self.selected = [];
                        if (res.success) {
                            mAlert("审核通过");
                            callback && callback();
                        } else {
                            mAlert('审核失败',"danger");
                            window.app.$refs.loading.closeLoading();
                        }
                    },
                    error: function() {
                        self.selected = [];
                        mAlert('审核失败',"danger");
                        window.app.$refs.loading.closeLoading();

                    }
                });

            },
            addToBizPool:function(itemSource, sellerSource,zsId,zsField,ishideloading,callback) {
                var self = this;
                IO({
                    url: self.api,
                    type:"post",
                    dataType: "json",
                    data: {
                        type: 3,
                        itemSource: itemSource, // 公共池:1,招商:0
                        activityId: self.activityId, // 活动id
                        ids: self.selected.join(','),
                        idPicSts:self.idPicSts.join(','),
                        zsId:zsId,
                        zsField:zsField,
                        sellerSource:sellerSource,
                        _input_charset: 'utf8'
                    },
                    success: function(res) {

                        if (res.success) {
                            if(self.selected.length>1){
                                mAlert(res.data.msg);
                            }
                            dispatch.fire("ctrl-detail-change-itemNum",{num:res.data.count});
                            callback && callback();
                            dispatch.fire("updata-manage-pool-list");

                        } else {
                            mAlert('添加商品失败',"danger");
                            window.app.$refs.loading.closeLoading();
                        }
                        self.selected = [];
                        self.idPicSts = [];
                    },
                    error: function() {
                        self.selected = [];
                        self.idPicSts = [];
                        mAlert('添加商品失败',"danger");
                        window.app.$refs.loading.closeLoading();

                    }
                },ishideloading);
            },
            delFromPool(callback) {
                //商品管理池中删除
                var self = this;
                if(!self.selected.length){
                    mAlert('请先选择宝贝再删除',"danger")
                    return
                }
                IO({
                    url: self.manageApi,
                    type:"post",
                    dataType: "json",
                    data: {
                        type: 2,
                        ids: self.selected.join(','),
                        _input_charset: 'utf8',
                        activityId: self.activityId, // 活动id
                    },
                    success: function(res) {
                        if (res.success) {
                            mAlert("删除商品成功");
                            self.$dispatch("changeItemNum",res.total);
                            dispatch.fire("updata-pool-status");

                            callback && callback();

                        } else {
                            alert(res.errorMsb);
                        }
                        self.selected = [];

                    },
                    error: function() {
                        mAlert('添加商品失败',"danger");
                        self.selected = [];
                    }
                });
            }
        },
        watch: {
            itemlist() {
                this.$broadcast('refreshSelected');
            },
            selected(){
                this.$dispatch('changeSelectItem', this.selected.length)
            }
        },
        ready() {
            var self = this;
            self.activityId = Env.params.activityId;
            dispatch.on("fire-addPool",function(obj){
                var parms = obj.parms;
                self.addPool(parms);
            })

            dispatch.on("itempreview-mouseenter",function(obj){
                self.previewUrl = obj.item.picUrl;
                self.isshowimg = true;
                var offsetLeft = parseInt(obj.target.offsetLeft);
                var offsetTop = parseInt(obj.target.offsetTop);

                if (offsetLeft > 600) {
                    self.showimgcss.left = offsetLeft-260 + "px";
                } else {
                    self.showimgcss.left = offsetLeft+120 + "px";
                }
                self.showimgcss.top = offsetTop + "px";
            })
            dispatch.on("itempreview-mouseleave",function(obj){

                self.showBigTimer = setTimeout(function(){
                    self.isshowimg = false;
                 },500)
            })

        setTimeout(function(){
                jscolor.installByClassName("jscolor");
            },10);
        }
    }
</script>