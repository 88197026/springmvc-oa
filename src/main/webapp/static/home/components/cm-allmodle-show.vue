<style lang="sass">

      .lists-warp {
            min-width: 720px;
            padding: 0px 0px 20px 20px;
            width: 100%;
            position:relative;
            .banner-list {
                height: 500px;
                margin: 0 auto;
                margin-bottom: 20px;
            }
            .wf-container {
                min-width: 720px;
                position: relative;
                width: 100%;
                overflow-x:hidden;
                overflow-y: scroll;
            }
            .wf-column {
                float: left;
            }
            .thumbnail {
                text-align: center;
                font-size: 12px;
                cursor: pointer;
                width: 320px;
                float: left;
                padding: 0px;
                margin-right: 12px;
                margin-bottom: 0px;
                .img {
                    display: block;
                    width: 320px;
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
              width: 60%;
              left: 0px;
              right: 0px;
              top:18%;
              margin: auto;
              border: 1px solid #ccc;
              border-radius: 5px;
              transition: all 0.5s ease-in;
              -moz-transition: all 0.5s ease-in;
              -webkit-transition: all 0.5s ease-in;
              -o-transition: all 0.5s ease-in;
              img {
                width: 100%;
              }
            }
        }

    

    

    


</style>
<template>

      <div class="lists-warp">
          <div id="wf-container" class="banner-list wf-container">
                  <div v-if="showCustomPsd" class="thumbnail " @click = "usePsd">
                      <img class="psdimg img" src="https://img.alicdn.com/tps/TB1BFJtKXXXXXboXVXXXXXXXXXX-160-120.png" alt=""/>
                      <div class="desc mt5">
                      </div>
                  </div>
                  <div  v-for = "item in  mList"   :class="{'thumbnail':true,'thumbnail-active':chooseTepId==item.id,'n-v':item.selected}" @click ="chooseTep(item)"   >
                      <img class="img" @mouseenter = "mouseenter(item,$event)" @mouseleave = "mouseleave(item,$event)" :src = "item.previewUrl"/>
                      <div class="desc mt5">
                          {{item.name}}
                      </div>
                  </div>
          </div>
          <div class="operation">
              <button class="btn btn-small btn-primary"  :class="{'n-v':!chooseTepId}"  @click="saveRaw">确定使用</button>
          </div>
          <div class="showbigimg"  v-show="isshowimg">
              <img v-bind:src="previewUrl">
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
        props: {
          buConfigId:{},
          designValue:{},
          storeValue:{},
          colorValue:{},
          styleValue:{},
          currentChooseItem:{}
        },
        data:function(){
            return {
                chooseTepId:"",
                mList:[],
                previewUrl:"",
                isshowimg:false,
                waterfall:null,
                showBigImgTimer:null,
                showCustomPsd:false,
                page:1,
                isloadingAjax:false,
                isOnce:true
            }
        },
        components: {
            vOption,
            vSelect
        },
        watch:{
        },
        ready() {
      	    var self = this;
            this.currentChooseItem = this.currentChooseItem||{}
            var pageloader = new Pagination({
                container: '#wf-container',
                loadMoreBottom: 100,
                containerScroll:true,
                loadMore: function () {
                    if (!self.isloadingAjax&&!self.currentChooseItem.endLoad) {
                      if(!self.currentChooseItem.page){
                        self.currentChooseItem.page = 1;
                      }
                      self.currentChooseItem.page++;
                        self.getModeList(self.currentChooseItem.page);
                    }
                }
            }).init();
            dispatch.on("window-resize",function(){
              waterfall('wf-container', 'thumbnail');
            })
        },
        methods:{
          usePsd:function() {
            dispatch.fire("cm-modle-show-uploadPsd", {currentChooseItem:this.currentChooseItem,buConfigId:this.buConfigId});
          },
          chooseTep:function(item) {
            if (item.selected) {
              mAlert("该模版已经选择");
              return;
            }
            this.chooseTepId = item.id;
          }
        ,
          mouseenter:function(item, event) {
            var self = this;
            clearTimeout(self.showBigImgTimer)
            self.showBigImgTimer = setTimeout(function() {
              self.previewUrl = item.previewUrl;
              self.isshowimg = true;
            }, 800)
          },
          mouseleave:function(item, event) {
            var self = this;
            clearTimeout(self.showBigImgTimer)
            self.isshowimg = false;
          },
          getModeList:function(page,bc) {
            var self = this;
            var page = page || self.page;
            self.isloadingAjax = true;
            IO({
              url: "/luban/raw.do?_input_charset=utf8",
              type: "get",
              data: {
                type: "templete",
                buConfigId: self.buConfigId||"",
                activityId: Env.params.activityId || 0,
                queryCreateNick:(self.designValue !="all")?self.designValue :"",
                pageNo: page,
                pageSize: 60
              },
              dataType: "jsonp",
              success: function(res) {
                if (res.success){
                  self.mList = self.currentChooseItem.list||[];
                  self.currentChooseItem.list = self.mList = self.mList.concat(res.data.list);
                  setTimeout(function() {
                    waterfall('wf-container', 'thumbnail');
                  }, 50);
                  self.isloadingAjax = false;
                  if(res.data.list < 60){
                    self.currentChooseItem.endLoad = true;
                  }
                  self.currentChooseItem.showCustomPsd = self.showCustomPsd = res.data.showCustomPsd;
                  if(typeof bc == "function"){
                      bc();
                  }
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
            dispatch.fire("xj-complete-choosemodle",{chooseTepId:this.chooseTepId});
          }
        }
    }
</script>