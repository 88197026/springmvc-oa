<template>
  <div class="row ctrl-raw">
    <div class="bar col-lg-2">
      <button class="btn btn-success " @click="showCreateModal = true">
        创建模板
      </button>
    </div>
    <div class="inblock ml20">
      <div class="">
        <span>所属BU:</span>
        <v-select placeholder='请选择' :value.sync = chooseBu >
          <v-option track-by="$index" v-for = "item in chooseBuList"  :value = item >{{item}}</v-option>
        </v-select>
      </div>
    </div>
    <div class="inblock ml20"  v-show = "chooseBizName">
      <div class="">
        <span>所属产品线:</span>
        <v-select   placeholder='请选择' :value.sync= chooseBizName >
          <v-option track-by="$index" v-for = "item in chooseBizList" :value= item>{{item}}</v-option>
        </v-select>
      </div>
    </div>
     <div class="inblock ml20"  v-show = "choosePuId">
      <div class="">
        <span>坑位:</span>
        <v-select   placeholder='请选择' :value.sync= 'choosePuId' >
          <v-option track-by="$index" v-for = "item in choosePuList" :value= item.id>{{item.name}}</v-option>
        </v-select>
      </div>
    </div>
    <div class="inblock ml20">
      <div class="">
        <span>来源:</span>
        <v-select   placeholder='请选择'  :value.sync= chooseSourId >
          <v-option  v-for = "item in chooseSourList" :value=item.id>{{item.name}}</v-option>
        </v-select>
      </div>
    </div>

    <div class="inblock ml20">
      <div class="">
        <span>上线状态:</span>
        <v-select   placeholder='请选择'  :value.sync= rawStatusId >
          <v-option   value= "1">上线</v-option>
          <v-option   value= "0">下线</v-option>
        </v-select>
      </div>
    </div>
    <div class="inblock ml20">
        模板总数:{{totoleNum}}
    </div>
  </div>
    <modal :show.sync="showCreateModal" title="创建模板" effect="fade" width="400">
      <div slot="modal-body" class="modal-body">
        <table class="table">
          <tbody >
            <tr>
              <th><label>模板名称</label></th>
              <th class="form-group">
                  <input id="act_name"  v-model="name" class="form-control name-input" type="text"  require="true"/>
                  <!-- <v-select placeholder="请选择色系"  class="inblock color-select"  :class="{'nocolor':!colorkind,'color1':colorkind=='#de2020','color2':colorkind=='#fe6c00','color3':colorkind=='#febf00','color4':colorkind=='#59a725','color5':colorkind=='#892bcf','color6':colorkind=='#d744ba','color7':colorkind=='#06b7c8','color8':colorkind=='#0065fe','color9':colorkind=='#733413','color10':colorkind=='#ffffff','color11':colorkind=='#000000'}" :value.sync="colorkind">
                      <v-option value="#de2020"><span style="background-color:#de2020" class="inblock color-block"></span> <span class="inblock">红色</span> </v-option>
                      <v-option value="#fe6c00"><span style="background-color:#fe6c00" class="inblock color-block"></span> <span class="inblock">橙色</span> </v-option>
                      <v-option value="#febf00"><span style="background-color:#febf00" class="inblock color-block"></span> <span class="inblock">黄色</span> </v-option>
                      <v-option value="#59a725"><span style="background-color:#59a725" class="inblock color-block"></span> <span class="inblock">绿色</span> </v-option>
                      <v-option value="#892bcf"><span style="background-color:#892bcf" class="inblock color-block"></span> <span class="inblock">紫色</span> </v-option>
                      <v-option value="#d744ba"><span style="background-color:#d744ba" class="inblock color-block"></span> <span class="inblock">玫红</span> </v-option>
                      <v-option value="#06b7c8"><span style="background-color:#06b7c8" class="inblock color-block"></span> <span class="inblock">青色</span> </v-option>
                      <v-option value="#0065fe"><span style="background-color:#0065fe" class="inblock color-block"></span> <span class="inblock">蓝色</span> </v-option>
                      <v-option value="#733413"><span style="background-color:#733413" class="inblock color-block"></span> <span class="inblock">咖色</span> </v-option>
                      <v-option value="#ffffff"><span style="background-color:#ffffff;border:1px solid #cccccc " class="inblock color-block"></span> <span class="inblock">白色</span> </v-option>
                      <v-option value="#000000"><span style="background-color:#000000" class="inblock color-block"></span> <span class="inblock">黑色</span> </v-option>
                  </v-select>
                  <v-select placeholder="请选择分类"  class="inblock" :value.sync="stylekind">
                      <v-option value="1"> 女装</v-option>
                      <v-option value="2"> 男装</v-option>
                      <v-option value="3"> 鞋靴</v-option>
                      <v-option value="4"> 箱包</v-option>
                      <v-option value="5"> 内衣配饰</v-option>
                      <v-option value="6"> 母婴</v-option>
                      <v-option value="7"> 珠宝</v-option>
                      <v-option value="8"> 美妆</v-option>
                      <v-option value="9"> 食品</v-option>
                      <v-option value="10"> 百货</v-option>
                      <v-option value="11"> 家纺</v-option>
                      <v-option value="12"> 家装</v-option>
                      <v-option value="13"> 家电</v-option>
                      <v-option value="14"> 汽车</v-option>
                      <v-option value="15"> 百货</v-option>
                      <v-option value="16"> 数码</v-option>
                      <v-option value="17"> 动漫游戏</v-option>
                      <v-option value="18"> 花鸟文娱</v-option>
                  </v-select> -->
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
        <button type="button" class="btn btn-success" @click='publish'>创建</button>
      </div>
    </modal>
    <modal :show.sync="showUpdateModal" title="修改模板" effect="fade" width="400">
    <div slot="modal-body" class="modal-body">
      <table class="table">
        <tbody >
          <tr>
            <th><label>模板名称</label></th>
            <th class="form-group"><input id="update_name" v-model="updateItem.name" class="form-control" type="text"  require="true"/>
            	<input id="update_id" v-model="updateItem.id" class="form-control" type="hidden"  require="true"/>
            	</th>
            <th>必填</th>
          </tr>
          <tr>
              <th><label>BU部门</label></th>
              <th class="form-group">
                  <v-select   placeholder='请选择' :value.sync = bu>
                      <v-option v-for = "item in bulist"  :value = item.id >{{item.buName}}</v-option>
                  </v-select>
              </th>
              <th>必填</th>
          </tr>
          <tr >
              <th><label>产品线</label></th>
              <th class="form-group">
                  <v-select   placeholder='请选择' :value.sync= bizId>
                      <v-option  v-for = "item in currentbuZlist" :value= item.id>{{item.bizName}}</v-option>
                  </v-select>
              </th>
              <th>必填</th>
          </tr>
            <th><label>模板描述</label></th>
            <th class="form-group"><input v-model="updateItem.info" class="form-control" type="text" /></th>
            <th></th>
          </tr>
          <tr>
            <th>图片宽</th>
            <th><input class="form-control" readonly type="text" v-model="updateItem.width"/></th>
          </tr>
          <tr>
          <th>图片高</th>
          <th><input class="form-control" readonly type="text" v-model="updateItem.height"/></th>
        </tr>
          <tr>
            <th>预览图</th>
            <th><input id="update_preview_url" class="form-control" type="text" v-model="updateItem.previewUrl" /></th>
            <th>必填</th>
          </tr>
        </tbody>
      </table>
    </div>
    <div slot="modal-footer" class="modal-footer">
      <button type="button" class="btn btn-success" @click='update'>修改</button>
    </div>
  </modal>
