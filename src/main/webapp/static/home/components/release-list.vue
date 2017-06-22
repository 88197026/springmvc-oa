<template>
<alert
:show.sync="showDelSuccess"
:duration="2000"
type="success"
width="400px"
placement="top"
dismissable>
<span class="icon-ok-circled alert-icon-float-left"></span>
<strong>删除成功!</strong>
</alert>
<alert
:show.sync="showCopySuccess"
:duration="1000"
type="success"
width="400px"
placement="top"
dismissable>
<span class="icon-ok-circled alert-icon-float-left"></span>
<strong>复制成功!</strong>
</alert>

  <table class="table table-hover sin">
        <thead>
        <tr>
            <th>
                模板名称
            </th>
            <th>
                有效素材量
            </th>
               <th>
                状态
            </th>
            <th>
                操作
            </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in items">
		        <th>
		       <p> {{item.rawdataName }}</p>
		       <p>({{item.size }})</p>
		    </th>
		    <th class="large_num">
		    {{ item.resultNum}}
		    </th>
		    <th v-if="item.status==2&&item.tppId>0">
	       	编辑中
	       	</th>
		       <th v-if="item.status==2&&item.tppId==0">
		       待分配投放资源
		    </th>
		       	<th v-if="item.status==1">
		       	投放中
		        </th>
            <th>
                <a v-if="item.tppUrl&&item.status==1" href="javascript:void(0);" id="copy_{{item.id}}" data-clipboard-text="{{item.tppUrl}}" title="复制投放链接">复制投放链接</a>
                <a v-if="item.tppUrl&&item.status==1"  href="{{item.tppUrl}}" target="_blank" title="打开投放链接">打开投放链接</a>
                <a v-if="item.status==2&&item.tppUrl&&item.tppId>0" href="javascript:void(0);" class="J_hide" data-id="{{item.id}}" data-index="$index" @click="releaseBegin(item)">开启个性化投放</a>
                <a v-if="item.status==1" href="javascript:void(0);" class="J_hide" data-id="{{item.id}}" data-index="$index" @click="releaseEnd(item.id)">暂停个性化投放</a>
               <p v-if="!item.tppUrl&&item.tppId>0">个性化投放需有效素材量大于0,且开启个性化投放</p>
               <p v-if="!item.tppId||item.tppId==0">投放资源尚未分配，请联系<a href="https://work.alibaba-inc.com/nwpipe/u/74827" target="_blank">八汰</a>or<a href="https://work.alibaba-inc.com/nwpipe/u/103693" target="_blank">沉雨</a></p>
            </th>
        </tr>
        </tbody>
    </table>
</template>
<style lang='sass' scoped>
.large_num{
	font-size:44px;
}
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
</style>
<script>
    import dispatch from "../common/js/dispatch";
    import { IO } from "../common/js/utils";
    import { modal, alert} from 'vue-strap';
    import Env from '@ali/lib-env';
    export default{
        data(){
            return {
                items:[],
                api: '/luban/release.do',
                releasePositionApi:"/luban/LbReleasePositionScreen.do",
                showDelSuccess:false,
                showCopySuccess:false
            }
        },
        components: {alert},
        ready() {
        },
        methods:{
        	//更改状态，标记结束投放
        	releaseEnd(id){
        	 var self=this;
       		 var activityId = Env.params.activityId;
       		 IO({
                 url: self.releasePositionApi,
                 type:"get",
                 dataType: "jsonp",
                 data: {
                     type: "updatestatus",
                     activityId: activityId,
                     status:"2",
                     positionId:id,
                     _input_charset: 'utf8'
                 },
                 success: function(res) {
                	  for (var i = 0; i < self.items.length; i++) {
                		  var item=self.items[i];
                		  if(item.id==id){
                			  item.status=2;
                		  }
                	  }
                 },
                 error: function(res) {
                     console.log(res);
                 }
             });
        	},
        	//更改状态，标记开始投放
        	releaseBegin(item){
        	 var self=this;
             var id = item.id;
       		 var activityId = Env.params.activityId;
       		 IO({
                 url: self.releasePositionApi,
                 type:"get",
                 dataType: "jsonp",
                 data: {
                     type: "updatestatus",
                     activityId: activityId,
                     status:"1",
                     positionId:item.id,
                     _input_charset: 'utf8'
                 },
                 success: function(res) {
                        
                	  for (var i = 0; i < self.items.length; i++) {
                		  var item=self.items[i];
                		  if(item.id==id){
                            if(res.errorCode == "activity_expired"){
                                dispatch.fire("timelimt",{item:item});
                                return;
                            } 


                			  item.tppUrl=res.data.tppUrl;
                			  item.status=1;
                              if(item.tppUrl){
                                item.tppUrl=res.data.tppUrl.replace(/&amp;/g, '\&');
                              }
                			  setTimeout(function(){
                				  self.copyinit(id);
                              	  },300); 
                		  }
                	  }
                 },
                 error: function(res) {
                     console.log(res);
                 }
             });
        	},
        	//初始化复制flash插件
        	copyinit(id){
        		var com=this;
        	var client = new ZeroClipboard(document.getElementById("copy_"+id));
              	client.on( "ready", function( readyEvent ) {
              		  client.on( "aftercopy", function( event ) {
              			  com.showCopySuccess=true;
              		  } );
              		} );
        	},
        	load(){
        		 var self=this;
        		 var activityId = Env.params.activityId;
        		   IO({
                       url: self.api,
                       type:"get",
                       dataType: "jsonp",
                       data: {
                           type: "list",
                           activityId: activityId,
                           _input_charset: 'utf8'
                       },

                       success: function(res) {
                     	self.items=res.data;
                     	  setTimeout(function(){
                     	for(var i=0;i<self.items.length;i++){
                     		self.items[i].tppUrl=	self.items[i].tppUrl.replace(/&amp;/g, '\&');
                     		self.copyinit(self.items[i].id);
                     	}
                    	  },300); 
                       },
                       error: function(res) {
                           console.log(res);
                       }
                   });
        	}
        }
    }
</script>