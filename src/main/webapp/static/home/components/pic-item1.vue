<style lang="sass" scoped>
    .pic-item {
        position: relative;
        width: 140px;
        margin: 0px;
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
                color: #fff;
            }
            .maskbg{
                width: 100%;
                height: 100%;
                display: none;
                background-color: rgba(0,0,0,0.2);

            }
            .black-tip{
                display: none;
                position: absolute;
                width: 100%;
                bottom: 0px;
                font-size: 13px;
                color: #fff;
                text-align: center;
                line-height: 30px;
                background-color: rgba(0,0,0,0.6);

            }
            .black-tip:hover{

                background-color: rgba(0,0,0,1);
            }
            .status{
                position: absolute;
                left: 5px;
                top:5px;
                width: 35px;
                height: 20px;
                background: #2b6d96;
                text-align: center;
                border-radius: 4px;
                color: #fff;
                line-height: 20px;
            }
        }
    }

    .pic-item:hover{
        .maskbg{
            display: block;
        }
        .black-tip{
            display: block;
        }
    }




/*    .pic-item{
        position: relative;
        width: 140px;
        margin: 0px;
        img {
            width: 100%;
        }
        .pic-mask{
            position: absolute;
            top:0;
            left:0;
            right:0;
            bottom:0;
            display:none;
            margin:auto;
            background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABHNCS…Ug5fhNRN6gWcGkuSfbNZ3xW7eO7QAzTsdyBDxLHfsp///kOJAwa+yaTAAAAABJRU5ErkJggg==) no-repeat center center rgba(225, 50, 50, 0.5);
            background-size:30px;
        }
    }
    .pic-item .activity {
        display: block;
    }*/



</style>

<template>
    <div class="pic-item" @click="choose">
        <img v-bind:src="picUrl" alt="">
        <div class="pic-mask">
           <!-- <div class="add-checkbox">
                <span class="glyphicon glyphicon-ok"></span>
            </div>-->
            <div class="status">已导</div>
            <div class="maskbg"></div>

            <div class="black-tip">预览</div>
        </div>
    </div>
</template>

<script>
    var utils = require('../common/js/utils.js');

    module.exports = {
        props: {
            item: {
                type: Object
            },
            selected: {
                type: Array
            }
        },
        data: function () {
            return {
                activity: false,
                picUrl: ''
            }
        },
        methods: {
            choose: function() {
                this.$dispatch('choose', this.item.id,this.item);
            },
            refresh() {
                for (var i = 0; i < this.selected.length; i++) {
                    if (this.selected[i] == this.item.id) {
                        this.activity = true;
                        return;
                    }
                }
                this.activity = false;
            }
        },
        events: {
            refreshSelected() {
                this.refresh();
            }
        },
        watch: {
            selected: function() {
                this.refresh();
            }
        },
        ready: function() {
            this.picUrl = this.item.picUrl;
        }
    }
</script>