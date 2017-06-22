<template>


    <modal-manage v-ref:modalmanage> </modal-manage>
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
                创建时间
            </th>
            <th>
                修改时间
            </th>
             <th>
                创建者
            </th>
             <th>
                模板id
            </th>
             <th>
               操作
            </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(index, item) in items">
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
		       <th>
		       {{ item.createTime }}
		    </th>
		    <th>
		    {{ item.createTime }}
		    </th>
		     <th>
		     {{ item.createNick }}
		    </th>
		    <th>
		     {{ item.id }}
		    </th>
					<th v-if="item.isLock==0">
							<a href="javascript:void(0);" class="J_hide" data-id="{{item.id}}" data-index={{index}} @click='update(item)'>编辑</a>
							<a href="/web/static/luban/src/edit.html?id={{item.id}}" class="J_hide" data-id="{{item.id}}" data-index={{index}} >图文编辑</a>
							<a href="javascript:void(0);" class="J_hide" data-id="{{item.id}}" data-index={{index}} @click='lock(item)'>上锁</a>
							<a href="javascript:void(0);" class="J_hide" data-id="{{item.id}}" data-index= {{index}} @click='del'>删除</a>
							<a href="javascript:void(0);" class="J_hide" data-id="{{item.id}}" data-index= {{index}} @click='linestatus(item)' v-text="item.rawStatus==0?'上线':'下线'" ></a>
							<a href="{{item.psdUrl}}" v-show = "item.psdUrl"  class="J_hide" data-id="{{item.id}}" data-index={{index}} >下载</a>
				 </th>
            <th v-if="item.isLock==1">
            <a href="javascript:void(0);" class="J_hide" data-id="{{item.id}}" data-index="$index" @click='unlock(item)'>解锁</a>
            <a href="{{item.psdUrl}}" v-show = "item.psdUrl" class="J_hide" data-id="{{item.id}}" data-index="$index" >下载</a>
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
		.pagination-warp{
			text-align: center;
		}
</style>
<script>
    import dispatch from "../common/js/dispatch";
    import { IO } from "../common/js/utils";
    import { modal} from 'vue-strap';
		import { mAlert } from "../common/js/utils";
		import bootPagination from '../components/boot-pagination.vue';
    import modalManage from '../components/modal-manage.vue';
		var moment = require('moment');
		export default{
        data(){
            return {
                items:[],
								page:1,
								totalPages:10
            }
        },
        components: {alert,bootPagination,modalManage},
        ready() {
            var com = this;
            com.$on('PAGE_DATA_GET', function (data) {
                // / / 在这里对list的数据做填充
							 var parent = com.$parent.$parent;
							 var ctrlraw = parent.$refs.ctrlraw;
               com.dodealItemDate(data.list);
							 com.totalPages = data.pageCount||1;
							 ctrlraw.totoleNum = data.totalCount;
						});
						dispatch.on("changepag-page",function(obj){
							var type = obj.eletype;
							if(type =="default"){
								com.page = obj.page;
								com.loadList();
							}
						})
						dispatch.on("load-list",function(obj){
								com.loadList(1);
						})
        },
        methods:{
					dodealItemDate:function(list){
						this.items = [];
						for(var i = 0; i < list.length; i++){
							var data_item = list[i];
							var time_f = moment.utc(data_item.gmtCreate);
							var show_item = {};
							show_item.name = data_item.name;
							show_item.id = data_item.id;
							show_item.createTime = time_f.format('YY-MM-DD HH:mm:ss');
							show_item.createNick = data_item.createNick;
							show_item.info=data_item.info;
							show_item.previewUrl=data_item.previewUrl;
							show_item.width=data_item.width;
							show_item.height=data_item.height;
							show_item.rawdata=data_item.rawdata;
							show_item.isLock=data_item.isLock;
							show_item.bu=data_item.bu;
							show_item.bizName=data_item.bizName;
							show_item.rawStatus=data_item.rawStatus;
							show_item.psdUrl=data_item.psdUrl;
							show_item.buConfigId=String(data_item.buConfigId) ;
							this.items.push(show_item);
						}
					},
					loadList(page){
						var self = this;
						self.page = page||self.page;
						var parent = self.$parent.$parent;
						var ctrlraw = parent.$refs.ctrlraw;
						var rawType = ctrlraw.chooseSourId||"";
						var buConfigId = ctrlraw.choosePuId||"";
            var rawStatusId = ctrlraw.rawStatusId||"";
						IO({
							url: "/luban/rawdata.do",
							type:"get",
							dataType: "jsonp",
							data: {
								type:"list",
								_input_charset: 'utf8',
								pageSize:"50",
								pageNo:self.page,
								rawType:rawType,
								buConfigId:buConfigId,
                rawStatus:rawStatusId
							},
							success: function(res){
								console.dir(res);
								if(res.success){
									self.dodealItemDate(res.data.list);
									self.totalPages = res.data.pageCount||1;
									ctrlraw.totoleNum = res.data.totalCount;
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

        	del:function(e){
            var target=e.currentTarget;
            var dataId=target.getAttribute("data-id");
            var idx=target.getAttribute("data-index");
            var com = this;
            this.$refs.modalmanage.showConfirmModal("确定要删除此模版？",function(){
                     var req = {
                          type:"del",
                          id:dataId
                        };
                      IO({
                          url : "/luban/rawdata.do?_input_charset=utf8",
                          type : "get",
                          data : req,
                          dataType : "jsonp",
                          success : function(res) {
                            if(res.success){
                            com.items.splice(idx,1);
                            mAlert("删除成功");
                      }else{
                              console.log(res);
                            }
                          },
                          error: function() {
                             console.log("error");
                          }
                      });

                 })
        	},
        	update:function(item){
							var com = this;
							var parent = com.$parent.$parent;
             	var ctrlraw = parent.$refs.ctrlraw;
							ctrlraw.showUpdateModal = true;
							item.rawdata=item.rawdata.replace(/&quot;/g, '\"');
							ctrlraw.updateItem=item;
        	},
        	lock:function(item){
        		var com = this;
        		 var req = {
   		              type:"lock",
   		              id:item.id
   		            };
   			  IO({
   	                url : "/luban/rawdata.do?_input_charset=utf8",
   	                type : "get",
   	                data : req,
   	                dataType : "jsonp",
   	                success : function(res) {
   	                  if(res.success){
   	                	item.isLock=res.data.isLock;
   	                  }else{
   	                	  console.log(res);
   	                  }
   	                },
   	                error: function() {
   	                   console.log("error");
   	                }
   	            });
        	},

			linestatus:function(item){
				var com = this;
				var rawStatus = item.rawStatus;
				if(rawStatus==0){
					var req = {
						type:"release",
						id:item.id
					};
				}else{
					var req = {
						type:"pause",
						id:item.id
					};
				}
				IO({
					url : "/luban/rawdata.do?_input_charset=utf8",
					type : "get",
					data : req,
					dataType : "jsonp",
					success : function(res) {
						if(res.success){
							item.rawStatus=res.data.rawStatus;
							if(item.rawStatus==1){
								mAlert("上线成功");
							}else{
								mAlert("下线成功");
							}
						}else{
						}
					},
					error: function() {
						console.log("error");
					}
				});
			},
        	unlock:function(item){
        		var com = this;
        		 var req = {
   		              type:"unlock",
   		              id:item.id
   		            };
   			        IO({
   	                url : "/luban/rawdata.do?_input_charset=utf8",
   	                type : "get",
   	                data : req,
   	                dataType : "jsonp",
   	                success : function(res) {
   	                  if(res.success){
   	                	item.isLock=res.data.isLock;
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