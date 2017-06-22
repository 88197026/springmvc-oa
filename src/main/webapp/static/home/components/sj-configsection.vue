<style lang = "sass" >
    .textmanage-warp{
        padding: 10px;
        padding-bottom: 60px;
    }
    .style-seclect-warp{
        height: 60px;
        line-height: 60px;
        padding: 0px 10px;
        margin-bottom: 10px;
    }
</style>
<template>
    <div>
        <div class="r-content-title">
            <div v-show="currentSection=='cm-chooseModal'">
                <div class="style-seclect-warp">
                    <cm-style-seclect :show-store-kind = "true" :show-type-select = "true" :show-color-select = "true" ></cm-style-seclect>
                </div>
                <cm-allmodle-show   v-ref:modleboard :store-value = storeValue :color-value = colorValue :style-value = styleValue></cm-allmodle-show>
            </div>

            <div v-show="currentSection=='cm-addTextModal'">
                <div class="textmanage-warp">
                    <cm-text-manage  :text-list="textList"  :positionid='positionId' :previewurl.sync = "previewUrl"  :textlayer="textLayer" ></cm-text-manage>
                </div>
                <cm-foot :type = currentSection></cm-foot>
            </div>
            <div v-show="currentSection=='cm-modalManage'">
                <div class="style-seclect-warp">
                    <cm-style-seclect :showcreatebtn = true ></cm-style-seclect>
                </div>
                <cm-raw-list></cm-raw-list>
            </div>
            <div  v-show="currentSection=='cm-editContent'">
                <div>
                    <cm-scale-tool></cm-scale-tool>
                </div>
                <edit-content v-ref:edit   :isautoinit = "isAutoEdit"></edit-content>
            </div>
        </div>
    </div>
</template>

<script>
    var Pagination = require('../common/js/lib-pagination.js');
    import {IO} from '../common/js/utils';
    import Env from '@ali/lib-env';
    import dispatch from "../common/js/dispatch";
    import { modal} from 'vue-strap';
    import { mAlert } from "../common/js/utils";
    import vSelect from 'vue-strap/src/Select.vue';
    import vOption from 'vue-strap/src/Option.vue';
    module.exports = {
        props: {
        },
        data: function () {
            return {
                page: 1,
                reachEnd: false,
                errajax: false,
                textList:[],
                positionid:0,
                previewUrl:"http://gw.alicdn.com/imgextra/i4/5/TB2KMfWaanyQeBjy1zkXXXmyXXa_!!5-0-yamato.jpg",
                textLayer:"",
                currentSection:"cm-chooseModal",
                isAutoEdit:false,
                storeValue:{},
                colorValue:{},
                styleValue:{}
            }
        },
        components: {
            vOption,
            vSelect,
            cmStyleSeclect: require('../components/cm-style-seclect.vue'),
            cmFoot: require('../components/cm-foot.vue'),
            cmAllmodleShow: require('../components/cm-allmodle-show.vue'),
            cmTextManage: require('../components/cm-text-manage.vue'),
            cmRawList: require('../components/cm-raw-list.vue'),
            cmScaleTool: require('../components/cm-scale-tool.vue'),
            editContent: require('../components/edit-content.vue')

        },
        methods: {
            getTextAjax:function(){
                var self = this;
                IO({
                    url: '/luban/LbCopywriterScreen.do',
                    type:"get",
                    dataType:"jsonp",
                    data: {
                        type: 'positionlist',
                        activityId: Env.params.activityId||"2848",
                        positionId:self.positionId||"7759",
                        _input_charset: 'utf8'
                    },
                    success: function(res) {
                        self.textList = res.data.lbCopywriterListDTOList;
                        self.textLayer = res.data.textLayer||[];
                    },
                    error: function() {
                        console.log('category io error')
                    }
                },true);
            }
        },
        watch: {
        },
        ready:function() {
            var self = this;
            self.$refs.modleboard.getModeList(1);
            this.getTextAjax();
            dispatch.on("xj-complete-choosemodle",function(){
                self.currentSection = "cm-addTextModal"
                self.getTextAjax();
            });
            dispatch.on("cm-style-seclect-store-select",function(obj){
                self.storeValue = obj.storeValue;
            });
            dispatch.on("cm-style-seclect-color-select",function(obj){
                self.colorValue = obj.colorValue;
            });
            dispatch.on("cm-style-seclect-style-select",function(obj){
                self.styleValue = obj.styleValue;
            });

            //self.$refs.edit.initRdata({id:3135});
        }
    }
</script>