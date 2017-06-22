<style lang="sass">
  .bar .btn{
    padding: 10px 30px;
  }
  .table th {
    border-width: 0px;
    text-align: left;
  }
  .uppsd {
    position: relative;
  }
  .edit-icon-input{
    width: 150px;
    display: inline-block;
  }
  .lable-btn-warp{
    text-align: center;
    margin: 30px 0px;
  }
  .confirm-text{
    text-align: center;
    font-size: 16px;
    padding: 20px;
  }

  .lable-container-warp{
    background-color: #eee;
    padding:20px;
    .lable-container{
      position: relative;
      overflow: hidden;
      margin-bottom: 30px;
      height: 310px;
      background-color: #eee;
      overflow-y: auto;
      .thumbnail {
        text-align: center;
        font-size: 12px;
        cursor: pointer;
        width: 170px;
        float: left;
        border: 1px solid transparent;
        padding: 0px;
        margin-right: 12px;
        margin-bottom: 0px;
        .img {
          display: block;
          width: 100%;
        }
        .desc {
          padding: 5px;
          border-top-width: 0;
        }
      }
      .icon-img-active{
        border: 1px solid #49b7fb;
      }


    }
  }


  .show-create-tuku-modal-body{
    padding: 20px 10px;
    .tuku-input{
      width: 250px;
    }

  }

</style>
<template>
  <modal :show.sync="confirmModal" >
    <div slot="modal-header" class="modal-header hide"></div>

    <div slot="modal-body" class="modal-body confirm-text">{{confirmText}}</div>
    <div slot="modal-footer" class="modal-footer">
    <button type="button" class="btn btn-default" @click='confirmModal = false'>取消</button>
    <button type="button" class="btn btn-success" @click='doSucessBc' >确认</button>
    </div>
  </modal>

  <modal :show.sync="createModal" title="创建模板" effect="fade" width="400">
    <div slot="modal-body" class="modal-body">
      <table class="table">
        <tbody >
        <tr>
          <th><label>模板名称</label></th>
          <th class="form-group">
            <input id="act_name"  v-model="name" class="form-control name-input" type="text"  require="true"/>
          </th>
          <th>必填</th>
        </tr>
        <tr>
          <th><label>BU部门</label></th>
          <th class="form-group">
            <v-select   placeholder='请选择' :value.sync = bu >
              <v-option v-for = "item in bulist"  :value = item.id >{{item.buName}}</v-option>
            </v-select>
          </th>
          <th>必填</th>
        </tr>
        <tr v-show="currentbuZlist">
          <th><label>产品线</label></th>
          <th class="form-group">
            <v-select   placeholder='请选择' :value.sync= bizId >
              <v-option  v-for = "item in currentbuZlist" :value= item.id>{{item.bizName}}</v-option>
            </v-select>
          </th>
          <th>必填</th>
        </tr>
        <tr>
          <th><label>模板描述</label></th>
          <th class="form-group"><input v-model="info" class="form-control" type="text" /></th>
          <th></th>
        </tr>
        <tr>
          <th>图片宽</th>
          <th><input class="form-control" id="act_width" readonly  type="text" v-model="width"/></th>
        </tr>
        <tr>
          <th>图片高</th>
          <th><input class="form-control" id="act_height" readonly type="text" v-model="height"/></th>
        </tr>
        <tr>
          <th>预览图</th>
          <th><input id="act_preview_url" class="form-control" type="text" v-model="previewUrl" /></th>
        </tr>
        </tbody>
      </table>
      <div class="uppsd">
        <form action="/file-upload" class="dropzone" enctype="multipart/form-data" id="my-awesome-dropzone">
        </form>
      </div>
    </div>
    <div slot="modal-footer" class="modal-footer">
      <button type="button" class="btn btn-success">创建</button>
    </div>
  </modal>

  <modal :show.sync="createUpPsdModal" title="上传psd" effect="fade" width="400">
    <div slot="modal-body" class="modal-body">
      <table class="table">
        <tbody >
        <tr>
          <th><label>模板名称</label></th>
          <th class="form-group">
            <input   v-model="sjUppsdName" class="form-control name-input" type="text"  require="true"/>
          </th>
          <th>必填</th>
        </tr>
        <tr>
          <th><label>模板属性</label></th>
          <th class="form-group">
            <cm-style-seclect></cm-style-seclect>
          </th>
        </tr>
        <tr>
          <th>图片宽</th>
          <th><input class="form-control"  readonly  type="text" v-model="sjUppsdWidth"/></th>
        </tr>
        <tr>
          <th>图片高</th>
          <th><input class="form-control"  readonly type="text" v-model="sjUppsdHeight"/></th>
        </tr>
        </tbody>
      </table>
      <div class="uppsd">
        <form action="/file-upload" class="dropzone" enctype="multipart/form-data" id="sj-uppsd-dropzone">
        </form>
      </div>
    </div>
    <div slot="modal-footer" class="modal-footer">
      <button type="button" class="btn btn-success" >创建</button>
    </div>
  </modal>






  <modal title="编辑业务标签"  :show.sync="editIconModal" width="1000px">
    <div slot="modal-body" class="modal-body ">
      <div class="editicon-modal row mt20 mb20">
       <!-- <div class="inblock ml20 mr5 ">
          <div class="">
            <v-select   placeholder='请选择' :value.sync = bu >
              <v-option track-by="$index" v-for = "item in bulist"  :value = item.id >{{item.buName}}</v-option>
            </v-select>
          </div>
        </div>

        <div class="inblock ">
          <div class="">
            <v-select   placeholder='请选择' :value.sync= bizId >
              <v-option  track-by="$index" v-for = "item in currentbuZlist" :value= item.id>{{item.bizName}}</v-option>
            </v-select>
          </div>
        </div>-->

        <div class="inblock ml20 w400">
          <p class="inblock mr5">关键词</p>
          <input  class="edit-icon-input form-control" v-model="iconSearchInput" type="text" >
          <div class="btn btn-success" @click="serachLable">搜索标签</div>
        </div>
      </div>
      <div class="lable-container-warp">
        <div class="edit-icon-panle lable-container" id="lable-container">
          <!--<img  class="thumbnailimg icon-img" @click="showUpLableModal" src="https://gw.alicdn.com/tps/TB1SP3FMVXXXXcKaXXXXXXXXXXX-190-80.png" alt="">
          <img  @click="chooseLable(item)" class="icon-img thumbnailimg" :class={'icon-img-active':eidtIconChooseId==item.id} v-for="item in eidtIconList"  :src="item.logoUrl" alt=""/>
