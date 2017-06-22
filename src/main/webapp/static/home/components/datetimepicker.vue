<!-- 这是一个基础的layout的组件 -->
<template>
    <input size="16" placeholder = {{placeholder}} type="text"  :value="value" readonly class=" form-control " :class = "{ 'form_datetime': selectejq=='form_datetime'}" v-bind="{'id': (selectejq!='form_datetime')?selectejq:''}" >
</template>
<style lang='sass' scoped>
    @import '../common/css/bootstrap-datetimepicker.min.css';
</style>
<script>
    var moment = require('moment');
    import Env from '@ali/lib-env';
    import dispatch from "../common/js/dispatch";
    export default{
        props:{
            placeholder:{
        
            },
            value:{
                type:String,
                value:''
            },
            timetype:{
                type:String,
                value:''

            },
            monitor:{
                type:String
            },
            startdate:{},
            enddate:{},
            selectejq:{
                type:String,
                default:'form_datetime'

            }
        },
        data:function(){
            return{
                datetimeIns: null,
                firstInit:true,
                reportDate:""
            }
        },
        methods:{
            initdata:function(){
                var selecteJq = this.selectejq;
                if(selecteJq == "form_datetime"){
                    selecteJq = ".form_datetime";
                }else{
                    selecteJq = "#" + selecteJq;
                }
                $(selecteJq).datetimepicker('remove');
                var format = "yyyy-mm-dd hh:ii";
                var minView = "0";
                var obj = {};
                if(this.startdate){
                  obj.startDate = moment(this.startdate).format('YYYY-MM-DD HH:MM');
                }
                if(this.enddate){
                  obj.endDate = moment(this.enddate).format('YYYY-MM-DD HH:MM');
                }
                if(this.timetype =="hour"){
                   format = "yyyy-mm-dd hh";
                   minView = "1";
                  if(this.startdate){
                    obj.startDate = moment(this.startdate).format('YYYY-MM-DD HH');
                  }
                  if(this.enddate){
                    obj.endDate = moment(this.enddate).format('YYYY-MM-DD HH');
                  }

                 }else if(this.timetype == "day"){
                   format = "yyyy-mm-dd";
                   minView = "2";
                   if(this.startdate){
                    obj.startDate = moment(this.startdate).format('YYYY-MM-DD');
                  }
                  if(this.enddate){
                    obj.endDate = moment(this.enddate).format('YYYY-MM-DD');

                  }
                 }
                 obj.format = format;
                 obj.minView = minView;
                 obj.sideBySide = true;
                 obj.autoclose = true;
                 obj.todayHighlight= true;
                 /*if(!this.firstInit){
                    $(".form_datetime").val("");
                 }
                 if(this.reportdate&&this.firstInit){
                    obj.initialDate = this.reportdate;
                    this.firstInit = false;
                 }*/ 

                 $(selecteJq).val("");
                 $(selecteJq).datetimepicker(obj);
            }
        },
        watch: {
            timetype: function() {
                this.initdata();
               },
               reportdate:function(){
               }
        },
       ready:function(){
            var self = this;
            self.initdata();
            self.reportDate = Env.params["report_date"];
            if(self.reportDate){
                setTimeout(function(){
                  var selecteJq = self.selectejq;
                  if(selecteJq == "form_datetime"){
                      selecteJq = ".form_datetime";
                  }else{
                      selecteJq = "#" + selecteJq;
                  }
                  $(selecteJq).val(self.reportDate);
                  $(selecteJq).datetimepicker('update');
                  dispatch.fire("load-ran",{reportDate:self.reportDate});
                },200)
            }
       }
    }
</script>