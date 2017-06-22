<style lang="sass" scoped>
.text-model-body {
    padding: 20px;
}
.control-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
}
.active-info-box {
    width: 350px;
    .active-name {
        font-size: 18px;
        color: #666;
    }
}
.active-tool {
    display: flex;
    width: 350px;
    justify-content: flex-end;
    .tool-box {
        margin: 0 10px;
        cursor: pointer;
    }
    .passed {
        width: 50px;
        height: 50px;
        border-radius: 100px;
        background: #DAE2EB;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        align-items: center;
    }
    .tool-icon {
        width: 30px;
        height: 30px;
        background-size: contain;
    }
    .download-icon {
        background-image: url(../images/iconfont-down.png);
    }
    .preview-icon {
        background-image: url(../images/iconfont-playfill.png);
    }
    .push-icon {
        background-image: url(../images/iconfont-forwardfill.png);
    }
    .glay-but{
        background: #4a4a4a;
        color: #FFFFFF;
        font-size: 20px;
        min-width: 130px;

    }
    .green-but{
        background: #5ec366;
        color: #FFFFFF;
        font-size: 20px;
        min-width: 130px;
    }
}
.up-line{
    background: #5ec366;
    color: #FFFFFF;
    font-size: 20px;
    min-width: 130px;
    overflow: hidden;
    margin-bottom: 20px;
    float: right;
}
.fx{
    clear: both;
}
.priveimg{
    display: block;
    margin: 20px auto;
}
</style>

<!-- example页面的control部分 -->
<template>
    <div class="control-box">
        <div class="control-box-col active-info-box">
            <span class="active-name" v-text = title></span><span slot="span" class="ml10 glyphicon  glyphicon-cog"></span>
        </div>

        <div class="control-box-col btn-group">
            <span class="mr5 glyphicon glyphicon-minus-sign" @click="doZoomS"></span>
            <span class="mr5">{{zoomNum}}<span>%</span></span>
            <span class=" glyphicon glyphicon-plus-sign" @click="doZoomB"></span>
        </div>
        

        <div class="control-box-col active-tool">
            <button class="btn  btn-lg mr20 glay-but" @click = doPreview()>预览</button>
            <button class="btn  btn-lg green-but" @click = doSave()>保存模版</button>
        </div>


        <modal title="模版预览" :show.sync="priViewModal" effect="fade" width="95%">
            <div slot="modal-body" class="modal-body">
                  <button class="btn  btn-lg  green-but up-line" v-text="rawStatus==0?'上线':'下线'" @click = upLine() >上线</button>
                  <div class="fx"></div>
                    <img class="priveimg" v-bind:src="previewImage"   alt="">
            </div>
            <div slot="modal-footer" class="modal-footer">
                <button type="button" @click = 'priViewModal = false' class="btn btn-default">关闭</button>

            </div>

        </modal>

    </div>

</template>
<style lang='sass' scoped>
    .bs-example {
        margin-top:20px;
    }
</style>
<script>
    import utils from '../common/js/utils.js';
    import {IO} from '../common/js/utils.js';
    import { modal } from 'vue-strap';
    import { mAlert } from "../common/js/utils";

    import bannerPreview from '../components/banner-preview.vue';
    import releaseList from '../components/release-list.vue';
    import tAdditem from '../components/add-item.vue';
    import tTextmanage from '../components/text-manage.vue';
    import tRawmanage from '../components/raw-manage.vue';
    var io = require('@ali/kissy-io');
    import Env from '@ali/lib-env';
    import dispatch from "../common/js/dispatch";    
    export default{
        data: function() {
            return {
                priViewModal:false,
                previewImage:"",
                title:"",
                zoomNum:100,
                rawStatus:0,
            }
        },
        components:{
            modal,
            tAdditem,
            tTextmanage,
            tRawmanage,
            releaseList,
            bannerPreview
        },
        methods: {
            doSave:function(){
                window.app.$refs.editContent.doSave();
            },

            upLine:function(){
                var com = this;
                          
                if(com.rawStatus == 0){
                    var req = {
                        type:"release",
                        id:Env.params.id
                    };
                }else{
                    var req = {
                        type:"pause",
                        id:Env.params.id
                    };
                }
                IO({
                    url : "/luban/rawdata.do?_input_charset=utf8",
                    type : "get",
                    data : req,
                    dataType : "jsonp",
                    success : function(res) {
                        if(res.success){
                            com.rawStatus = res.data.rawStatus;
                            if(com.rawStatus==1){
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
            doZoomB:function(){
                if(this.zoomNum<100){
                    this.zoomNum +=10;
                     window.app.$refs.editContent.doZoom(this.zoomNum);
                }
            },
            doZoomS:function(){
                if(this.zoomNum>0){
                    this.zoomNum -=10;
                     window.app.$refs.editContent.doZoom(this.zoomNum);
                }
            },

            doPreview:function(){
                //alert("预览");
                var self = this;
                var json = window.app.$refs.editContent.doMakeJson();
                var apiUrl = "/luban/rawdata.do";
                self.previewImage = "";
                self.priViewModal = true;
                var id = lib.env.params['id']||0;
                IO({
                    url: apiUrl+"?type=preview",
                    type:"post",
                    dataType:"json",
/*

*/
                    data: {
/*
                        type:"preview",
*/
                        id:id,
                        rawdata:JSON.stringify(json),
                        _input_charset: 'utf8'
                    },
                    success: function(res) {
                        var data = res.data;
                        if(res.errorMsg){
                            mAlert(res.errorMsg,"danger");
                            return;
                        }
                        if(res.success&&data){
                            //alert("保存成功");
                            self.previewImage = data;
                        }
                    },
                    error: function(e) {
                    }
                });

                //window.app.$refs.editContent.doPreview();

            }
        },
        watch: {
        },
        events: {
        
        },
        ready() {
            var self = this;
            dispatch.on("changeraw",function(obj){
                  self.rawStatus = obj.rawStatus;  

            })

        }
    }
</script>