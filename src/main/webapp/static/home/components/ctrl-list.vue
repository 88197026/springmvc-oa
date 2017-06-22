<!-- example页面的control部分 -->
<template>
    <div class="bar">
        <button class="btn btn-success mainbtn" @click="showCreateModal = true">
            创建投放任务
        </button>
    </div>
    <alert
      :show.sync="showPublishSuccess"
      :duration="2000"
      type="success"
      width="400px"
      placement="top"
      dismissable>
      <span class="icon-ok-circled alert-icon-float-left"></span>
      <strong>成功创建活动!</strong>
    </alert>
    <modal :show.sync="showCreateModal" title="创建投放任务" effect="fade" width="400">
      <div slot="modal-body" class="modal-body">
        <table class="table">
          <tbody >
            <tr>
              <th><label>活动名称</label></th>
              <th class="form-group"><input id="act_name" v-model="name" class="form-control" type="text" /></th>
              <th>必填</th>
            </tr>
        
            <tr>
              <th>投放结束时间</th>
              <th class="form-group">
                <datetimepicker
                  id="act_time_end"
                  v-model="releaseEnd" :startdate = startdate >
                </datetimepicker>
               </th>
              <th>必填</th>
            </tr>
          </tbody>
        </table>
      </div>
      <div slot="modal-footer" class="modal-footer">
        <button type="button" class="btn btn-success" @click='publish'>创建</button>
      </div>
    </modal>
</template>
<style lang='sass' scoped>
    .mainbtn{
        margin-top: 18px;
        padding-left: 30px;
        padding-right: 30px;
        padding-top: 10px;
        padding-bottom: 10px; 
    }
    .table th{
      border-width: 0px;
      text-align: left;
    }
</style>
<script>
    import { IO } from "../common/js/utils";
    import { modal, alert} from 'vue-strap';
    import { mAlert } from "../common/js/utils";
    import datetimepicker from "../components/datetimepicker.vue";
    import dispatch from "../common/js/dispatch";
    var moment = require('moment');
    function isEmpty(str){
      return str.trim().length == 0;
    }     
    export default{
        props:{},
        data(){
            return{
                name : "",
                info : "",
                releaseBegin : "",
                releaseEnd : "",
                textName : "",
                text1 : "",
                text2 : "",
                text3 : "",
                showPublishSuccess : false,
                timetype:"day",
                format:"yyyy-MM-dd",
                startdate:new Date(),
                showCreateModal : false
            }
        },
        components:{
            modal,
            alert,
            datetimepicker
        },
        ready() {
            var com = this;
        },
        methods:{
          publish : function(){
            var com = this;
            if(isEmpty(com.name)){
              document.getElementById("act_name").focus();
              return;
            } else if(isEmpty(com.releaseEnd)){
              //document.getElementById("act_time_end").focus();

              mAlert("投放结束时间不能为空","danger");

              return;
            } 
            var req = {
              type:2,
              name:com.name,
              info:com.info,
              releaseEnd:com.releaseEnd + ":00",
              textName:"默认文案",
              cpTextName:""
            };
            
            IO({
                url : "/luban/LbActivityScreen.do?_input_charset=utf8",
                type : "get",
                data : req,
                dataType : "jsonp",
                success : function(res) {
                  if(res.success){
                    com.showPublishSuccess = true;
                    dispatch.fire('addActivitySuccess', {
                        "req" : req,
                        "res":res
                    });
                  }
                },
                error: function() {
                   console.log("error");
                   location.reload();
                }
            });
            com.showCreateModal = false;
          }
        }
    }
</script>