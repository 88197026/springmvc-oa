<style lang="sass" scoped>

    .popup-body {
        display: flex;
        .left {
            width: 270px;
            height: 600px;
            .choosebu {
                padding: 10px;
                margin: 0;
                font-size: 12px;
                background: #f5f5f5;
            }
            .category {
                height: 490px;
                overflow: auto;
                padding: 0px 10px;
                margin-bottom: 0;
                ol {
                    margin-bottom: 15px;
                    font-size: 10px;
                    .nav-li {
                        display: flex;
                        justify-content: space-between;
                    }
                    .active a {
                        background: #49B7FB;
                    }
                }
                h5 {
                    margin: 15px 0 10px 0;
                    font-size: 14px;
                    color: #49B7FB;
                }
            }
            .wrapper {
                height: 600px;
                width: 269px;
                border-right: 1px solid #e5e5e5;
                overflow: hidden;
            }
            .customsize {
                height: 55px;
                line-height: 55px;
                color: #e0e0e0;
                text-align: center;
            }
            .activeli {
              text-decoration: none;
              background-color: #eee;
            }
        }



        .right {
            width: 828px;
            padding: 20px;
            position: relative;
            .banner-list {
                height: 500px;
                margin: 0 auto;
                margin-bottom: 20px;
                overflow: auto;
            }
            .wf-container {
                width: 788px;
                position: relative;
            }
            .wf-container:before,
            .wf-container:after {
                content: '';
                display: table;
            }
            .wf-container:after {
                clear: both;
            }
            .wf-column {
                float: left;
            }
            .thumbnail {
                text-align: center;
                font-size: 12px;
                cursor: pointer;
                width: 180px;
                float: left;
                padding: 0px;
                margin-right: 12px;
                margin-bottom: 0px;
                .img {
                    display: block;
                    width: 180px;
                }
                .desc {
                    padding: 5px;
                    border-top-width: 0;
                }
            }
            .operation {
                text-align: center;
                .btn {
                    border: none;
                    background: #49B7FB;
                }
            }
        }
    }
    

    
    .psdimg {
        width: 100%;
        height: 100%;
    }

    .thumbnail-active {
        border: 1px solid #49b7fb;
    }
    
    .n-v {
        background-color: #eee !important;
        color: graytext;
        img {
            -webkit-filter: grayscale(1);
            /* Webkit */
            filter: gray;
            /* IE6-9 */
            filter: grayscale(1);
            /* W3C */
        }
    }
    
    .showbigimg {
        position: absolute;
        width: 400px;
        border: 1px solid #ccc;
        border-radius: 5px;
        transition: all 0.5s ease-in;
        -moz-transition: all 0.5s ease-in;
        /* Firefox 4 */
        -webkit-transition: all 0.5s ease-in;
        /* Safari and Chrome */
        -o-transition: all 0.5s ease-in;
        /* Opera */
        img {
            width: 100%;
        }
    }
    .stype-warp{

      height: 60px;
      line-height:60px;
    }
</style>



<template>
    <div class="popup-body">
        <div class="left">
            <div class="wrapper">
                <div class="choosebu bb1">
                     <v-select  :value.sync = choosebu >
                        <v-option v-for="item in buList" track-by="$index" :value = item >{{item}} </v-option>
                    </v-select>
                </div>
                <ul class="category">
                    <li class = "bbd1"  v-for="items in bizList">
                        <h5>{{$key}}</h5>
                        <ol class="nav nav-pills nav-stacked">
                            <li  :class="{'activeli':chooseListId==item.id}" @click = "doChooseList(item)" v-for = "item in items" class=""><a class="nav-li"><span href="javascript:void(0);">{{item.name}}</span>  <span></span></a> </li>
                        </ol>
                    </li>
                </ul>

                <div class="customsize bt1">
                    申请增加投放位，请联系：乐乘
                </div>

            </div>
        </div>
        <div class="right">
          <div class="stype-warp">
            <cm-style-seclect v-ref:styleselect :bu-config-id = chooseListId  :show-design-select="true"></cm-style-seclect>
          </div>
<!--
          <cm-allmodle-show></cm-allmodle-show>
