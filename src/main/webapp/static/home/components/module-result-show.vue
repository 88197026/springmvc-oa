<template>

    <modal :show.sync="showEditModal" title="微编辑"  large width="1200px" >
        <div slot="modal-body" class="modal-body c-t">
            <div class="control-box-col btn-group zoom-warp">
                <span class="mr5 glyphicon glyphicon-minus-sign" @click="doZoomS"></span>
                <span class="mr5">{{zoomNum}}<span>%</span></span>
                <span class=" glyphicon glyphicon-plus-sign" @click="doZoomB"></span>
            </div>
            <div class="edit-content-warp">
               <edit-content  v-ref:edit  :show-lables="showEditRL" :apiurl="api" :showleftbox = "showEditRL" :isautoinit = "showEditRL" :istextchoosed = "showEditRL" :allresize = "showEditRL" :whres = "editWhres"  :showrightbox = "showEditRL" ></edit-content>
            </div>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-success" @click="saveEdit">保存</button>
        </div>
    </modal>
    <div class="wrapper">
        <div class="flex-box">
            <div class="control-box-col btn-group ">
                <button class="btn btn-default " @click="loadBanner('',0,'',1)"  v-bind:class="{ 'active': filterStatus==0}" >未审核{{totalNum}}</button>
                <button class="btn btn-default"  @click="loadBanner('',1,'',1)"  v-bind:class="{ 'active': filterStatus==1}">已通过{{releaseNum}}</button>
                <button class="btn btn-default"  @click="loadBanner('',-1,'',1)" v-bind:class="{ 'active': filterStatus== -1}">已删除{{deleteNum}}</button>
            </div>

            <div class="module-result-operation">
                <div class="left" v-show = "filterStatus == 0">
                    <input type="checkbox" v-model="chooseAllVal" @click="chooseAll" ><span class="mr5">全选</span>
                    <button class="btn btn-success mr5" @click="bannerPass">批量通过</button>
                    <button class="btn btn-danger " @click="bannerDel">批量删除</button>
                </div>
                <div class="left" v-show = "filterStatus == 1">
                    <input type="checkbox" v-model="chooseAllVal" class="mr5" @click="chooseAll"><span class="mr5">全选</span>
                    <button class="btn btn-danger" @click="bannerDel">批量删除</button>
                </div>
                <div class="left" v-show = "filterStatus == -1">
                    <input type="checkbox" v-model="chooseAllVal" class="mr5" @click="chooseAll"><span class="mr5">全选</span>
                    <button class="btn btn-success" @click="bannerFix">批量恢复</button>
                </div>
            </div>
        </div>
        <div class="banner-result">
            <div class="banner-result-show">
                <module-result-item :showedit = showEdit :positionw= positionW :positionh= positionH  v-for="item in itemlist" :item="item" :selected="selected"></module-result-item>
            </div>
        </div>
        <div>
            <div class="module-result-operation t_r " v-show = "itemlist.length > '20'">
                <div class="left" v-show = "filterStatus == 0">
                    <input type="checkbox" v-model="chooseAllVal" @click="chooseAll" ><span class="mr5">全选</span>
                    <button class="btn btn-success mr5" @click="bannerPass">批量通过</button>
                    <button class="btn btn-danger " @click="bannerDel">批量删除</button>
                </div>
                <div class="left" v-show = "filterStatus == 1">
                    <input type="checkbox" v-model="chooseAllVal" class="mr5" @click="chooseAll"><span class="mr5">全选</span>
                    <button class="btn btn-danger" @click="bannerDel">批量删除</button>
                </div>
                <div class="left" v-show = "filterStatus == -1">
                    <input type="checkbox" v-model="chooseAllVal" class="mr5" @click="chooseAll"><span class="mr5">全选</span>
                    <button class="btn btn-success" @click="bannerFix">批量恢复</button>
                </div>
            </div>

        </div>   


        <div class="pagination-warp"   v-show= "totalPages>'1'" >
                 <boot-pagination   :page="page"  :totalpages="totalPages" ></boot-pagination>
        </div>
    </div>
