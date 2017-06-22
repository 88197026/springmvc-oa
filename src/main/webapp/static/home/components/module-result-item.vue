
<template>
    <div class="showItems">
        <div class="thumbnail" v-bind:class="{'thumbnail-active':singleChooseVal}">
            <div class="ope" v-if="!item.notShowSelected">
                <input type="checkbox" v-model="singleChooseVal" @click="choose(item.id)">
            </div>
            <div v-show ="showedit" @click="showEdit(item,$event)" class="showedit">
                    <span class="glyphicon glyphicon-edit"></span>
                    <!-- <object data="../images/edit.svg" type="image/svg+xml" width="20" height="20"></object> -->
            </div>
            <div v-show="showstate&&item.statistics"  class="datalog">{{item.statistics}}</div>
            <div class="image resimgwarp" @click="choose(item.id)" v-bind:class="{'h300':(positionw<positionh&&positionh>300),'w560':(positionw>560)}">
                <img  v-bind:class="{'thumbnail-imgeW': (positionw>=positionh&&positionw>560),'thumbnail-imgeH':(positionw<positionh&&positionh>300)}"  v-bind:src="item.resultUrl"/>
                
                <button v-show ="close" type="button" @click="delitem(item.id)" class="other-close close"><span>×</span></button>
            </div>
        </div>
    </div>
</template>
<style lang="sass">
.resimgwarp{
    width: 100%;
    text-align: center;
    position: relative;
}
.showedit{
    position:absolute;
    top:7px;
    right: 7px;
}
.resimgwarp:hover{
    .other-close{
        display: block;
    }
}
.thumbnail-imge{
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: 50%;
}
.h300{
    height: 300px;
}

.w560{
    width:560px;

}

.thumbnail-active{

    border: 1px solid #49b7fb;
}

.showItems{
    float: left;
    overflow: hidden;
    margin-right: 10px;
}
.thumbnail-imgeW{
    width: 100%;

}

.thumbnail-imgeH{
    height: 100%;
}

.thumbnail{
    position: relative;
}

.other-close{
    position: absolute;
    top:0px;
    right:0px;
    display: none;
}

.mr5{
    margin-right:5px;
}
.datalog{
    position:absolute;
    top:0px;
    left:0px;
    min-width:230px;
    padding: 0px 10px;
    height:25px;
    color: #fff;
    background-color: #e08d2b;
    line-height: 25px;
    z-index: 10;
}
</style>
<script>
    import {IO} from '../common/js/utils';
    import { mAlert } from "../common/js/utils";
    import dispatch from "../common/js/dispatch";
    export default{
        props: {
            selected: {
                type: Array
            },
            item: {
                type: Object
            },
            close:{},
            positionw:Number,
            positionh:Number,
            showstate:{},
            showedit:{

            }
        },
        data(){
            return{
                singleChooseVal: false,
            }
        },
        watch: {
            selected: function() {
                for (var i = 0; i < this.selected.length; i++) {
                    if (this.selected[i] == this.item.id) {
                        this.singleChooseVal = true;
                        return;
                    }
                }
                this.singleChooseVal = false;
            }
        },
        methods:{
            imagechoose:function (){
                this.singleChooseVal = !this.singleChooseVal;
            },
            showEdit:function(item,event){
                event.stopPropagation();    
                dispatch.fire("showedit",{
                     item:item   
                })
            },
            delitem:function(id){
                var self = this;
                IO({
                    url: '/luban/LbResultScreen.do',
                    type:"post",
                    dataType: "json",

                    data: {
                        type: 4,
                        ids: id,
                        _input_charset: 'utf8'
                  },
                    success: function(res) {
                        mAlert('删除成功');
                        dispatch.fire("updata-changepag");
                    },
                    error: function() {
                        mAlert('删除失败','danger')
                    }
                });
            },
            choose: function() {
                this.$dispatch('choose', this.item.id)
            }

        }
    }
</script>