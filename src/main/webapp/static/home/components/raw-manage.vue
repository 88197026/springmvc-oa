<style lang="sass" scoped>
    .btn-wrap {
        display: flex;
        padding: 0 10px;
        height: 30px;
        align-content: center;
        justify-content: space-between;
        margin-bottom: 10px;
        .btn-info {
            width: 100px;
        }
    }
</style>
<template>
    <div class="container-fluid text-manage">
    <table class="table table-hover sin">
    <thead>
    <tr>
        <th>
        预览图
    </th>
        <th>
            模板名称
        </th>
        <th>
            模板尺寸
        </th>
        <th>
            信息描述
        </th>
         <th>
           选择
        </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in items">
    <th>
    <img v-bind:src="item.previewUrl" width="200" />
    	</th>
	        <th>
	        {{ item.name }}
	    </th>
	    <th>
	    {{ item.width }}*{{ item.height }}
	    </th>
	    <th>
	    {{ item.info }}
	    </th>
        <th v-if="!!item.selected">
            已选择
        </th>
        <th v-else>
        <a href="javascript:void(0);" class="J_hide" data-id="{{item.id}}" data-index="{{$index}}" @click='saveRaw'>选择</a>
        </th>
    </tr>
    </tbody>
</table>
    </div>

</template>
<script>
    import dispatch from "../common/js/dispatch";
    import { IO } from "../common/js/utils";
    import { modal} from 'vue-strap';
    import Env from '@ali/lib-env';
    export default{
        data(){
            return {
                items:[],
                showDelSuccess:false,
                rawApi:'/luban/raw.do'
            }
        },
        components: {},
        ready() {
          	  var self = this;
                    IO({
                        url: self.rawApi,
                        type:"get",
                        dataType:"jsonp",

                        data: {
                            type: "1",
                            activityId: Env.params.activityId,
                            _input_charset: 'utf8'
                        },
                        success: function(res) {
                            self.items = res.data.list;
                        },
                        error: function() {
                            console.log('raw io error')
                        }
                    });
        },
        methods:{
        	saveRaw:function(e){
        		    var activityId = Env.params.activityId;
        			var target=e.currentTarget;
        			var dataId=target.getAttribute("data-id");
        			var idx=target.getAttribute("data-index");
        			var com = this;
        			 var req = {
        		              type:"2",
        		              rawdataId:dataId,
        		              activityId:activityId
        		            };
        			  IO({
        	                url : "/luban/LbReleasePositionScreen.do?_input_charset=utf8",
        	                type : "get",
        	                data : req,
        	                dataType : "jsonp",
        	                success : function(res) {
        	                  if(res.success){
        	                	com.items[idx].selected=true;
        	                	com.showDelSuccess=true;
        	                	//模板选择框关闭,重新load页面数据
        	                	location.reload();
        	                  }else{
        	                	  console.log(res);
        	                  }
        	                },
        	                error: function() {
        	                   console.log("error");
        	                }
        	            });
        	}
        }
    }
</script>