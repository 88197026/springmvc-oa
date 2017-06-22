<style type= "text/css">
    .w200{
      width: 200px;
    }
    .w100{
      min-width: 100px;
    }
    .w400{
      width: 400px;
    }
    .inline{
      display: inline-block;
    }
    .m10{
      margin: 0px 10px;
    }
    .mbt20{
      margin: 20px 0px;
    }
     .mr5{
      margin-right: 5px;

    }
    .mr15{
      margin-right: 15px;
    }
    .fl{
      float: left;
    }
     .ml5{
      margin-left: 5px;
    }
    .co_r{
      color: red;
    }
    .row > div{
      text-align:left;
    }
    .m0{
      margin:0px;
    }
    .itemslist{
      width: 90%;
    }
    .itemslistbox{
      overflow: hidden;

    }
</style>
<template>
    <div id="qrcode" class="qrcode"></div>
    <div> 

         <div class="row ">
              <div class="col-lg-3 w400">
              <span>日期： </span> <datetimepicker
                  id="act_time_end" :reportdate = 'reportDate' :startdate = 'startdate' :enddate='enddate' :timetype = 'timetype' :monitor ="monitor" class="w200 inline mr5"
                  v-model="timeEnd">
                </datetimepicker>
              <div class="inline ml5">
                <input type="radio" id="one" class="inline m0" value="day" v-model="timetype">
                <span for="day" class="mr5">天</span>
                <input type="radio" id="two" class="inline m0" value="hour" v-model="timetype">
                <span for="two">时</span>
              </div>
              
              </div>
              <div class="col-lg-3">
              <span>素材排序</span>
              <v-select placeholder='请选择' :value.sync = sort >
                    <v-option v-for = "col in orderMenu" :value = 'col.value' >{{col.label}}</v-option>
              </v-select>
              </div>
             <!--<div class="col-lg-1">
               <button type="button" class="btn btn-success" @click='restDate'>查看全部素材</button>
             </div>-->
          </div>

        <div class="row itemslistbox mbt20 col-lg-11">
            <div class="inline mr15 fl">宝贝类目统计:</div>
            <div class="inline itemslist">
               <div v-for="item in cateList" class="inline w100">
                  <span>{{item.cateName}}</span> <span class="">({{item.sumCount}}) </span>
                </div>
            </div>  
        </div>
        <div class="row ">
                <div v-for="item in summaryList" class="col-lg-2 w200">
                  <span>{{item.label}}:</span> <span class="ml5 co_r">{{item.value}}</span>
                </div>
        </div>


    </div>  
    <div class="wrapper">
       <!--  <div class="container-fluid">
            <div class="row banner-tool-bar">
                
            </div>
        </div> -->
        <div class="banner-result">
              <div class="">
                    共通过{{sumCount}}个
                </div>
            <div class="row">
                <module-result-item  :showstate='showstate' :close = 'close' :positionw = 'positionw' :positionh="positionh" v-for="item in itemlist" :item="item" :selected="selected" ></module-result-item>
            </div>
             <div class="pagination-warp"   v-show= "totalPages>1" >
                 <boot-pagination   :page="page"  :totalpages="totalPages"></boot-pagination>
            </div>
        </div>
    </div>
