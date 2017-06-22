<template>
<modal :show.sync="smallModal" >
<div slot="modal-body" class="modal-body">{{modalText}}</div>
<div slot="modal-footer" class="modal-footer">
<button type="button" class="btn btn-default" @click='smallModal = false'>取消</button>
<button type="button" class="btn btn-success" @click='modalCallback'>确认</button>
</div>
</modal>
    <div class="wrapper">
        <div class="banner-control-box btn-group">
            <div class="btn-group" role="group" aria-label="">
                <button v-for="position  in positions " data-id="{{position.id}}" data-index="{{$index}}" type="button" class="btn btn-default btn-size" :class="{'active': positionId == position.id}" @click='rawClick($event,position)'><p>{{position.rawdataName}}</p><p>{{position.size}}</p></button>
            </div>

        </div>
        <div class="container-fluid">
            <div class="row banner-tool-bar">
                <div class="col-lg-6">
                    共通过{{releaseNum}}个
                </div>
                <div class="col-lg-6 module-result-operation">
                    <input type="checkbox" v-model="chooseAllVal" @click="chooseAll">全选(总生成<span>{{totalNum}}</span>个素材)
                    <button class="btn btn-default" @click="smallModal = true">批量删除</button>
                </div>
            </div>
        </div>
        <div class="banner-result">
            <div class="float-warp">
                <module-result-item v-for="item in itemlist" :positionw = "positionW" :positionh = "positionH" :item="item" :selected="selected"></module-result-item>
            </div>
        </div>

         <div class="pagination-warp"   v-show= "totalPages>1" >
                 <boot-pagination   :paginationid="paginationid" :type = "type" :page="page"  :totalpages="totalPages" ></boot-pagination>
        </div>
    </div>
