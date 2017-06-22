<style lang="sass">
    .bottonConent{
        position: fixed;
        width: 100%;
        bottom: 0px;
        background:#ffffff;
        height:50px;
        .l-botton-conent{
            position: absolute;
            font-size:13px;
            color:#999999;
            left: 20px;
            top:0px;
            line-height: 50px;
        }
        .r-botton-content{
            position: absolute;
            right: 20px;
            top:0px;
            line-height: 50px;
        }
    }
</style>
<template>
    <div class="bottonConent" >
        <div class="l-botton-conent">
            Powered by 鲁班
        </div>
        <div class="r-botton-content" v-show="type=='cm-chooseModal'">
            <button type="button" class="btn btn-primary mr10" @click="nextStep">下一步</button>
        </div>
        <div class="r-botton-content" v-show="type=='cm-chooseItems'">
            <button type="button" class="btn btn-primary mr10" @click="nextStep">生产素材</button>
        </div>
        <div class="r-botton-content" v-show="type=='cm-finshed'">
            <button type="button" class="btn btn-primary mr10" @click="nextStep">完成</button>
        </div>

    </div>
</template>
<script>
    import dispatch from "../common/js/dispatch";

    module.exports = {
        props: ['type'],
        data: function() {
            return {
            }
        },
        components: {
        },
        methods:{
            nextStep:function(){
                dispatch.fire("next-setp",{kind:this.type})


            }

        }
    }
</script>