</template>
<style lang='sass' >
.inblock {
    display: inline-block;
}

.ml20{
  margin-left: 20px;

}
.name-input {
    width: 150px;
    display: inline-block;
}

.color-select {
    .content:before {
        content: "";
        background-color: yellow;
        display: inline-block;
        width: 14px;
        height: 14px;
    }
}

.color1 {
    .content:before {
        background-color: #de2020;
    }
}

.color2 {
    .content:before {
        background-color: #fe6c00;
    }
}

.color3 {
    .content:before {
        background-color: #febf00;
    }
}

.color4 {
    .content:before {
        background-color: #59a725;
    }
}

.color5 {
    .content:before {
        background-color: #892bcf;
    }
}

.color6 {
    .content:before {
        background-color: #d744ba;
    }
}

.color7 {
    .content:before {
        background-color: #06b7c8;
    }
}

.color8 {
    .content:before {
        background-color: #0065fe;
    }
}

.color9 {
    .content:before {
        background-color: #733413;
    }
}

.color10 {
    .content:before {
        background-color: #ffffff;
    }
}

.color11 {
    .content:before {
        background-color: #000000;
    }
}

.nocolor {
    .content:before {
        display: inline;
    }
}

.color-block {
    display: inline-block;
    width: 14px;
    height: 14px;
}