</template>
<style lang='sass' scoped>
    .banner-control-box {
        display: flex;
        justify-content: center;
    }
    .banner-tool-bar {
        display: flex;
        align-items: center;
    }
    .float-warp{
        position:relative;
        overflow: hidden;
        display:inline-block;
        text-align:left;

    }
    .module-result-operation {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
    .banner-result {
        width:100%;
        margin: 0 auto;
        margin-top:50px;
        position: relative;
        text-align:center;

    }
    .pagination-warp{
      width: 100%;
      text-align: center;
      overflow: hidden;
    }
    p {
    	margin: 0 0 0px;
    }
</style>
<script>
    import moduleResultItem from '../components/module-result-item.vue';
    import { modal, radioBtn, radioGroup } from 'vue-strap';
    import {IO} from '../common/js/utils';
    import { mAlert } from "../common/js/utils";
    import Env from '@ali/lib-env';
    import dispatch from "../common/js/dispatch"; 
    import bootPagination from '../components/boot-pagination.vue';
    export default{
        data(){
            return{
                selected: [],
                chooseAllVal: false,
                radioValue: '',
                positions:[],
                api: '/luban/LbResultScreen.do',
                itemlist: [],
                smallModal:false,
                releaseNum:0,
                totalNum:0,
                positionW:0,
                positionH:0,
                modalText:'是否确认删除?',
                page:1,
                totalPages:10,
                positionId:0,
                type:"floattype",
                paginationid:"float-pagination"
            }
        },
        components: {
            moduleResultItem,
            radioGroup,
            radioBtn,
            modal,
            bootPagination
        },
        methods: {
        	modalCallback(){
        		this.bannerDel();
        	},
        	reload(){
        		   var com = this;
              	   var parent = com.$parent.$parent;
              	   this.positions=parent.$data.positionList;
              	   if(this.positions.length>0){
              		this.loadBanner(this.positions[0].id);
              		this.radioValue=this.positions[0].id+'';
                   this.positionW = this.positions[0].width;
                   this.positionH = this.positions[0].heigh;
              	  }
        	},  
            loadBanner(positionId){
          	  var self = this;
          	  var activityId = Env.params.activityId;
              this.positionId = positionId;
                IO({
                    url: self.api,
                    type:"get",
                    dataType: "jsonp",
                    data: {
                        type: 2,
                        activityId: activityId,
                        releasePositionId:this.positionId,
                        status:1,
                        pageSize:"30",
                        pageNo:self.page,
                        _input_charset: 'utf8'
                    },
                    success: function(res) {
                  	  self.itemlist = res.data.lbResultListDTOList;
                      self.releaseNum = res.data.releaseNum;
                      self.totalNum = res.data.totalNum;
                      self.totalPages = res.data.pageCount||1;
                    },
                    error: function(res) {
                        console.log(res);
                    }
                });
          },
            chooseAll() {
                if (!this.chooseAllVal) {
                    if (!this.selected.length) {
                        for (var i = 0; i < this.itemlist.length; i++) {
                            this.selected.push(this.itemlist[i].id);
                        }
                    } else {
                        for (var i = 0; i < this.itemlist.length; i++) {
                            for (var j = 0; j < this.selected.length; j++) {

                                if (this.itemlist[i].id == this.selected[j]) {
                                    break;
                                } else if (j < this.selected.length - 1) {
                                    continue;
                                }
                                this.selected.push(this.itemlist[i].id);
                                break;
                            }
                        }
                    }
                } else {
                    for (var i = 0; i < this.itemlist.length; i++) {
                        for (var j = 0; j < this.selected.length; j++) {
                            if (this.itemlist[i].id == this.selected[j]) {
                                this.selected.splice(j, 1);
                                break;
                            }
                        }
                    }
                }
            },
            bannerPass() {
                var self = this;
                IO({
                    url: self.api,
                    type:"get",
                    dataType: "jsonp",

                    data: {
                        type: 3,
                        ids: self.selected.join(','),
                        _input_charset: 'utf8'
                    },
                    success: function(res) {
                        mAlert("批量通过成功");
                    },
                    error: function() {
                        //alert('批量通过失败');
                        mAlert("批量通过失败","danger");
                    }
                });
            },

            rawClick:function(e,item){
                var target=e.currentTarget;
                var dataId=target.getAttribute("data-id");
                this.positionId=dataId;
                this.positionW = parseFloat(item.width);
                this.positionH = parseFloat(item.heigh);
                //this.$emit("changePostionSize",this.positionW,this.positionH);
                var idx=target.getAttribute("data-index");
                //this.previewUrl=this.positions[idx].previewUrl;
                this.loadBanner(dataId);
                this.page = 1;
                //this.getTextAjax();
            },
            bannerDel() {
                var self = this;
                IO({
                    url: self.api,
                    type:"get",
                    dataType: "jsonp",

                    data: {
                        type: 4,
                        ids: self.selected.join(','),
                        position:self.radioValue,
                        status:1,
                        _input_charset: 'utf8'
                    },
                    success: function(res) {
                    	 self.selected=[];
                    	 self.loadBanner(self.radioValue);
                    	 self.smallModal=false;
                        mAlert("批量删除成功");
                    },
                    error: function() {
                    	 self.selected=[];
                        //alert('批量删除失败');
                        mAlert("批量删除失败","danger");

                        self.smallModal=false;
                    }
                });
            }
        },
        ready() {
             var com = this;
               dispatch.on("changepag-page",function(obj){
                  var type = obj.eletype;
                  if(type =="floattype"){
                    com.page = obj.page;
                    com.loadBanner(com.positionId);
                  }
                 
              })
        },
        events: {
            choose(id) {
                for (var i = 0; i < this.selected.length; i++) {
                    if (this.selected[i] == id) {
                        this.selected.splice(i, 1);
                        this.chooseAllVal = false;
                        return;
                    }
                }
                this.selected.push(id);
            }
        },
        watch: {
            radioValue(val, old) {
                this.loadBanner(val);
            }
        }
    }
</script>