</template>
<style lang='sass' scoped>
    .qrcode{
        width: 150px;
        height: 150px;
        position: fixed;
        right: 60px;
        top:60px;
        z-index: 1000;
    }
    .banner-control-box {
        display: flex;
        justify-content: center;
    }
    .banner-tool-bar {
        display: flex;
        align-items: center;
    }
    .module-result-operation {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
    .banner-result {
        width:100%;
        margin-top:50px;
        text-align: center;
    }
    p {
    	margin: 0 0 0px;
    }
</style>
<script>
    import moduleResultItem from '../components/module-result-item.vue';
    import { modal, radioBtn, radioGroup } from 'vue-strap';
    import {IO} from '../common/js/utils';

    import Env from '@ali/lib-env';
    import bootPagination from '../components/boot-pagination.vue';
    import datetimepicker from "../components/datetimepicker.vue";
    import { mAlert } from "../common/js/utils";
    import dispatch from "../common/js/dispatch"; 
    import vSelect from 'vue-strap/src/Select.vue';
    import vOption from 'vue-strap/src/Option.vue';
    var moment = require('moment');
    export default{
        data:function(){
            return{
                selected: [],
                itemlist: [],
                sumCount:0,
                positionw:0,
                positionh:0,
                timetype:"day",
                api: '/tpp.do',
                qrurl:"",
                first:false,
                page:1,
                totalPages:10,
                close:true,
                timeEnd:"",
                sort:"",
                startdate:"",
                enddate:"",
                showstate:true,
                orderMenu:[{"label":"还是",value:"1"}],
                summaryList:[],
                cateList:[],
                date:"",
                hour:"",
                monitor:"pptDateChange"

            }
        },
        components: {
            moduleResultItem,
            radioGroup,
            radioBtn,
            modal,
            bootPagination,
            vOption,
            vSelect,
            datetimepicker,
            reportDate:""
        },
        ready() {
            var com = this;
            this.activityId = Env.params.activityId;
            dispatch.on("changepag-page",function(obj){
                 var type = obj.eletype;
                 if(type =="default"){
                   com.page = obj.page;
                   com.loadBanner("",com.filterStatus);
                  }
              })
            dispatch.on("updata-changepag",function(obj){
                   com.loadBanner();
              })
                dispatch.on("load-ran",function(obj){
                  var jdate = obj.reportDate.split(" ");
                  com.date = jdate[0];
                  com.hour = jdate[1]||"";
                  com.loadBanner();
                });
        },
        watch:{
          sort:function(){
            this.loadBanner();
          },
          timeEnd:function(){
            var jdate = this.timeEnd.split(" ");
            this.date = jdate[0];
            this.hour = jdate[1]||"";
            this.loadBanner();
          }
        },
        methods: {
            restDate:function(){
              var self = this;
              self.date = "";
              self.hour = "";
              self.sort = "";
              self.loadBanner();
            },
            loadBanner(page){
             var self = this;
                var activityId = Env.params.activityId;
                self.page = page||self.page;
                IO({
                      url: self.api,
                      type:"get",
                      dataType: "jsonp",
                      data: {
                          activityId: activityId,
                          _input_charset: 'utf8',
                          pageSize:"50",
                          pageNo:self.page,
                          date:self.date,
                          hour:self.hour,
                          sort:self.sort
                      },
                      success: function(res){
                        if(res.success){
                          self.itemlist=res.data.list;
                          for(var i=0;i<self.itemlist.length;i++){
                              self.itemlist[i].notShowSelected = true;
                          }
                          self.summaryList = res.data.summaryList;
                          self.cateList = res.data.cateList;                          
                          self.totalPages = res.data.pageCount||1;
                              self.sumCount=res.data.totalCount;
                          }else{
                              mAlert(res.errorMsg,"danger")
                          }
                      },
                      error: function(res) {
                          console.log(res);
                          self.loading = false;
                      }
                  });
            }



        },
        events: {
              PAGE_DATA_GET(res){
                var self = this;
                console.dir(res);
                 var qrcode = new QRCode(document.getElementById("qrcode"), {
                                    width : 150,//设置宽高
                                    height : 150,
                                    correctLevel : QRCode.CorrectLevel.H
                                });
                                 self.sumCount=res.totalCount;
                                var url = res.qrurl||"www.taobao.com";
                                url = url.replace("amp;","");
                                qrcode.makeCode(url);
                                self.positionw = res.raw.width;
                                self.positionh = res.raw.height;
                                self.itemlist=res.list;
                                self.orderMenu = res.orderMenu;
                                self.summaryList = res.summaryList;
                                self.cateList = res.cateList;                          
                                self.startdate = res.activity.releaseBegin.time;
                                self.enddate = res.activity.releaseEnd.time;
                                var startdate =  moment(res.activity.releaseBegin.time).format('YYYY-MM-DD');
                                var enddate =  moment(res.activity.releaseEnd.time).format('YYYY-MM-DD');
                                $('.form_datetime').datetimepicker('setStartDate', startdate);
                                $('.form_datetime').datetimepicker('setEndDate', enddate);
                                for(var i=0;i<self.itemlist.length;i++){
                                    self.itemlist[i].notShowSelected=true;
                                }
                                self.totalPages = res.pageCount||1;
            }

        }
    }
</script>