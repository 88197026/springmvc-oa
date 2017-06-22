<style lang="sass" scoped>
    .filter-warp {
        background-color: #fff;
        display: -webkit-box;
        .filter-mode {
            display: -webkit-box;
            -webkit-box-align: center;
        }
        .mr10 {
            margin-right: 10px;
        }
        .mr5 {
            margin-right: 5px;
        }
        .mr20 {
            margin-right: 20px;
        }
        .mr40 {
            margin-right: 40px;
        }
    }
     .inblock {
     display: inline-block;
 }
 
 .color-select {
     .content:before {
         content: "";
         display: inline-block;
         width: 14px;
         height: 14px;
     }
 }
 
 .color1 {
     .content:before {
         background-color: #de2020;
     }
 }
 
 .color2 {
     .content:before {
         background-color: #fe6c00;
     }
 }
 
 .color3 {
     .content:before {
         background-color: #febf00;
     }
 }
 
 .color4 {
     .content:before {
         background-color: #59a725;
     }
 }
 
 .color5 {
     .content:before {
         background-color: #892bcf;
     }
 }
 
 .color6 {
     .content:before {
         background-color: #d744ba;
     }
 }
 
 .color7 {
     .content:before {
         background-color: #06b7c8;
     }
 }
 
 .color8 {
     .content:before {
         background-color: #0065fe;
     }
 }
 
 .color9 {
     .content:before {
         background-color: #733413;
     }
 }
 
 .color10 {
     .content:before {
         background-color: #ffffff;
     }
 }
 
 .color11 {
     .content:before {
         background-color: #000000;
     }
 }
 
 .nocolor {
     .content:before {
         display: inline;
     }
 }
 
 .color-block {
     display: inline-block;
     width: 14px;
     height: 14px;
 }

</style>
<template>
      <div class="filter-warp">

        <div class="filter-mode mr40" v-show = "showcreatebtn" >
          <button class="btn  btn-primary" @click = "createModal" >创建模版</button>
        </div>

        <div class="filter-mode mr10" v-show = "showTypeSelect">
          <v-select placeholder="模版风格"  class="inblock" :value.sync="storeValue">
            <v-option value="all"> 全部</v-option>
            <v-option value="1"> 女装</v-option>
            <v-option value="2"> 男装</v-option>
            <v-option value="3"> 鞋靴</v-option>
            <v-option value="4"> 箱包</v-option>
            <v-option value="5"> 内衣配饰</v-option>
            <v-option value="6"> 母婴</v-option>
            <v-option value="7"> 珠宝</v-option>
            <v-option value="8"> 美妆</v-option>
            <v-option value="9"> 食品</v-option>
            <v-option value="10"> 百货</v-option>
            <v-option value="11"> 家纺</v-option>
            <v-option value="12"> 家装</v-option>
            <v-option value="13"> 家电</v-option>
            <v-option value="14"> 汽车</v-option>
            <v-option value="15"> 百货</v-option>
            <v-option value="16"> 数码</v-option>
            <v-option value="17"> 动漫游戏</v-option>
            <v-option value="18"> 花鸟文娱</v-option>
          </v-select>
        </div>
        <div class="filter-mode mr10" v-show = "showColorSelect">
          <v-select placeholder="模版色调"  class="inblock color-select"  :class="{'nocolor':!colorkind||colorkind=='all','color1':colorkind=='#de2020','color2':colorkind=='#fe6c00','color3':colorkind=='#febf00','color4':colorkind=='#59a725','color5':colorkind=='#892bcf','color6':colorkind=='#d744ba','color7':colorkind=='#06b7c8','color8':colorkind=='#0065fe','color9':colorkind=='#733413','color10':colorkind=='#ffffff','color11':colorkind=='#000000'}" :value.sync="colorValue">
            <v-option value="all"><span class="inblock">全部</span> </v-option>
            <v-option value="#de2020"><span style="background-color:#de2020" class="inblock color-block"></span> <span class="inblock">红色</span> </v-option>
            <v-option value="#fe6c00"><span style="background-color:#fe6c00" class="inblock color-block"></span> <span class="inblock">橙色</span> </v-option>
            <v-option value="#febf00"><span style="background-color:#febf00" class="inblock color-block"></span> <span class="inblock">黄色</span> </v-option>
            <v-option value="#59a725"><span style="background-color:#59a725" class="inblock color-block"></span> <span class="inblock">绿色</span> </v-option>
            <v-option value="#892bcf"><span style="background-color:#892bcf" class="inblock color-block"></span> <span class="inblock">紫色</span> </v-option>
            <v-option value="#d744ba"><span style="background-color:#d744ba" class="inblock color-block"></span> <span class="inblock">玫红</span> </v-option>
            <v-option value="#06b7c8"><span style="background-color:#06b7c8" class="inblock color-block"></span> <span class="inblock">青色</span> </v-option>
            <v-option value="#0065fe"><span style="background-color:#0065fe" class="inblock color-block"></span> <span class="inblock">蓝色</span> </v-option>
            <v-option value="#733413"><span style="background-color:#733413" class="inblock color-block"></span> <span class="inblock">咖色</span> </v-option>
            <v-option value="#ffffff"><span style="background-color:#ffffff;border:1px solid #cccccc " class="inblock color-block"></span> <span class="inblock">白色</span> </v-option>
            <v-option value="#000000"><span style="background-color:#000000" class="inblock color-block"></span> <span class="inblock">黑色</span> </v-option>
          </v-select>

        </div>

        <div class="filter-mode" v-show="showStoreKind">
          <v-select placeholder="模版分类"  class="inblock" :value.sync="storeValue">
            <v-option value="all"> 全部模版(选中)</v-option>
            <v-option value="1"> 官方免抠图模版(悬停)</v-option>
            <v-option value="2"> 我上传的模版</v-option>
          </v-select>
        </div>

        <div class="filter-mode" v-show="showDesignSelect">
          <v-select    placeholder=""  :value.sync = "designValue" :search="true"  :close-on-select="true">
                      <v-option value ="all" > 全部设计师 </v-option>
            <v-option  v-for = "item in designList" :value = item > {{item}} </v-option>
          </v-select>
        </div>
      </div>






