<template>
    <div class="edit-ctrl-warp">
        <div class="l-edit-ctrl">
            <span class="active-name" >活动模版</span>
        </div>
        <div class="control-box-col btn-group zoom-warp">
            <span class="mr5 glyphicon glyphicon-minus-sign" @click="doZoomS"></span>
            <span class="mr5">{{zoomNum}}<span>%</span></span>
            <span class=" glyphicon glyphicon-plus-sign" @click="doZoomB"></span>
        </div>
        <div class="r-edit-ctrl">
            <button class="btn   mr10 btn-default" @click = doPreview()>预览</button>
            <button class="btn  btn-primary" @click = doSave()>保存模版</button>
        </div>


    </div>

</template>
<style lang='sass'>
    .edit-ctrl-warp{
        width: 100%;
        height: 70px;
        line-height: 70px;
        position: relative;
        text-align: center;
        .l-edit-ctrl{
            position: absolute;
            height: 70px;
            line-height: 70px;
            top:0px;
            left: 20px;
            .active-name{
                font-size: 18px;
                color: #666;
            }
        }
        .r-edit-ctrl{
            position: absolute;
            height: 70px;
            top:0px;
            line-height: 70px;
            right: 20px;
        }
        .zoom-warp{

            display: inline-block;
        }
    }

</style>
<script>
    import dispatch from "../common/js/dispatch";
    export default{
        data:function(){
            return{
                zoomNum:100
            }
        },
        components: {
        },
        methods: {
            doZoomB:function(){
                if(this.zoomNum<100){
                    this.zoomNum +=10;
                    dispatch.fire("sacle-big",{zoomNum:this.zoomNum});
                }
            },
            doZoomS:function(){
                if(this.zoomNum>0){
                    this.zoomNum -=10;
                    dispatch.fire("sacle-small",{zoomNum:this.zoomNum});
                }
            },
            doPreview:function(){
                dispatch.fire("edit-do-preview",{zoomNum:this.zoomNum});

            },
            doSave:function(){
                dispatch.fire("edit-do-save",{zoomNum:this.zoomNum});


            }
        }
    }
</script>