.ctrl-raw{
  line-height: 74px;

}
.bar .btn{
  padding: 10px 30px;

}

.table th {
    border-width: 0px;
    text-align: left;
}

.uppsd {
    position: relative;
    .dropzone .dz-default.dz-message {
        margin-left: 0px;
        margin-top: 0px;
        top: 0%;
        left: 0%;
        position: relative;
    }
}
</style>
<script>
    import { IO } from "../common/js/utils";
    import { mAlert } from "../common/js/utils";
    import { modal, alert} from 'vue-strap';
    import utils from '../common/js/utils.js';
    import datetimepicker from "../components/datetimepicker.vue";
    import dispatch from "../common/js/dispatch";
    import vSelect from 'vue-strap/src/Select.vue'
    import vOption from 'vue-strap/src/Option.vue'
    var moment = require('moment');

    function isEmpty(str){
      str = String(str);
      return str.trim().length == 0;
    }     
    export default{
        props:{

        },
        data(){
            return{
                name : "",
                info : "",
                width : "",
                height : "",
                rawdata : "",
                showUpdateSuccess:false,
                showPublishSuccess : false,
                showCreateModal : false,
                showUpdateModal:false,
                updateItem:[],
                showPublishfaile:false,
                showPublishfaileMsg:"",
                previewUrl : "",
                itemId:0,
                chooseBu:"",
                hsg:true,
                chooseBuList:["手淘","天猫"],
                chooseBuInfo:{},
                chooseBizName:"",
                chooseBizList:["首页","淘宝头条"],
                chooseBizInfo:{},
                choosePuId:"",
                choosePuList:[{"name":"手淘","id":"1222"}],

                chooseSourId:"",
                rawStatusId:"",
                chooseSourList:[
                  {name:"设计师上传",id:"1"},
                  {name:"运营小二上传",id:"2"},
                ],
                totoleNum:0,
                bu:"1",
                bizId:"1",
                first:false,
                bizName:"首焦",
                buZlist:{},
                stylekind:"",
                colorkind:"",
                currentbuZlist:[{"bizName":"首焦","buId":"1","id":"1"},{"bizName":"中通","buId":"1","id":"2"},{"bizName":"底通","buId":"1","id":"2"}],
                bulist:[{"buName":"手淘","id":"1"},{"buName":"淘宝","id":"2"},{"buName":"天猫","id":"3"},{"buName":"聚划算","id":"4"}]

            }
        },
        components:{
            modal,
            alert,
            datetimepicker,
            vSelect,
            vOption
        },
        ready() {
            var self = this;
            var dropz = new Dropzone("#my-awesome-dropzone", {
                url: "/luban/Rawdata.do",
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
                    self.width =res.data.width;
                    self.height =res.data.height;
                    self.previewUrl = res.data.previewUrl;
                    self.itemId  = res.data.id;
                    mAlert("上传成功");
                }else{
                    mAlert("上传失败","danger");
                }
            });
            this.getBuData();
            this.getBuChoose();


        },
        watch:{
            colorkind:function (){

            },
            chooseBu:function(){
              this.chooseBizInfo = this.chooseBuInfo[this.chooseBu];
              var chooseBizList = [];
              for(var key in this.chooseBizInfo){
                chooseBizList.push(key);
              }
                this.chooseBizList = chooseBizList||[];
                this.chooseBizName = this.chooseBizList[0]||"";
            },
            chooseBizName:function(){
                var choosePuList = this.chooseBizInfo[this.chooseBizName];
                var newPuList = [];
                for(var i = 0 ; i<choosePuList.length ; i++){
                  var obj = {"name":choosePuList[i].name,"id": String(choosePuList[i].id)}
                  newPuList.push(obj);
                }
                this.choosePuList = newPuList;
                this.choosePuId = this.choosePuList[0].id;
            },
            choosePuId:function(){
              dispatch.fire("load-list");
            },
            chooseSourId:function(){
              dispatch.fire("load-list");
            },
            rawStatusId:function(){
              dispatch.fire("load-list");


            },
            bu:function(){
              var self = this;
              this.currentbuZlist = this.buZlist[this.bu];
              if(this.currentbuZlist&&this.currentbuZlist.length){
                  self.bizId = self.currentbuZlist[0].id;
              }
              if(this.updateItem&&this.updateItem.bu){
                  this.updateItem.bu = this.bu;
              }
            },
            updateItem:function (){
                var self= this;

                self.first = true;
                if(!this.updateItem.bu){
                    this.updateItem.bu = this.bu;
                }else{
                    this.bu = this.updateItem.bu;
                }

                setTimeout(function(){
                    if(!self.updateItem.buConfigId){
                        self.updateItem.buConfigId =self.bizId;
                    }else{
                        self.bizId =self.updateItem.buConfigId;
                    }
                    self.first =false;
                },100)

            },
          bizId:function(){
              var self= this;
              if(this.updateItem&&this.updateItem.buConfigId){
                  if(!self.first){
                      self.updateItem.buConfigId = self.bizId;
                  }
              }
          }
        },

        methods:{
            getBuChoose:function(){
              var self = this;
              var req = {
                type:"bu"
              };
              IO({
                url : "/luban/raw.do?_input_charset=utf8",
                type : "get",
                data : req,
                dataType : "jsonp",
                success : function(res) {
                  if(res.success){
                    var data = res.data;
                    var buList = [];
                    for(var key in data){
                      buList.push(key);
                    }
                    if(buList.length){
                      self.chooseBuList = buList;
                      self.chooseBuInfo = data;
                    }
                  }else{
                    mAlert("获取bu接口出错","danger");
                  }
                },
                error: function() {
                  mAlert("获取bu接口出错","danger");
                }
              },true);



            },

            getBuData:function (){
                var self = this;
                IO({
                  url : "/luban/rawdata.do?_input_charset=utf8",
                  data : {
                    type:'bu'
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

          publish : function(){
            var com = this;
            if(isEmpty(com.name)){
              $('#act_name').focus();
              return;
            }
              if(isEmpty(com.bu)){
                  mAlert("请选择BU部门","danger");
                  return;
              }
              if(isEmpty(com.bizId)){
                  mAlert("请选择产品线!","danger");

                  return;
              }
              if(isEmpty(com.width)||isEmpty(com.height)) {
                  mAlert("必须上传psd模版才能创建","danger");
                  return;
            }
              var req = {
                  type:"update",
                  name:com.name,
                  info:com.info,
                  width:com.width,
                  height:com.height,
                  previewUrl:com.previewUrl,
                  bu:com.bu,
                  buConfigId:com.bizId,
                  id:com.itemId
              };

              IO({
                  url : "/luban/rawdata.do?_input_charset=utf8",
                  type : "get",
                  data : req,
                  contentType: 'multipart/form-data',
                  dataType:"jsonp",

                  success : function(res) {
                      if(res.success){
                          //com.showUpdateSuccess=true;
                          mAlert("创建模板成功!");
                          setTimeout(function(){
                              location.reload();
                          },1000);
                          com.showCreateModal = false;
                      }else{
                          mAlert(res.errorMsg,"danger");
                          return;
                      }
                  },
                  error: function() {
                      console.log("error");
                  }
              });
          },
          update:function(){
        	  var com = this;
        	  var item=com.updateItem;
              if(isEmpty(item.name)){
                $('#update_name').focus();
                return;
              }else if(isEmpty(item.previewUrl)){
              	$('#update_preview_url').focus();
                return;
              }
              if(isEmpty(item.bu)){
                  mAlert("请选择BU部门","danger");
                  return;
              }
              if(isEmpty(item.buConfigId)){
                  mAlert("请选择产品线!","danger");
                  return;
              }
              var req = {
                type:"update",
                name:item.name,
                info:item.info,
                width:item.width,
                height:item.height,
                bu:item.bu,
                buConfigId:item.buConfigId,
                previewUrl:item.previewUrl,
                id:item.id
              };
              IO({
                  url : "/luban/rawdata.do?_input_charset=utf8",
                  type : "get",
                  data : req,
                  contentType: 'multipart/form-data',
                  dataType:"jsonp",

                  success : function(res) {
                    if(res.success){
                        mAlert("修改模板成功!");
                        com.showUpdateModal=false;
                    }else{
                  	  console.log(res);
                        mAlert(res.errorMsg,"danger");
                  	  return;
                    }
                  },
                  error: function() {
                      mAlert("错误!","danger");
                  }
              });

          }
        }
    }
</script>