<template>
  <modal :show.sync="showEditModal" title="修改投放任务" effect="fade" width="400" >
    <div slot="modal-body" class="modal-body">
      <table class="table" >
        <tbody >
        <tr>
          <th><label>活动名称</label></th>
          <th class="form-group"><input id="edit_name" v-model="editItem.title" class="form-control" type="text" /></th>
          <th>必填</th>
        </tr>
        <tr>
          <th><label>活动信息描述</label></th>
          <th class="form-group"><input  v-model="editItem.info" class="form-control" type="text" /></th>
          <th></th>
        </tr>
        <tr>
          <th>投放开始时间</th>
          <th class="form-group">
            <datetimepicker
                id="act_time_begin" 
                v-model="editItem.beginTime">
            </datetimepicker>
          </th>
          <th>必填</th>
        </tr>
        <tr>
          <th>投放结束时间</th>
          <th class="form-group">
            <datetimepicker
                id="act_time_end"
                v-model="editItem.time">
            </datetimepicker>
          </th>
          <th>必填</th>
        </tr>
        <tr>
          <th>授权</th>
          <th class="form-group">
            <input  v-model="editItem.authorizeNick" class="form-control" type="text" /></th>
          </th>
          <th>多人授权，逗号分隔</th>
        </tr>
        </tbody>
      </table>
    </div>
    <div slot="modal-footer" class="modal-footer">
      <button type="button" class="btn btn-success" @click='doedit(editItem)'>保存</button>
    </div>
  </modal>

  <a v-show="loading" class="loading"  href="/luban/LbActivityScreen.do?type=5" @click="loginAgain">点击这里重新登陆</a>
  </a>
  <table class="table table-hover sin" v-show="!loading">
    <thead>
    <tr>
      <th>
        投放主题
      </th>
      <th>
        投放结束时间
      </th>
      <th>
        投放模板
      </th>
      <th>
        投放ID
      </th>
      <th>
        投放状态
      </th>
      <th>
        操作
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in items">
      <th>
        <a href="./detail.html?activityId={{item.id}}">{{ item.title }}</a>
      </th>
      <th>
        {{item.time}}
      </th>
      <th>
          <span v-for="pos in item.modes">
              <a href="{{{pos.releaseUrl}}}" :class={"noherf":pos.noherf} target="_blank">{{ pos.releaseRawdataName }}</a> <br/>
          </span>
      </th>
      <th>
            <span v-for="pos in item.modes">
            {{ pos.releasePositionId }} <br/>
            </span>
      </th>
      <th>
        <div v-for="pos in item.modes">
          <span v-if="pos.releasePositionStatus == 0" class="p_editing">编辑中</span>
          <span v-if="pos.releasePositionStatus == 2" class="p_editing">编辑中</span>
          <span v-if="pos.releasePositionStatus == 1" class="p_publishing">投放中</span>
        </div>

      </th>
      <th>
            <span v-for="pos in item.modes">
                <a href="javascript:void(0);" @click="showEdit(item)">设置</a><br/>
                </span>
      </th>
    </tr>
    </tbody>
  </table>
  <div class="pagination-warp"   v-show= "totalPages>1" >
    <boot-pagination   :page="page"  :totalpages="totalPages"></boot-pagination>
  </div>
</template>
<style lang='sass' scoped>
  .sin {
  }
  .p_editing{
    color: #96CB92;
  }
  .p_publishing{
    color: #E56766;
  }
  a{
    color: #75BDF6;
    margin-right: 20px;
  }
  th{
    font-weight:normal;
  }
  .loading {
    width:100%;
    height:200px;
    line-height:200px;
    text-align:center;
    color:#666;
    display: block;
    font-size:14px;
  }
  .pagination-warp{
    text-align: center;
  }
  .noherf{
    color:#333;
    cursor:default 
  }
  .noherf:visited{
    color:#333;
  }
  .noherf:link{
    color:#333;
  }