-->
          <div class="thumbnail " @click = "showUpLableModal">
            <img class="psdimg img" src="https://gw.alicdn.com/tps/TB1CNXeNXXXXXX2XpXXXXXXXXXX-380-160.png" alt=""/>
            <div class="desc mt5">
            </div>
          </div>
          <div  v-for = "item in eidtIconList" class="thumbnail"  :class={'icon-img-active':eidtIconChooseId==item.id} @click ="chooseLable(item)">
            <img class="img"   v-bind:src = "item.logoUrl"/>
            <div class="desc mt5">
              {{item.name}}
            </div>
          </div>


        </div>



      </div>

      <div class="edit-icon-rd ml20">
        <p>选择尺寸（必选）</p>
        <div>
          <div class="inline ml5">
            <input type="radio" id="big-icon" class="inline m0" value="3" v-model="eidtIconSize">
            <label for="big-icon" class="mr15">大尺寸（高约占12%）</label>
            <input type="radio" id="m-icon" class="inline m0" value="2" v-model="eidtIconSize">
            <label for="m-icon" class="mr15">中尺寸（ <span>推荐</span>，高约占12%）</label>
            <input type="radio" id="s-icon" class="inline m0" value="1" v-model="eidtIconSize">
            <label for="s-icon" >小尺寸（ 高约占8%）</label>
          </div>
        </div>

      </div>
  <!--    <div class="lable-btn-warp">
        <button type="button" class="btn btn-default" @click="cancleLableBtn"> 不使用任何标签 </button>
        <button class="btn btn-primary"   @click="useLableBtn">确认</button>
      </div>-->

      <div class="upPsd-btn btn upPsd-btn-success"   @click="useLableBtn">确认</div>
    </div>
    <div slot="modal-footer" class="modal-footer hide"></div>
  </modal>

  <modal :show.sync="upLableModal" title="上传业务标签"  effect="fade" width="400">
    <div slot="modal-body" class="modal-body">
      <table class="table">
        <tbody>
        <tr>
          <th><label>标签名称</label></th>
          <th class="form-group">
            <input id="lable_name"  v-model="LableName" class="form-control name-input" type="text"  require="true"/>
          </th>
        </tr>
        <tr>
          <th><label>标签分组</label></th>
          <th class="form-group">
            <v-select  class="mr10"  placeholder='请选择' :value.sync = bu >
              <v-option v-for = "item in bulist"  :value = item.id >{{item.buName}}</v-option>
            </v-select>
            <v-select   placeholder='请选择' :value.sync= bizId >
              <v-option  v-for = "item in currentbuZlist" :value= item.id>{{item.bizName}}</v-option>
            </v-select>
          </th>
        </tbody>
      </table>

      </tr>

      <div class="uppsd">
        <form action="/file-upload" class="dropzone" enctype="multipart/form-data" id="lable-uppsd-dropzone">
        </form>
      </div>
    </div>
    <div slot="modal-footer" class="modal-footer">
      <button type="button" class="btn btn-success" @click="addLableIcon">确认</button>
    </div>
  </modal>

  <!--插件版本modal-->


  <modal title="新建图库"  :show.sync="showCreateTuKuModal" width="400px">
    <div slot="modal-body" class="modal-body ">
      <form class="form-inline show-create-tuku-modal-body">
        <div class="form-group">
          <input type="text" class="form-control tuku-input" v-model="tuKuValue" placeholder="为图库起名,不多于15字">
        </div>
        <div class="btn btn-primary inblock" @click="createTuKu">确定</div>
      </form>
    </div>
    <div slot="modal-footer" class="modal-footer hide"></div>
  </modal>