</template>
<script>
    import dispatch from "../common/js/dispatch";
    import { IO } from "../common/js/utils";
    import { modal} from 'vue-strap';
    import Env from '@ali/lib-env';
    import { mAlert } from "../common/js/utils";
    import vSelect from 'vue-strap/src/Select.vue';
    import vOption from 'vue-strap/src/Option.vue';
    export default{
        props: {
          showcreatebtn: {
          },
          showStoreKind:{
          },
          showTypeSelect:{
          },
          showColorSelect:{
          },
          showDesignSelect:{
          },
          buConfigId:{
          }
        },
        data:function(){
            return {
                styleValue:"",
                colorValue:"",
                storeValue:"",
                designList:["11"],
                designValue:"all"
            }
        },
        components: {
              vOption,
              vSelect
        },
        watch:{
            designValue:function(){
                dispatch.fire("design-select",{designValue:this.designValue})
            },
            storeValue:function(){
              dispatch.fire("cm-style-seclect-store-select",{storeValue:this.storeValue})
            },
            colorValue:function(){
              dispatch.fire("cm-style-seclect-color-select",{colorValue:this.colorValue})
            },
            styleValue:function(){
              dispatch.fire("cm-style-seclect-style-select",{styleValue:this.styleValue})
            }

        },
        ready:function(){
        },
        methods:{
          createModal:function(){
            dispatch.fire("xj-createMode");
          },
          getDesignAjax:function(){
            var self = this;
            var req = {
              type: "designers",
              buConfigId: self.buConfigId
            };
            IO({
              url: "/luban/Raw.do?_input_charset=utf8",
              type: "get",
              data: req,
              dataType: "jsonp",
              success: function(res) {
                if (res.success) {
                    self.designList = res.data;    
                } else {
                  mAlert("获取设计师接口出错", "danger");
                }
              },
              error: function() {
                mAlert("获取设计师接口出错", "danger");
              }
            });


          }

        }
    }
</script>