<style lang="sass" scoped>
    .btn-wrap {
        display: flex;
        height: 45px;
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
        margin: 20px auto 10px auto;
        max-width: 720px;
        min-width: 400px;
        display: block;
    }
    .banner-preview-text{
        color:#333;
        margin-bottom: 20px;
        text-align: center;
    }

    .add-text-btn-warp{
        width: 50px;
        margin-bottom: 10px;
        background: #f5f5f5;
        display: -webkit-box;
        -webkit-box-pack: center;
        -webkit-box-align: center;
    }
</style>

<template>

    <div>
        <img v-bind:src="previewurl" class="previewUrl" />
        <div class="banner-preview-text">banner预览效果</div>

        <div v-if="textlayer.length == '0'">
            <div>暂无动态文案</div>
        </div>
        <div v-if="textlayer.length != '0'">
            <div class="btn-wrap">
                <button class="btn btn-sm mt10 btn-default" @click="addTextBox">
                    <span class="glyphicon glyphicon-plus co_g mr5" aria-hidden="true"></span>
                    添加文案组</button>
                <button width="100" class="btn btn-sm btn-info" @click="saveTextGroup">保存</button>
            </div>
            <div class="container-fluid text-manage">
                <div class="row" v-show = "!showSingleTextBox">
                    <t-textbox :show-priview-btn ="showPriviewBtn"  v-for="item in textList" :textlayer = "textlayer" :text-content="item" :index="$index"></t-textbox>
                    <div  class="add-text-btn-warp text-box col-lg-4 col-md-4 col-xs-4 col-sm-4">
                        <img src="https://gw.alicdn.com/tps/TB18PO.NXXXXXbwXFXXXXXXXXXX-160-140.png" alt="">
                    </div>
                </div>
                <div class="row " v-show = "showSingleTextBox">
                    <t-textbox :show-priview-btn ="showPriviewBtn"  v-for="item in textList" :textlayer = "textlayer" :text-content="item" :index="$index"></t-textbox>
                </div>


            </div>
        </div>
    </div>

</template>
<script>
    import {IO} from '../common/js/utils';
    import utils from '../common/js/utils.js';
    import { mAlert } from "../common/js/utils";
    import tTextbox from './text-box.vue';
    import Env from '@ali/lib-env';
    module.exports = {
        props: {
            showPriviewBtn:{},
            showSingleTextBox:{},
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
                var sendJson = {activityId:this.activityId,positionId: this.positionid,_input_charset:"utf8",type:"positionadd"};
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
                    url: '/luban/LbCopywriterScreen.do',
                    type:"get",
                    dataType:"jsonp",

                    data: sendJson,
                    success: function(res) {
                        console.log(res);
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
                            console.dir(res);
                            if (res.success) {
                                self.textList.splice(index, 1);
                                mAlert('删除文案成功');

                                self.$dispatch("changeCopywriteNum",res.total);
                            }
                        },
                        error: function () {
                            mAlert('删除文案失败',"danger")
                        }
                    });
                } else {
                    self.textList.splice(index, 1);
                }
            },
            saveTextBox(id, content, index) {
                var self = this;
                var data = content;
                content.activityId = this.activityId;
                content._input_charset = 'utf8';
                if (id) {
                    content.id = id;
                    content.type = 3;
                    // 有id 调修改接口
                    IO({
                        url: self.api,
                        type:"get",
                        dataType:"jsonp",

                        data: content,
                        success: function(res) {
                            console.log(res)
                        },
                        error: function() {
                            mAlert('修改文案失败',"danger")
                        }
                    });
                } else {
                    content.type = 2;
                    // 调创建接口
                    IO({
                        url: self.api,
                        type:"get",
                        dataType:"jsonp",

                        data: content,
                        success: function(res) {
                            self.textList[index].id = res.data;
                            console.log(res)
                        },
                        error: function() {
                            mAlert('创建文案失败',"danger")
                        }
                    });
                }
            }
        },
        ready() {
            this.activityId = Env.params.activityId;
            if (!this.textList || !this.textList.length) {
                this.textList.push(new this.textBoxDO());
            }
        }
    }
</script>