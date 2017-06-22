<style lang="sass" >

    .popup-body {
        display: flex;
        .left {
            width: 270px;
            min-height: 600px;
            .choosebu {
                padding: 10px;
                margin: 0;
                font-size: 12px;
                background: #f5f5f5;
            }
            .category {
                height: 562px;
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
            .lists-warp{
              .wf-container {
                width: 788px;
              }
              .thumbnail {
                width: 180px;
                .img {
                  display: block;
                  width: 180px;
                }
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
            <cm-style-seclect v-ref:styleselect :bu-config-id = chooseListId   :show-design-select="true"></cm-style-seclect>
          </div>

          <cm-allmodle-show  v-ref:modleboard :bu-config-id = chooseListId  :current-choose-item = currentChooseItem  :design-value=designValue ></cm-allmodle-show>
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
                showBigImgTimer:null,
                stylekind:"all",
                colorkind:"all",
                showCustomPsd:false,
                isloadingAjax:false,
                isOnce:true,
                designValue:"all",
                listChooseChange:false,
                currentChooseItem:{}
            }
        },
        components: {
          cmStyleSeclect: require('../components/cm-style-seclect.vue'),
          cmAllmodleShow: require('../components/cm-allmodle-show.vue'),
          vOption,
          vSelect


        },
        watch:{
              choosebu:function(){
                var self = this;
                 this.bizList =  this.buInfo[this.choosebu]; 
                 for(var k in self.bizList){
                     self.chooseListId = self.bizList[k][0].id;
                     self.currentChooseItem = self.bizList[k][0];
                      self.doChooseList(self.currentChooseItem);
                     return;
                 }
              }  
        },
        ready() {
      	    var self = this;
             dispatch.on("design-select",function(obj){

               if(!self.listChooseChange){
                 self.designValue = obj.designValue;
                 self.designChange = true;
                 self.initCurrentChooseItem();
                 setTimeout(function(){
                   self.$refs.modleboard.getModeList(1);
                 },100);
               }

             });
            self.$refs.styleselect.getDesignAjax();
            self.getBuInfoAjax();
            dispatch.on('updatateplist',function(){
              self.doChooseList(self.currentChooseItem);
            });
            dispatch.on('do-shwomodal',function(){
              if(self.isOnce){
                self.doChooseList(self.currentChooseItem);
                self.isOnce = false;
              }
            });
            dispatch.on('xj-complete-choosemodle',function(obj){
              self.doSaveModalAjax(obj);
            })
        },
        methods:{
          initCurrentChooseItem:function(){
            var self = this;
            self.currentChooseItem.page = 1;
            self.currentChooseItem.list = [];
            self.currentChooseItem.endLoad = false;
          },
          doSaveModalAjax:function(obj){
            IO({
              url: "/luban/LbReleasePositionScreen.do?_input_charset=utf8",
              type: "get",
              data: {
                type: "2",
                rawdataId: obj.chooseTepId,
                activityId: Env.params.activityId
              },
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
          },
          getBuInfoAjax:function(){
            var self = this;
            IO({
              url : "/luban/raw.do?_input_charset=utf8",
              type : "get",
              data : {
                type:"bu",
                activityId:Env.params.activityId||0
              },
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


          },
          doChooseList:function(item) {
            var self = this;

/*
            console.dir(self.currentChooseItem);
*/


            self.currentChooseItem = item;
            self.listChooseChange = true;
            self.chooseListId = item.id;
            self.designValue = "all";
            self.$refs.styleselect.designValue = "all";
            self.currentChooseItem.page = 1;
            self.currentChooseItem.list = [];
            self.currentChooseItem.endLoad = false;
            setTimeout(function(){
              self.$refs.modleboard.getModeList(self.currentChooseItem.page,function(){
                self.listChooseChange = false;
              });
              self.$refs.styleselect.getDesignAjax();
            },100);

          }
        }
    }
</script>