</template>
<script>
  var utils = require('../common/js/utils.js');
  import { IO } from "../common/js/utils";
  import { mAlert } from "../common/js/utils";
  import dispatch from "../common/js/dispatch";
  import vSelect from 'vue-strap/src/Select.vue';
  import vOption from 'vue-strap/src/Option.vue';
  import { modal } from "vue-strap";
  var Pagination = require('../common/js/lib-pagination.js');


  module.exports = {
      props: ['positionid','lablehadchooseid','lablelogotagsize'],
      data: function() {
          return {
            confirmModal:false,
            confirmText:"",
            confirmSucessBc:"",
            createUpPsdModal:false,
            initUpPsdModal:false,
            createModal:false,
            initBuInfo:false,
            bu:"1",
            bizId:"1",
            buZlist:{},
            currentbuZlist:[{"bizName":"首焦","buId":"1","id":"1"},{"bizName":"中通","buId":"1","id":"2"},{"bizName":"底通","buId":"1","id":"2"}],
            bulist:[{"buName":"手淘","id":"1"},{"buName":"淘宝","id":"2"},{"buName":"天猫","id":"3"},{"buName":"聚划算","id":"4"}],
            editIconModal:false,
            eidtIconSize:2,
            eidtIconList:[],
            eidtIconPageNo:1,
            eidtIconChooseId:"",
            labePage:1,
            iconSearchInput:"",
            upLableModal:false,
            initUpLableModal:false,
            currentLableHref:"",
            currentLabeDropz:"",
            LableName:"",
            initLableTarget:false,
            isloadingLableAjax:false,

            /*创建图库Modal参数*/
            showCreateTuKuModal:false,//创建图库弹层
            tuKuValue:""



          }
      },
      components: {
          modal,
          alert,
          vSelect,
          vOption,
          cmStyleSeclect: require('../components/cm-style-seclect.vue')

      },
      watch:{
        bu:function(){
          var self = this;
          this.currentbuZlist = this.buZlist[this.bu];
          if(this.currentbuZlist&&this.currentbuZlist.length){
            self.bizId = self.currentbuZlist[0].id;
          }
          if(this.updateItem&&this.updateItem.bu){
            this.updateItem.bu = this.bu;
          }
        }

      },
      methods:{
          showConfirmModal:function(message,bc){
              this.confirmModal = true;
              this.confirmText = message;
              if(bc){
                  this.confirmSucessBc = bc;
              }
          },
          serachLable:function(){
            var self = this;
            self.eidtIconList = [];
            self.lableListEnd = false;
            self.getAjaxList(1);
          },
          getAjaxList:function(page){
            var self = this;
            self.isloadingLableAjax = true;
            page = self.labePage||page;
            IO({
              url : "/luban/LbLogoTagScreen.do?_input_charset=utf8",
              data : {
                type:'queryList',
                name:self.iconSearchInput,
                pageNo:page,
                pageSize:60
              },
              dataType:"jsonp",
              success : function(res) {
                if(res.success){
                  var list = res.data.list ||[];
                  self.eidtIconList = self.eidtIconList.concat(list);
                  self.isloadingLableAjax = false;
                  if(self.eidtIconList.length<60){
                    self.lableListEnd = true;
                  }
                  setTimeout(function() {
                    waterfall('lable-container', 'thumbnail');
                  }, 100);
                }
              },
              error: function() {
                console.log("error");
              }
            });


          },
          cancleLableBtn:function(){
            var self = this;
            if(!self.lablehadchooseid){
              mAlert("当前的模版还没有使用图标");
              return;
            }
            IO({
              url : "/luban/LbReleasePositionScreen.do?_input_charset=utf8",
              data : {
                type:'deletelogotag',
                positionId:self.positionid,
                logoTagId:self.lablehadchooseid
              },
              dataType:"jsonp",
              contentType: 'multipart/form-data',
              success : function(res) {
                if(res.success){
                  mAlert("标签删除成功");
                  dispatch.fire("del-lable",{res:res})
                  //location.reload();
                }
              },
              error: function() {
                console.log("error");
              }
            });
          },
          useLableBtn:function(){
            var self = this;
            if(!self.eidtIconChooseId){
              mAlert("需要选择一个标签","danger");
              return;
            }
            IO({
              url : "/luban/LbReleasePositionScreen.do?_input_charset=utf8",
              data : {
                type:'updatelogotag',
                logoTagSize:self.eidtIconSize,
                positionId:self.positionid,
                logoTagId:self.eidtIconChooseId
              },
              dataType:"jsonp",

              contentType: 'multipart/form-data',
              success : function(res) {
                if(res.success){
                  mAlert("编辑成功");
                  self.editIconModal = false;
                  dispatch.fire("add-lable",{res:res,logoTagId:self.eidtIconChooseId})
                }
              },
              error: function() {
                console.log("error");
              }
            });

          },
          doSucessBc:function(){
             this.confirmModal = false;
             if(typeof this.confirmSucessBc == "function"){
                      this.confirmSucessBc();
              }
          },
          getBuData:function (){
            var self = this;
            IO({
              url : "/luban/rawdata.do?_input_charset=utf8",
              data : {
                type:'bu',
                pageNo:1,
                pageSize:60
              },
              contentType: 'multipart/form-data',
              dataType:"jsonp",
              success : function(res) {
                if(res.success){
                  var data =  res.data;
                  self.buZlist = JSON.parse(data.biz.replace(/&quot;/g, '\"'));
                  self.bulist = JSON.parse(data.bu.replace(/&quot;/g, '\"'));
                  self.bu = String(self.bulist[0].id);
                  self.currentbuZlist = self.buZlist[self.bu];
                  self.bizId =  String(self.currentbuZlist[0].id);

                }else{
                  mAlert("获取BU数据失败","danger");
                  return;
                }
              },
              error: function() {
                console.log("error");
              }
            });
          },

        showCreateModal:function(){
          var  self = this;
          self.createModal = true;
          if(!self.initBuInfo){
              self.initBuInfo = true;
              self.getBuData();
          }
        },
        showEditIconModal:function(){
          var  self = this;
          self.editIconModal = true;
          if(!self.initLableTarget){
            var pageloader = new Pagination({
              container: '#lable-container',
              loadMoreBottom: 100,
              containerScroll:true,
              loadMore: function () {
                if (!self.isloadingLableAjax&&!self.lableListEnd) {
                  self.labePage++;
                  self.getAjaxList();
                }
              }
            }).init();
            self.initLableTarget = false;
            self.serachLable();
          }
        },
        chooseLable:function(item){
            this.eidtIconChooseId = item.id;
        },
        showUpLableModal:function(){
          var self = this;
          this.upLableModal = true;
          if(!self.initUpLableModal){
            self.initUpLableModal = true;
            self.initUpLableDropzone();
          }
        },
        showCreateUpPsdModal:function(){
          var  self = this;
          self.createUpPsdModal = true;
          if(!self.initUpPsdModal){
            self.initUpPsdModal = true;
            self.initUppsdDropzone();
          }
        },

        initUpLableDropzone:function(){
          var self = this;
          var dropz = "";
          self.currentLabeDropz =dropz = new Dropzone("#lable-uppsd-dropzone", {
            url: utils.hostName+"/luban/LbLogoTagScreen.do?type=uploadLogo",
            addRemoveLinks: true,
            acceptedFiles: ".png",
            maxFilesize:3,
            uploadMultiple:false,
            paramName:"logo_file",
            parallelUploads:1,
            dictDefaultMessage:"点击上传透明png,支持拖拽",
            params:{
              type:"uploadLogo"
            },
            maxFiles:1
          });
          dropz.on("error", function(file,message) {
            mAlert(message,"danger");
          });
          dropz.on("success", function(file,res) {
            var res = JSON.parse(res);
            if(res.success){
              mAlert("图片上传成功");
              self.currentLableHref = res.data;
            }else{
              var message = res.errorMsg||"上传失败";
              mAlert(message,"danger");
            }
          });
        },
        addLableIcon:function(){
          var self = this;
          if(utils.checkEmptyStr(self.LableName)){
            mAlert("标签名字不能为空","danger");
            return;
          }
          if(!self.currentLabeDropz.getAcceptedFiles().length){
            mAlert("需要上传至少1张透明png","danger");
            return;
          }
          IO({
            url : "/luban/LbLogoTagScreen.do?_input_charset=utf8",
            data : {
              type:'add',
              buConfigId:self.bizId,
              logoUrl:self.currentLableHref,
              name:self.LableName
            },
            dataType:"jsonp",
            contentType: 'multipart/form-data',
            success : function(res) {
              if(res.success){
                self.upLableModal = false;
                self.serachLable();
                mAlert("上传业务标签成功");
              }
            },
            error: function() {
              console.log("error");
            }
          });
        },


        /*--创建图库方法--*/
        doShowCreateTuKuModal:function(){
          this.showCreateTuKuModal = true;
        },
        createTuKu:function(){
          if(!this.tuKuValue){
            return;
          }
          dispatch.fire("modal-manage-create-tuku",{tuKuValue:this.tuKuValue})
        },
        doCloseCreateTuKuModal:function(){
          this.showCreateTuKuModal = false;
        },

        /*-----------------------------------------*/
        initUppsdDropzone:function(){
          var self = this;
          var dropz = new Dropzone("#sj-uppsd-dropzone", {
            url: hostName+"/luban/Rawdata.do",
            addRemoveLinks: true,
            acceptedFiles: ".psd",
            maxFilesize:80,
            uploadMultiple:false,
            paramName:"psd_file",
            parallelUploads:1,
            params:{
              type:"psdupload"
            },
            maxFiles:1
          });
          dropz.on("error", function(file,message) {
            mAlert(message,"danger");
          });
          dropz.on("success", function(file,res) {
            var res = JSON.parse(res);
            if(res.success){
              self.sjUppsdWidth =res.data.width;
              self.sjUppsdHidth =res.data.height;
              //self.previewUrl = res.data.previewUrl;
              self.itemId  = res.data.id;
              mAlert("上传成功");
            }else{
              mAlert("上传失败","danger");
            }
          });
        }
      },
    ready:function(){

    }

    }
</script>