-->

            <div id="wf-container" class="banner-list wf-container">
                    <div v-if="showCustomPsd" class="thumbnail " @click = "usePsd">
                        <img class="psdimg img" src="https://img.alicdn.com/tps/TB1BFJtKXXXXXboXVXXXXXXXXXX-160-120.png" alt=""/>
                        <div class="desc mt5">
                        </div>
                    </div>
                    <div  v-for = "item in  mList"   :class="{'thumbnail':true,'thumbnail-active':chooseTepId==item.id,'n-v':item.selected}" @click ="chooseTep(item)"   >
                        <img class="img" @mouseenter = "mouseenter(item,$event)" @mouseleave = "mouseleave(item,$event)"  v-bind:src = "item.previewUrl+'_200x200.jpg'"/>
                        <div class="desc mt5">
                            {{item.name}}
                        </div>
                    </div>
            </div>
            <div class="operation">
                <button class="btn btn-small btn-primary"  :class="{'n-v':!chooseTepId}"  @click="saveRaw">确定使用</button>
            </div>

            <div class="showbigimg" :style="showimgcss" v-show="isshowimg">
                <img v-bind:src="previewUrl">
            </div>
        </div>
    </div>
</template>
<script>
    var Pagination = require('../common/js/lib-pagination.js');
    import dispatch from "../common/js/dispatch";
    import { IO } from "../common/js/utils";
    import { modal} from 'vue-strap';
    import Env from '@ali/lib-env';
    import { mAlert } from "../common/js/utils";
    import vSelect from 'vue-strap/src/Select.vue';
    import vOption from 'vue-strap/src/Option.vue';
    export default{
        data:function(){
            return {
                items:[],
                showDelSuccess:false,
                rawApi:'/luban/raw.do',
                buInfo:{},
                choosebu:"手淘",
                buList:["手淘"],
                bizList:{"手淘":{}},
                chooseListId:"",
                chooseTepId:"",
                mList:[],
                previewUrl:"",
                isshowimg:false,
                waterfall:null,
                bizName:"0",
                showBigImgTimer:null,
                stylekind:"all",
                colorkind:"all",
                showCustomPsd:false,
                page:1,
                currentChooseItem:{},
                showimgcss:{left:"0px",top:"0px",opacity:"0"},
                isloadingAjax:false,
                isOnce:true,
                designValue:"all",
                isdesignChange:false
            }
        },
        components: {
          cmStyleSeclect: require('../components/cm-style-seclect.vue'),
/*
          cmAllmodleShow: require('../components/cm-allmodle-show.vue'),
*/
          vOption,
          vSelect


        },
        watch:{
              choosebu:function(){
                var self = this;
                 this.bizList =  this.buInfo[this.choosebu]; 
                 for(var k in self.bizList){
                     self.chooseListId = self.bizList[k][0].id;
                     self.bizName = self.bizList[k][0].biz;
                     self.currentChooseItem = self.bizList[k][0];
                      self.doChooseList(self.currentChooseItem);
                     return;
                 }
              }  
        },
        ready() {
      	    var self = this;
            var activityId = Env.params.activityId||0;
            var req = {
                type:"bu",
                activityId:activityId
            };
             dispatch.on("design-select",function(obj){
                 self.designValue = obj.designValue;

/*                 self.currentChooseItem.page = 1;
                 self.currentChooseItem.list = [];*/
                 for(var key in  self.buInfo){
                  var supInfo = self.buInfo[key];
                  for(var y in supInfo){
                    var subInfo = supInfo[y];
                    for(var xi in subInfo){
                      var info = subInfo[xi];
                      info.page = 1;
                      info.list =[];
                      info.loadinged =false;
                    }
                  }
              }
                self.getModeList(1);
             })
            self.$refs.styleselect.getDesignAjax();
            var pageloader = new Pagination({
                container: '#wf-container',
                loadMoreBottom: 100,
                containerScroll:true,
                loadMore: function () {
                    if (!self.isloadingAjax&&!self.currentChooseItem.endLoad) {
                        self.currentChooseItem.page++;
                        self.getModeList(self.currentChooseItem.page);
                    }
                }
            }).init();
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
                            self.buList = buList;
                            self.buInfo = data;
                            self.bizList = self.buInfo[self.choosebu];
                            for(var k in self.bizList){
                                self.chooseListId = self.bizList[k][0].id;
                                self.bizName = self.bizList[k][0].biz;
                                self.currentChooseItem = self.bizList[k][0];
                              return;
                            }
                        }
                    }else{
                        mAlert("获取bu接口出错","danger");
                    }
                },
                error: function() {
                    mAlert("获取bu接口出错","danger");
                }
            },true);

            dispatch.on('updatateplist',function(){
              self.currentChooseItem.page = 1;
              self.currentChooseItem.list = [];
              self.currentChooseItem.loadinged = false;
              self.doChooseList(self.currentChooseItem);
            });


            dispatch.on('do-shwomodal',function(){
              if(self.isOnce){
                self.doChooseList(self.currentChooseItem);
                self.isOnce = false;
            }
          })
        },
        methods:{
          usePsd:function() {

            this.$dispatch("uploadPsd", this.choosebu, this.bizName, this.chooseListId)

          },
          chooseTep:function(item) {
            if (item.selected) {
              mAlert("该模版已经选择");
              return;
            }
            this.chooseTepId = item.id;
          },
          mouseenter:function(item, event) {
            var self = this;
            clearTimeout(self.showBigImgTimer)
            self.showBigImgTimer = setTimeout(function() {
              var target = event.target.parentNode;
              self.previewUrl = item.previewUrl;
              self.isshowimg = true;
              self.showimgcss.opacity = 1;
              var offsetLeft = parseInt(target.offsetLeft);
              if (offsetLeft > 300) {
                var num = (788 - offsetLeft + 20) + "px";
                self.showimgcss["right"] = num;
                self.showimgcss.left = "inherit";
                self.showimgcss.top = "120px";

              } else {
                self.showimgcss.left = (offsetLeft + 30 + 178) + "px";
                self.showimgcss.right = "inherit";
                self.showimgcss.top = "120px";
              }
            }, 800)
          },
          mouseleave:function(item, event) {
            var self = this;
            clearTimeout(self.showBigImgTimer)
            self.isshowimg = false;
            self.showimgcss.opacity = 0;
            self.showimgcss.top = "0px";
          },
          doChooseList:function(item) {
            var self = this;
            this.currentChooseItem = item;
            this.chooseListId = item.id;
            this.bizName = item.biz;
            setTimeout(function(){
              self.$refs.styleselect.getDesignAjax();
            },10)
            self.designValue = "all";
            self.$refs.styleselect.designValue = "all";
            if((!this.currentChooseItem.page||this.currentChooseItem.page ==1) && !this.currentChooseItem.loadinged){
                this.currentChooseItem.page = 1;
                this.currentChooseItem.list = [];
                this.getModeList(this.currentChooseItem.page);
            }else{
              this.isloadingAjax = true;
              this.showCustomPsd = this.currentChooseItem.showCustomPsd;
              this.mList = this.currentChooseItem.list;
                setTimeout(function() {
                  waterfall('wf-container', 'thumbnail');
                  self.isloadingAjax = false;
                }, 50);
            }
          },
          getModeList:function(page) {
            var self = this;
            var page = page || self.page;
            self.isloadingAjax = true;
            self.currentChooseItem.loadinged = true;
            var activityId = Env.params.activityId || 0;
            var req = {
              type: "templete",
              buConfigId: self.chooseListId,
              activityId: activityId,
              queryCreateNick:(self.designValue !="all")?self.designValue :"",
              pageNo: page,
              pageSize: 60
            };
            IO({
              url: "/luban/raw.do?_input_charset=utf8",
              type: "get",
              data: req,
              dataType: "jsonp",
              success: function(res) {
                if (res.success){
                  self.mList = self.currentChooseItem.list;
                  self.currentChooseItem.list = self.mList = self.mList.concat(res.data.list);
                  setTimeout(function() {
                    waterfall('wf-container', 'thumbnail');
                  }, 50);
                  self.isloadingAjax = false;
                  if(res.data.list < 60){
                    self.currentChooseItem.endLoad = true;
                  }
                  self.currentChooseItem.showCustomPsd = self.showCustomPsd = res.data.showCustomPsd;

                } else {
                  self.isloadingAjax = false;
                  mAlert("获取模版接口出错", "danger");
                }
              },
              error: function() {
                self.isloadingAjax = false;
                mAlert("获取模版接口出错", "danger");
              }
            });
          },
          saveRaw:function(e) {
            if (!this.chooseTepId) {
              mAlert("请先选择模版", "danger");
              return;
            }
            var activityId = Env.params.activityId;
            var target = e.currentTarget;
            var com = this;
            var req = {
              type: "2",
              rawdataId: com.chooseTepId,
              activityId: activityId
            };
            IO({
              url: "/luban/LbReleasePositionScreen.do?_input_charset=utf8",
              type: "get",
              data: req,
              dataType: "jsonp",
              success: function(res) {
                if (res.success) {
                  location.reload();
                } else {
                  mAlert("使用模版接口出错", "danger");
                }
              },
              error: function() {
                mAlert("使用模版接口出错", "danger");
              }
            });
          }
        }
    }
</script>