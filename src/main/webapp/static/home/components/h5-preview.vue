<template>

    <div class="numtext">一共{{sumCount}}个</div>
    <div class="imgwarp">
        <img    v-for="item in  itemlist" class="resimg"  v-bind:src="item.resultUrl"/>
    </div>

</template>
<style lang='sass' scoped>
    .numtext{
        height: 60px;
        text-align: center;
        line-height: 60px;
    }
    .imgwarp{
        width: 10rem;
        overflow: hidden;
    }
    .resimg {
        display: block;
        margin: auto;
        margin-bottom: 20px;
        max-width: 100%;
    }
</style>
<script>
    import moduleResultItem from '../components/module-result-item.vue';
    import { modal, radioBtn, radioGroup } from 'vue-strap';
    import {IO} from '../common/js/utils';
    import Env from '@ali/lib-env';

    export default{
        data(){
            return{
                selected: [],
                api: '/tpp.do',
                itemlist: [],
                sumCount:0,
                positionw:0,
                positionh:0

            }
        },
        components: {

        },
        ready() {
            var self = this;

            IO({
                url: self.api,
                type: "get",
                dataType: "jsonp",
                data: {
                    activityId: Env.params.activityId,
                    _input_charset: 'utf8'
                },
                success: function(res) {
                    console.log(res);
                    self.itemlist=res.data.list;
                    self.positionw = res.data.width;
                    self.positionh = res.data.height;
                    for(var i=0;i<self.itemlist.length;i++){
                    	self.itemlist[i].notShowSelected=true;
                    }
                    self.sumCount=self.itemlist.length;
                },
                error: function() {
                    console.log('页面信息未取到')
                }
            });
        },
        methods: {

        },
        events: {

        },
        watch: {

        }
    }
</script>