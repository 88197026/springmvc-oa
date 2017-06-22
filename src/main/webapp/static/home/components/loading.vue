<style lang="sass" scoped>
  .loadingbg{
      background: rgba(0,0,0,0.2);
      position: fixed;
      left: 0px;
      right: 0px;
      top:0px;
      bottom:0px;
      z-index:19999;
      .loadingcenter{
          position: absolute;
          left: 0px;
          right: 0px;
          top:0px;
          bottom:0px;
          margin: auto;
          text-align: center;
      }
      .img{
          width: 32px;
          height: 32px;
      }
      .load{
          width: 300px;
          height: 20px;

      }

  .wrapper {
      width: 350px;
      margin: auto;
      height: 110px;
  }

  .loadingbgnum{
      background: white;
      border: 1px solid #eee;
      border-radius: 4px;


  }

  .wrapper p a {color:#757575; text-decoration:none;}
  .wrapper .load-bar {
      width: 100%;
      height: 25px;
      border-radius: 30px;
      background: #dcdbd7;
      position: relative;
/*
      box-shadow: 0 1px 0 rgba(255, 255, 255, 0.8),  inset 0 2px 3px rgba(0, 0, 0, 0.2);
*/
      overflow: hidden;
  }
  .wrapper .load-bar:hover .load-bar-inner, .wrapper .load-bar:hover #counter {
      animation-play-state: paused;
      -moz-animation-play-state: paused;
      -o-animation-play-state: paused;
      -webkit-animation-play-state: paused;
  }
  .wrapper .load-bar-inner {
      height: 99%;
      border-radius: inherit;
      position: relative;
      background: #49b7fb;
      border-radius: 30px;

      background: linear-gradient(#e0f6c8, #98ad84);
      background: -moz-linear-gradient(#e0f6c8, #98ad84);
      background: -webkit-linear-gradient(#e0f6c8, #98ad84);
      background: -o-linear-gradient(#e0f6c8, #98ad84);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 1),  0 1px 5px rgba(0, 0, 0, 0.3),  0 4px 5px rgba(0, 0, 0, 0.3);
      transition: all 1s;

  }
  .wrapper h1 {
      font-size: 28px;
      padding: 20px 0 8px 0;
  }
  .wrapper p {
      font-size: 13px;
  }




  }

</style>

<template>
    <div class="loadingbg" v-show = showLoading>
        <img v-show = !showloadingnum class = "loadingcenter img" src="https://gw.alicdn.com/tps/TB1de8sJFXXXXaXXXXXXXXXXXXX-32-32.gif" alt=""/>
        <div class="loadingcenter wrapper loadingbgnum" v-show = showloadingnum>
            <img  class = "img mt10" src="https://gw.alicdn.com/tps/TB1de8sJFXXXXaXXXXXXXXXXXXX-32-32.gif" alt=""/>
            <p class="mt10">{{numMessage}}</p>
            <p class="mt10">预计生成{{totleNum}}张，已生成{{currentNum}}张</p>

        </div>

        <div class="loadingcenter wrapper loadingbgnum" v-show = showDaoruTip>
            <img  class = "img mt10" src="https://gw.alicdn.com/tps/TB1de8sJFXXXXaXXXXXXXXXXXXX-32-32.gif" alt=""/>
            <p class="mt10">{{numMessage}}</p>
            <p class="mt10">
                  <span class="co_r">{{totleNum}} </span>张免审图,
                 <span class="co_r">{{currentNum}} </span>张待审核图


            </p>

        </div>

    </div>
</template>
<script>
    var utils = require('../common/js/utils.js');

    module.exports = {
        props: {

        },
        data: function () {
            return {
                showloadingnum:true,
                showLoading:false,
                showDaoruTip:false,
                totleNum:0,
                currentNum:0,
                csswidth:0,
                numMessage:"鲁小班正在合图中，请稍后刷新此页面…",
            }
        },

        computed: {
            // 一个计算属性的 getter
       /*     csswidth: function () {
                // `this` 指向 vm 实例
                if(this.totleNum == 0){

                    return 0;
                }


                return 350*this.currentNum/this.totleNum
            }*/
        },

        methods: {
            initLodingNum:function(msg){
                this.numMessage = msg||"鲁小班正在合图中，请稍后刷新此页面…";
                this.totleNum = 0;
                this.currentNum = 0;


            },
            setLodingNum:function(totle,current){
                this.totleNum = totle;
                this.currentNum = current;

            } ,
            showLoadingImage:function() {
                this.showLoading = true;
                this.showloadingnum = false;
            },
            showLoadingNum:function() {
                this.showLoading = true;
                this.showloadingnum = true;
            },
            showDaoRuTip:function() {
                this.showLoading = true;
                this.showDaoruTip = true;
            },

            closeLoading:function() {
                this.showloadingnum = false;
                this.showDaoruTip = false;
                this.showLoading = false;
            },


        }
    }
</script>