</template>
<style lang='sass'>
.bg-color-info {
    .dropdown-toggle {
        background-color: rgba(0,0,0,0) !important;
        border-radius:0px;
    }
}
.pagination-warp{
  width: 100%;
  text-align: center;
  overflow: hidden;
}
.bg-color-info {
    position: absolute;
    top: 260px;
    left: 15%;
    .dropdown-toggle {
        background-color: rgba(0,0,0,0) !important;
    }
    .btn-default {
        border-radius: 20px;
        margin-left:20px;
    }
}

.flex-box{
    height: 100%;
    display: -webkit-box;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -webkit-box-align: center;
}

.module-result-operation {
    display: flex;
    .left {
        flex:1;
        input {
            vertical-align: text-top;
            margin:0 4px 0 0;
        }

        .btn-default {
            border-radius: 20px;
            margin-left:20px;
        }
    }
}
.banner-result {
    width:100%;
    margin-top:50px;
    overflow: hidden;
}
.banner-result-show{
  width:100%;
  margin:auto;

}
.loading {
  width:100%;
  height:200px;
  line-height:200px;
  text-align:center;
  color:#666;
  font-size:14px;
}
.edit-content-warp{
  padding:20px 0px;
}
.zoom-warp{
  display: inline-block;
  margin-top: 20px;
}
</style>
<script>
    import moduleResultItem from '../components/module-result-item.vue';
    import {IO} from '../common/js/utils';
    import { mAlert } from "../common/js/utils";
    import { modal } from 'vue-strap';
    import {  radioBtn, radioGroup } from 'vue-strap';
    import Env from '@ali/lib-env';
    import vSelect from 'vue-strap/src/Select.vue';
    import vOption from 'vue-strap/src/Option.vue';
    import bootPagination from '../components/boot-pagination.vue';
    import editContent from '../components/edit-content.vue';
    import dispatch from "../common/js/dispatch";    
    export default{
        data(){
            return{
                selected: [],
                chooseAllVal: false,
                api: '/luban/LbResultScreen.do',
                itemlist: [],
                positionList:[],
                loading:false,
                positionId:"",
                hexs:[],
                bgcolor:"0",
                totalNum:0,
                backgroundRawdata:{},
                deleteNum:0,
                releaseNum:0,
                positionW:0,
                positionH:0,
                page:1,
                showEditModal:false,
                showEdit:true,
                totalPages:10,
                showEditRL:false,
                zoomNum:100,
                rawType:"1",
                editWhres:true,
                eidtId:0,
                eidtItem:"",
                filterStatus:0//审核状态(1-通过、0-初始化、-1-删除)
            }
        },
        components: {
            moduleResultItem,
            vOption,
            vSelect,
            bootPagination,
            modal,
            editContent
        },
        methods: {
        	clearRes(){
        		var com=this;
        		if(com.bgcolor!='0'&&com.positionId){
        			 IO({
                         url: com.api,
                         type:"get",
                         dataType: "jsonp",
                         data: {
                             type: 7,
                             backgroundRgb: com.bgcolor,
                             releasePositionId:com.positionId,
                             _input_charset: 'utf8'
                         },
                         success: function(res) {
                        	 com.loadBanner(com.positionId);                       	  
                         },
                         error: function(res) {
                             console.log(res);
                         }
                     });
        		}
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
                $(".banner-result .thumbnail-active").hide();

                IO({
                    url: self.api,
                    type:"post",
                    dataType: "json",

                    data:{
                        type: 3,
                        ids: self.selected.join(','),
                        _input_charset: 'utf8'
                    },
                    success: function(res) {
                    	  //self.clearElement();
                        $(".banner-result .thumbnail-active").hide();
                        mAlert('批量通过成功')
                    },
                    error: function() {
                        mAlert('批量通过失败','danger')
                    }
                });
            },
            clearElement(){
                this.loadBanner(this.positionId,this.filterStatus);
            },
            bannerDel() {
                var self = this;
                IO({
                    url: self.api,
                    type:"post",
                    dataType: "json",

                    data: {
                        type: 4,
                        ids: self.selected.join(','),
                        _input_charset: 'utf8',
                        status:self.filterStatus,
                    },
                    success: function(res) {
                    	self.clearElement();
                        mAlert('批量删除成功')

                    },
                    error: function() {
                        mAlert('批量删除失败','danger')
                    }
                });
            },

            initEditModal:function(item){
              this.eidtId = item.id;
              this.eidtItem = item;
              this.$refs.edit.initRdata({type:"micoedit",id:this.eidtId});                  
            },
            saveEdit:function(){
              var self = this;
               this.$refs.edit.doSave({type:"domicoedit",id:this.eidtId,bc:function (data){
                  self.eidtItem.resultUrl = data;
                  self.showEditModal = false;         
               }}); 
            },
            doZoomB:function(){
                if(this.zoomNum<100){
                    this.zoomNum +=10;
                     this.$refs.edit.doZoom(this.zoomNum);
                }
            },
            doZoomS:function(){
                if(this.zoomNum>0){
                    this.zoomNum -=10;
                     this.$refs.edit.doZoom(this.zoomNum);
                }
            },
            bannerFix(){
                var self = this;
                IO({
                    url: self.api,
                    type:"post",
                    dataType: "json",

                    data: {
                        type: 5,
                        ids: self.selected.join(','),
                        _input_charset: 'utf8',
                        status:self.filterStatus,
                    },
                    
                    success: function(res) {
                      self.clearElement();
                        mAlert('批量恢复成功');
                    },
                    error: function() {
                        mAlert('批量恢复失败','danger');
                    }
                });
            },
            loadBanner(positionId,filterStatus,isloading,page){
            	  var self = this;
                filterStatus = filterStatus||0;
          	    var activityId = Env.params.activityId;
                positionId = positionId||self.positionId;
                self.filterStatus = filterStatus;
                self.page = page||self.page;
                IO({
                      url: self.api,
                      type:"get",
                      dataType: "jsonp",
                    
                      data: {
                          type: 2,
                          activityId: activityId,
                          releasePositionId:positionId||self.positionId,
                          status:filterStatus,
                          _input_charset: 'utf8',
                          pageSize:"40",
                          pageNo:self.page
                      },
                      success: function(res){
                          if(res.success){
                              self.itemlist = res.data.lbResultListDTOList;
                              self.totalNum=res.data.totalNum;
                              self.deleteNum=res.data.deleteNum||0;
                              self.releaseNum=res.data.releaseNum||0;
                              self.hexs=res.data.hexs;
                              self.totalPages = res.data.pageCount||1;
                              self.backgroundRawdata = res.data.backgroundRawdata;
                              window.app.$refs.modulemanage.$emit('updataHex', self.backgroundRawdata);
                              self.chooseAllVal=false;
                              self.selected=[];
                              self.positionId=positionId;
                              window.app.$refs.modulectrldetail.passedNum = self.releaseNum;
                          }else{
                              mAlert(res.errorMsg,"danger")
                          }

                      },
                      error: function(res) {
                          console.log(res);
                      }
                  },isloading);
            }
        },
        ready() {
        	var com=this;
             com.$on('PAGE_DATA_GET', function(data) {
            	 com.positionList=data.lbReleasePositionListDTOList;
            	 if(com.positionList.length>0){
            		 com.loadBanner(com.positionList[0].id);
                     com.positionW = parseFloat(com.positionList[0].width);
                     com.positionH = parseFloat(com.positionList[0].heigh);
            	    }
                 window.app.$refs.modulemanage.$on("changePostionSize",function(w,h){
                     com.positionW = w;
                     com.positionH = h;
                 })
             });
            dispatch.on("changepag-page",function(obj){
                var type = obj.eletype;
                if(type =="default"){
                     com.page = obj.page;
                  com.loadBanner("",com.filterStatus);
                }
             
            })
            dispatch.on("showedit",function(obj){
                com.showEditModal = true;
                com.initEditModal(obj.item);
            
            })
            dispatch.fire("raw-type",function(obj){
                com.rawType = obj.rawType;
                switch(com.rawType){
                  case "1":
                    com.showEdit = true;
                    break;
                  case "2":
                    com.showEdit = false;
                    break;    
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
        }
    }
</script>