</style>
<script>
  import { IO } from "../common/js/utils";
  import dispatch from "../common/js/dispatch";
  import { modal, alert} from 'vue-strap';
  import datetimepicker from "../components/datetimepicker.vue";
  import bootPagination from '../components/boot-pagination.vue';
  import { mAlert } from "../common/js/utils";
  var moment = require('moment');
  export default{
    data(){
    return {
      items:[],
      editItem:{'beginTime':'','time':'','title':'','info':'','authorizeNick':''},
      showEditModal:false,
      releaseBegin : "",
      releaseEnd : "",
      loading:true,
      page:1,
      totalPages:10
    }
  },
  components:{
    modal,
        alert,
        datetimepicker,
        bootPagination
  },
  methods:{
    showEdit:function(item){
      var com = this;
      com.editItem.title = item.title;
      com.editItem.id = item.id;
      com.editItem.info=item.info;
      com.editItem.time = item.time;
      com.editItem.beginTime=item.beginTime;
      com.editItem.authorizeNick=item.authorizeNick;
      com.showEditModal=true;
    },
    doedit:function(item){
      var com=this;
      var req = {
        type:3,
        id:item.id,
        name:item.title,
        info:item.info,
        releaseBegin:item.beginTime + ":00",
        releaseEnd:item.time + ":00",
        authorizeNick:item.authorizeNick
      };
      IO({
        url : "/luban/LbActivityScreen.do?_input_charset=utf8",
        type : "get",
        data : req,
        dataType : "jsonp",
        success : function(res) {
          if(res.success){
            var e=com.getItem(item.id);
            if(e){
              e.title= com.editItem.title;
              e.time= com.editItem.time;
              e.authorizeNick=com.editItem.authorizeNick;
            }
            com.showEditModal=false;
          }else{
              mAlert("更新失败");
          }
        },
        error: function() {
          console.log("error");
        }
      });
    },

    loginAgain:function(){
      IO({
        url : "/luban/LbActivityScreen.do",
        type : "get",
        data : {
          type:"1"
        },
        dataType : "jsonp",
        success : function(res) {
          if(res.success){
            location.reload();
          }else{
            mAlert("重新登陆失败");
          }
        },
        error: function() {
          //mAlert("重新登陆失败");
        }
      });
    },
    getItem:function(id){
      for (var i = 0; i < this.items.length; i++) {
        var item=this.items[i];
        if(item.id==id){
          return item;
        }
      }
    },
    dodealItemDate:function(list){
      this.items = [];
      for(var i = 0 ;i < list.length;i++){
        var data_item = list[i];
        var show_item = {};
        show_item.title = data_item.activityName;
        show_item.id = data_item.activityId;
        show_item.info=data_item.info;
        show_item.time = moment(data_item.releaseEndTime).format('YYYY-MM-DD HH:mm:ss');
        show_item.beginTime=moment(data_item.releaseBeginTime).format('YYYY-MM-DD HH:mm:ss');
        show_item.hasData = (i % 2 == 0);
        show_item.modes = data_item.lbActivityListReleasePositionDTOList;
        for(var y = 0 ;y< show_item.modes.length;y++){
            var  item = show_item.modes[y];
            if(item.releaseUrl){
                item.releaseUrl=item.releaseUrl.replace(/&amp;/g, '\&');
            }else{
              item.releaseUrl = "javascript:void(0)";
              item.noherf = true;
            }
        }
        show_item.authorizeNick=data_item.authorizeNick;
        this.items.push(show_item);
      }
    },
    loadList(page){
      var self = this;
      self.page = page||self.page;
      IO({
        url: "/luban/LbActivityScreen.do",
        type:"get",
        dataType: "jsonp",
        data: {
          type:"1",
          _input_charset: 'utf8',
          pageSize:"50",
          pageNo:self.page
        },
        success: function(res){
          if(res.success){
            self.dodealItemDate(res.data.lbActivityListDTOList);
            self.totalPages = res.data.pageCount||1;
          }else{
            mAlert(res.errorMsg,"danger")
          }
          self.loading = false;
        },
        error: function(res) {
          console.log(res);
          self.loading = false;
        }
      });
    },
    dodel:function(item){
      var com=this;
      var req = {
        type:4,
        id:item.id,
        status:"0"
      };
      IO({
        url : "/luban/LbActivityScreen.do?_input_charset=utf8",
        type : "get",
        data : req,
        dataType : "jsonp",
        success : function(res) {
          if(res.success){
            com.showEditModal=false;
          }else{
            window.alert(res.errorMsg);
          }
        },
        error: function() {
          console.log("error");
        }
      });
    }
  },
  ready() {
    var com = this;
    dispatch.on('addActivitySuccess', function(e) {
      var res=e.res;
      location="/web/static/luban/src/detail.html?activityId="+res.data;
    });
    dispatch.on("changepag-page",function(obj){
      var type = obj.eletype;
      if(type =="default"){
        com.page = obj.page;
        com.loadList();
      }
    })
    com.$on('PAGE_DATA_GET', function (data) {
      com.dodealItemDate(data.lbActivityListDTOList);
      com.totalPages = data.pageCount||1;
      com.loading = false;
    });
  }
  }
</script>