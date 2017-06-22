<style lang="sass" scoped>
    .btn-wrap {
        display: flex;
        padding: 0 10px;
        height: 30px;
        margin-top: 15px;
        align-content: center;
        justify-content: space-between;
        margin-bottom: 10px;
        .btn-info {
            width: 100px;
            margin-top: 15px;

        }
    }
    .previewUrl{
        margin: auto;
        margin-top:20px;
        max-width: 800px;
        display: block;
    }
</style>

<template>


    <div v-if="textlayer.length == '0'">
        
        <div>暂无文案</div>
   </div>
    
   <div v-if="textlayer.length != '0'">
        
        <div class="btn-wrap">
            <button class="btn btn-sm mt10 btn-default" @click="addTextBox">
                <span class="glyphicon glyphicon-plus co_g mr5" aria-hidden="true"></span>
                添加文案组</button>
            <button width="100" class="btn btn-sm btn-info" @click="saveTextGroup">保存</button>
        </div>
        <div class="container-fluid text-manage">
            <div class="row">
                    <t-textbox v-for="item in textList" :textlayer = "textlayer" :text-content="item" :index="$index"></t-textbox>
            </div>
        </div>
    </div>
    <img v-bind:src="previewurl" class="previewUrl" />
</template>
<script>
    import {IO} from '../common/js/utils';
    import utils from '../common/js/utils.js';
    import { mAlert } from "../common/js/utils";

    import tTextbox from './text-box.vue';
    import Env from '@ali/lib-env';

    module.exports = {
        props: {
            textList: {
                type: Array
            },
            previewurl:{
            },
            positionid:{
            },
            textlayer:{}
        },

        data() {
            var self = this;
            return {
                activityId: -1,
                textBoxDO() {
                    return {
                        activityId: self.activityId,
                        positionId: self.positionid,
                        name: "",
                        cpTextName:[]
                    }
                },
                api: '/luban/LbCopywriterScreen.do'
            }
        },
        methods: {
            addTextBox() {
                var DO = new this.textBoxDO();
                this.textList.push(DO);
            },
            saveTextGroup(){
                var self = this;
                var sendJson = {activityId:this.activityId,                         positionId: this.positionid,_input_charset:"utf8",type:"positionadd"};
                var textGroup = {};
                var emptyInfo = "";

                this.$broadcast('savebox',function(content,index,isemptyInfo){
                    if(isemptyInfo){
                        emptyInfo = isemptyInfo;
                        return;
                    }
                    textGroup[index] = content;
                });
                if(emptyInfo){
                    mAlert(emptyInfo,"danger");
                    return;
                }
                sendJson["textGroup"] = JSON.stringify(textGroup);
                IO({
                    url: self.api,
                    type:"get",
                    dataType:"jsonp",

                    data: sendJson,
                    success: function(res) {
                        if(res.success){
                            mAlert('保存文案成功');
                            if(res.data.previewUrl){
                                self.previewurl = res.data.previewUrl; 
                            }
                            self.$dispatch("changeCopywriteNum",res.data.count);
                        }else{
                            mAlert(res.errorMsg,"danger");
                        }
                    },
                    error: function() {
                        mAlert('保存文案失败',"danger")
                    }
                });

                //console.dir("over3");
            }

        },
        components: {
            tTextbox
        },
        events: {
            delTextBox(id, index) {
                var self = this;
                if (id) {
                    IO({
                        url: self.api,
                        type: "get",
                        dataType: "jsonp",
                        data: {
                            type: 4,
                            id: id,
                            positionId: self.positionid,
                            activityId: self.activityId,
                            _input_charset: 'utf8'
                        },
                        success: function (res) {
                            if (res.success) {
                                self.textList.splice(index, 1);
                                mAlert('删除文案成功');
                                self.$dispatch("changeCopywriteNum",res.total,true);
                            }
                        },
                        error: function () {
                            mAlert('删除文案失败',"danger")
                        }
                    });
                } else {
                    self.textList.splice(index, 1);
                }
            }
        },
        ready(){
            this.activityId = Env.params.activityId;
            if (!this.textList || !this.textList.length) {
                this.textList.push(new this.textBoxDO());
            }
        }
    }
</script>