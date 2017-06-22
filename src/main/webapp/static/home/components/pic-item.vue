<style lang="sass" scoped>
    .pic-item {
        position: relative;
        width: 140px;
        margin: 0px;
        border: 3px solid transparent;

        img {
                width: 100%;
            }
        .pic-mask {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin:auto;
            z-index:10;
            cursor: pointer;

            .add-checkbox{
                position: absolute;
                top: 0;
                left: 0;
                width: 30px;
                height: 30px;
                background-color: #9b9b9b;
                line-height: 30px;
                text-align: center;
                display: none;
                color: #fff;
            }
            /*.maskbg{
                width: 100%;
                height: 100%;
                display: none;
                background-color: rgba(0,0,0,0.2);

            }*/
            .black-tip{
                display: none;
                position: absolute;
                right: 0px;
                top:0px;
                font-size: 20px;
                color: #F8E71C;
            }
            .black-tip:hover{

            }
            .status{
                position: absolute;
                left: 5px;
                top:5px;
                width: 35px;
                height: 20px;
                background: #F8E71C;
                text-align: center;
                border-radius: 4px;
                color: #666;
                line-height: 20px;
            }

            .add-checkbox-active{
                background: #F8E71C;
                color:#000;
                display: block !important;
            }
        }
    }
    .pic-item:hover{
        border: 3px solid #F8E71C;
        .black-tip{
            display: block;
        }
        .add-checkbox{
            display: block;

        }
        .add-status{
            display: block;

        }
    }


    .add-status{
        background: #F8E71C;
        text-align: center;
        color: #fff;
        position: absolute;
        bottom: 0px;
        left:0px;
        font-size: 14px;
        width: 100%;
        height: 20px;
        line-height: 20px;
        display: none;
    }

    .add-status:hover{
        background: #f8df0b;
    }
</style>

<template>
    <div class="pic-item"  @click="choose">
        <img v-bind:src="picUrl" alt="">
        <div class="pic-mask">
            <div class="add-checkbox" @click="changechoose($event)" :class = {"add-checkbox-active":item.checked}  v-show="item.status=='-2'">
                <span class="glyphicon glyphicon-ok"></span>
            </div>
            <div class="add-checkbox " @click="changechoose($event)"   :class = {"add-checkbox-active":item.checked}  v-show="itemstatus=='poolmanage'">
                <span class="glyphicon glyphicon-ok"></span>
            </div>
            <div class="status"  v-show="item.status == 1 && itemstatus=='pool'">已导</div>
            <div class="status"  v-show="item.status == 2 && itemstatus=='pool'">已导</div>
            <div class="add-status"   v-show="item.status=='-2'">
                直接导入
            </div>

            <div class="black-tip" @mouseenter = "mouseenter(item,$event)" @mouseleave = "mouseleave(item,$event)">
                <span class="glyphicon glyphicon-eye-open"></span>
            </div>
        </div>
    </div>
</template>
<script>
    var utils = require('../common/js/utils.js');
    import dispatch from "../common/js/dispatch";

    module.exports = {
        props: {
            item: {
                type: Object
            },
            selected: {
                type: Array
            },
            itemstatus:{
                default:"pool"

            }
        },
        data: function () {
            return {
                activity: false,
                picUrl: '',
                showBigImgTimer:"",
            }
        },
        methods: {
            choose: function() {
                this.$dispatch('choose', this.item);

            },
            changechoose:function(event){
                event.stopPropagation();
                this.$dispatch('changechoosestatus', this.item);

            },
            mouseenter:function(item, event) {
                var self = this;
                clearTimeout(self.showBigImgTimer);
                self.showBigImgTimer = setTimeout(function() {
                    var target = event.target.parentNode.parentNode;
                    dispatch.fire("itempreview-mouseenter",{item:item,target:target})
                }, 10)
            },
            mouseleave:function(item, event) {
                var self = this;
                clearTimeout(self.showBigImgTimer);
                dispatch.fire("itempreview-mouseleave",{item:item})
            }
        },
        events: {

        },
        watch: {

        },
        ready: function() {
            this.picUrl = this.item.picUrl;
        }
    }
</script>