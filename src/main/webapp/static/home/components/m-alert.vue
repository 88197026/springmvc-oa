
<style lang="sass" scoped>
    .alert-warp{
        position: fixed;
        left: 0px;
        right: 0px;
        top:0px;
        bottom:0px;
        width: 400px;
        height: 200px;
        z-index:19999;
        margin: auto;
        text-align: center;
    }

</style>
<template>

    <div class="alert-warp" v-show="showalert&&status =='success'">

        <alert
                :show.sync="showalert"
                :duration="1500"
                type='success'
                width="400px"
                dismissable>
            <span class="icon-ok-circled alert-icon-float-left"></span>
            <strong>{{msg}}</strong>
        </alert>
    </div>

    <div class="alert-warp" v-show="showalert&&status =='danger'">

        <alert
                :show.sync="showalert"
                :duration="1500"
                type='danger'
                width="400px"
                dismissable>
            <span class="icon-ok-circled alert-icon-float-left"></span>
            <strong>{{msg}}</strong>
        </alert>
    </div>

</template>
<script>
    import { modal, alert} from 'vue-strap';

    module.exports = {
        props: {

        },
        data: function () {
            return {
                msg:"",
                showalert:false,
                status:"success"
            }
        },
        components:{
            modal,
            alert
        },
        methods: {
            showAlert:function(msg,status){
                this.status = status||"success";
                this.showalert = true;
                this.msg = msg
            }


        }
    }
</script>