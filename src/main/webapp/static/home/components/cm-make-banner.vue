<template>
    <div class="make-banner-warp">
                    <div class="banner-box" >
                        <div class="banner-op">
                            <div v-if = "rawType == '1'" class="edit-text text-box mr15" @click="textModal = true" v-show="textLayer.length!=0">
                                <span class="glyphicon glyphicon-edit"></span>
                                <span>编辑文案</span>
                                <span class = "text-tip-icon">{{textGroupNum}}</span>
                            </div>
                            <div v-if = "rawType == '2'" class=" text-box mr15" @click="psdIdModal = true" >
                                <span class="glyphicon  glyphicon-pencil"></span>
                                <span>编辑宝贝id</span>
                                <span class = "text-tip-icon" >{{rawItemCount}}</span>
                            </div>
                            <!--  <div v-if = "rawType == '1'" class=" text-box mr15" @click="editIconModal = true" >
                                <span class="glyphicon  glyphicon-pencil"></span>
                                 <span>编辑业务标签</span>
                            </div> -->
                            <div class=" text-box mr15"  @click="delete" v-if="previewUrl&& previewUrl.length>0">
                                <span class="glyphicon  glyphicon-trash"></span>
                                <span >删除模版</span>
                            </div>

                        </div>
                        <div class=" banner-current" v-bind:class="{'h300':(positionW<positionH&&positionH>300)}">
                            <img v-if="previewUrl&& previewUrl.length == 0" class="thumbnail-imgeW"  src="http://gw.alicdn.com/mt/TB1CsDrMpXXXXcQXVXXXXXXXXXX-600-180.png" />
                                <img v-if="previewUrl&& previewUrl.length>0"    v-bind:class="{'thumbnail-imgeW': (positionW>=positionH&&positionW>600),'thumbnail-imgeH':(positionW<positionH&&positionH>300)}"  v-bind:src="previewUrl"/>
                        </div>
                    </div>

            <div class="style-kinds-group" v-show="backgroundRawdata&&backgroundRawdata.list&&backgroundRawdata.list.length>1">
                <div v-show = "backgroundRawdata.type=='1'">
                    <div class=" colors-group-text">选择投放风格 <span class="ml5">共<span class="co_b">{{backgroundRawdata.count}}</span>种</span></div>
                    <div class="group-warp">
                        <div class="swiper-container colors-group-container">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide  p-r"  v-bind:class="{ 'choosed-status': item.choosed}"  @click="changeColorStyle(item)" v-for="item in backgroundRawdata.list">  <div class="imgitem"    :style= "{ backgroundColor: (item.backgroundColorHex.indexOf('#')!=-1)?(item.backgroundColorHex):('#'+item.backgroundColorHex)}" ></div></div>
                            </div>
                        </div>
                        <div class="swiper-button-next"></div>
                        <div class="swiper-button-prev"></div>
                    </div>
                </div>

                <div v-show = "backgroundRawdata.type=='2'">
                    <div class=" img-group-text">
                        <div>
                            选择投放风格 <span class="ml5">共<span class="co_b">{{backgroundRawdata.count}}</span>种</span>
                        </div>
                    </div>
                    <div class="group-warp">
                        <div class="swiper-container imgs-group-container">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide choosed-status p-r" v-for="item in backgroundRawdata.list" v-bind:class="{ 'choosed-status': item.choosed}" >
                                    <img class="imgitem" @click="changeColorStyle(item)" v-bind:src="item.backgroundUrl" alt=""> <div v-show="item.choosed" class="arrow"></div> </div>
                            </div>
                            <!-- Add Arrows -->
                        </div>
                        <div class="swiper-button-next"></div>
                        <div class="swiper-button-prev"></div>
                    </div>
                </div>
            </div>
            <div class="final-operation">
                <!--this.positions-->
                <button class="btn btn-large  btn-primary go-to-result"  v-bind:class="{'go-to-success': positions.length&&itemNum&&((textGroupNum&&textLayer.length)||!textLayer.length)}"    @click='domakeBanner'>立即生成素材</button>
            </div>
        </div>
</template>
<style lang='sass' >
.make-banner-warp{

    width: 100%;
    .banner-box{
        width: 610px;
        display: block;
        padding: 4px;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 6px;
        margin:auto;
        margin-top: 20px;
        .banner-op{
            -webkit-box-align: center;
            display: -webkit-box;
            -webkit-box-pack: center;
            position: relative;
            background-color: #ffffff;
            height: 70px;
            .text-box {
                position: relative;
                color: #666;
                width: 128px;
                text-align: center;
                height: 40px;
                line-height: 40px;
                border:1px solid #e5e5e5;
                border-radius: 6px;
                cursor:pointer;
                .text-tip-icon {
                    min-width: 10px;
                    border-radius: 10px;
                    background: red;
                    padding: 0 5px;
                    color: white;

                }
            }
        }
        .banner-current {
            position: relative;
            width: 600px;
            margin: auto;
            text-align:center;
        }
    }

    .thumbnail-imgeW {
        width: 100% !important;
    }
    .thumbnail-imgeH {
        height: 100% !important;
    }


    .h300 {
        height: 300px;
    }


    .final-operation {
        margin-top: 10px;
        text-align: center;
        .go-to-result {
            padding: 20px 40px;
            background: #eeeeee;
            border: none;
            border-radius: 30px;
            font-size: 20px;
        }
        .go-to-success {
            background: #49B7FB;
        }
    }



}


.style-kinds-group{
    .group-warp {
        position: relative;
        width: 600px;
        margin: auto;
    }
    .colors-group-text {
        padding: 0px 45px;
        width: 600px;
        margin: 0px auto;
        margin-top: 10px;
    }
    .arrow {
        position: absolute;
        width: 0;
        height: 0;
        top: -11px;
        left: 50%;
        display: none;
        margin-left: -10px;
        border-bottom: 10px solid #49b7fb;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
    }

    .choosed-status {
        border: 3px solid #49b7fb !important;
        .arrow {
            display: block;
        }
    }

    .img-group-text {
        padding: 0px 45px;
        width: 600px;
        margin: 0px auto;
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .imgs-group-container {
        width: 510px;
        height: 80px;
        margin: 20px auto;
        .imgitem {
            width: 100%;
            height: 100%;
        }
        .swiper-slide {
            background: #ffffff;
            height: 70px;
            margin-top: 10px;
        }
        .add-custom-image {
            width: 100%;
            height: 100%;
            background: #FFFFFF;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px dashed #eee;
        }
    }
    .colors-group-container {
        width: 510px;
        height: 60px;
        margin: 20px auto;
        .swiper-slide {
            height: 60px;
        }
        .imgitem {
            width: 100%;
            height: 100%;
        }
    }




}





</style>
<script>
    import { modal } from "vue-strap";
    import { IO } from "../common/js/utils";
    import Env from '@ali/lib-env';
    import { mAlert } from "../common/js/utils";
    import vSelect from 'vue-strap/src/Select.vue';
    import vOption from 'vue-strap/src/Option.vue';
    import tTextmanage from '../components/text-manage.vue';
    import tRawmanage from '../components/raw-manage.vue';
    import buRawmanage from '../components/rawbu-manage.vue';
    import modalManage from '../components/modal-manage.vue';
    import dispatch from "../common/js/dispatch";
    export default{
        props:{
                
        },
        data: function() {
            return {
                showModal : false,
                chooseAllBgModal:false,
                positions:[],
                previewUrl:'',
                itemNum:0,
                positionId:'',
                hexs:[],
                positionW:0,
                positionH:0,
                backgroundRawdata:{},
                showSetting:false,
                index:0,
                upimagesModal:false,
                upPsdModal:false,
                upBu:0,
                upBizName:0,
                upBuConfigId:0,
                droppsd:null,
                buckleNum:0,
                itemIds:"",
                timerout:null,
                countTimer:null,
                beginTimer:false,
                textModal: false,
                psdIdModal:false,
                textList:[],
                textLayer:[],
                canUpPsd:false,
                textGroupNum:0,
                editIconModal:false,
                rawType:'1',// 模板类型 1-设计师上传 2-运营上传
                rawItemCount:0,
                textApi: '/luban/LbCopywriterScreen.do',
            }
        },
        components:{
            modal,
            tRawmanage,
            buRawmanage,
            vOption,
            vSelect,
            tTextmanage,
            modalManage
        },
        events: {
            PAGE_DATA_GET(data) {
                var self = this;
                this.positions = data.lbReleasePositionListDTOList;
                this.itemNum = data.lbReleasePositionActivityDTO.itemNum;
                if(this.positions.length>0){
                    this.previewUrl=this.positions[0].previewUrl;
                    this.positionId=this.positions[0].id;        
                    this.rawType = this.positions[0].rawType;
                    if(this.rawType == "2"){
                        this.itemIds = this.positions[0].itemIds;
                        this.rawItemCount = this.positions[0].rawItemCount;
                    }
                    dispatch.fire("raw-type",{rawType:this.rawType});
                    this.positionW = parseFloat(this.positions[0].width);
                    this.positionH = parseFloat(this.positions[0].heigh);
                    this.getTextAjax();
                }else {
                        setTimeout(function(){
                            self.showModal=true;
                            dispatch.fire("do-shwomodal");
                        },300);
                }
            },
            changeCopywriteNum(num){
                this.textGroupNum = num;
                this.textModal = false;
            },
            uploadPsd:function(bu,bizName,buConfigId){
                var com = this;
                this.upPsdModal = true;
                com.droppsd.options.params.bu=com.upBu = bu;
                com.droppsd.options.params.bizName=com.upBizName = bizName;
                com.droppsd.options.params.buConfigId=com.upBuConfigId = buConfigId;
            }
        },
        watch:{
            chooseBu:function(){
              this.chooseBizInfo = this.chooseBuInfo[this.chooseBu];
              var chooseBizList = [];
              for(var key in this.chooseBizInfo){
                chooseBizList.push(key);
              }
                this.chooseBizList = chooseBizList||[];
                this.chooseBizName = this.chooseBizList[0]||"";
            },
            chooseBizName:function(){
                var choosePuList = this.chooseBizInfo[this.chooseBizName];
                var newPuList = [];
                for(var i = 0 ; i<choosePuList.length ; i++){
                  var obj = {"name":choosePuList[i].name,"id": String(choosePuList[i].id)}
                  newPuList.push(obj);
                }
                this.choosePuList = newPuList;
                this.choosePuId = this.choosePuList[0].id;
            }
        },
        ready() {
            var com = this;
            var colorSwiper = new Swiper('.colors-group-container', {
                pagination: '.swiper-pagination',
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                slidesPerView: 6,
                spaceBetween: 30
            });
            var imgSwiper = new Swiper('.imgs-group-container', {
                pagination: '.swiper-pagination',
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                slidesPerView: 3,
                spaceBetween: 30
            });
            com.$on('updataHex', function (msg) {
                if(msg&&msg.list.length&&msg.list.length!=0){
                    com.backgroundRawdata = msg;
                    if(com.backgroundRawdata.type == "1"){
                        setTimeout(function(){
                            colorSwiper.update();
                        },0)

                    }else if(com.backgroundRawdata.type == "2"){
                        setTimeout(function(){
                            imgSwiper.update();
                        },0)
                    }
                }else{
                    com.backgroundRawdata = {}
                }
            });

    },
        methods:{

            doShowModal:function(){
                this.showModal = true;
                dispatch.fire("do-shwomodal");
            },
            getBuChoose:function(){
              var self = this;
              var req = {
                type:"bu"
              };
              IO({
                url : "/luban/raw.do?_input_charset=utf8",
                type : "get",
                data : req,
                dataType : "jsonp",
                success : function(res) {
                  console.log(res);
                  if(res.success){
                    var data = res.data;
                    var buList = [];
                    for(var key in data){
                      buList.push(key);
                    }
                    if(buList.length){
                      self.chooseBuList = buList;
                      self.chooseBuInfo = data;
                    }
                  }else{
                    mAlert("获取bu接口出错","danger");
                  }
                },
                error: function() {
                  mAlert("获取bu接口出错","danger");
                }
              },true);



            },
            doUpPsd:function(){
                if(this.canUpPsd){
                    this.droppsd.options.params.itemIds=this.itemIds;
                    this.droppsd.processQueue();
                }    
                
            },
            updatePsdId:function(){
                var self = this;
                IO({
                    url: "/luban/LbReleasePositionScreen.do",
                    type:"get",
                    dataType:"jsonp",

                    data: {
                        type: 'updateitemid',
                        activityId: Env.params.activityId,
                        positionId:self.positionId,
                        itemIds:self.itemIds,
                        _input_charset: 'utf8'
                    },
                    success: function(res) {
                        self.psdIdModal = false;  
                        self.rawItemCount = res.data.rawItemCount;
                        mAlert("更新商品Id成功");
                    },
                    error: function() {
                        mAlert("更新商品Id失败","danger");
                    }
                }); 

            },
            getTextAjax:function(){
                var self = this;
                IO({
                    url: self.textApi,
                    type:"get",
                    dataType:"jsonp",

                    data: {
                        type: 'positionlist',
                        activityId: Env.params.activityId,
                        positionId:self.positionId,
                        _input_charset: 'utf8'
                    },
                    success: function(res) {
                        self.textList = res.data.lbCopywriterListDTOList;
                        self.textGroupNum = res.data.textCount||0;
                        self.textLayer = res.data.textLayer||[];
                    },
                    error: function() {
                        console.log('category io error')
                    }
                },true);
            },
            domakeBanner:function(){
                var com = this;
                if(!com.positions.length){
                    mAlert("至少需要1个模版","danger");
                    return;
                }
                if(!com.textGroupNum&&com.textLayer.length){
                    mAlert("缺少动态文案组,请添加动态文案组","danger");
                    return
                }
                if(!com.itemNum){
                    mAlert("缺少商品,请添加商品","danger");
                    return;
                }
                var totalNum = parseFloat(window.app.$refs.moduleresultshow.totalNum);
                var releaseNum = parseFloat(window.app.$refs.moduleresultshow.releaseNum);
                var itemNum = parseFloat(window.app.$refs.modulectrldetail.itemNum);
                var totle = totalNum+releaseNum;
                if(totle>=itemNum && totle!=0){
                    this.makeBanner();
                }else{
                    if(window.app.$refs && window.app.$refs.loading){
                        window.app.$refs.loading.showLoadingNum();
                        window.app.$refs.loading.initLodingNum("鲁小班正在合图中，请稍后刷新此页面…");
                        this.makeBanner(true);
                        setTimeout(com.countMake,1000);
                    }
                }

            },

            changeColorStyle: function(item){
                var self = this;
                var activityId = Env.params.activityId;
                var list = self.backgroundRawdata.list;
                for(var i= 0;i<list.length;i++){
                    var lo = list[i];
                    lo.choosed =false;
                }
                item.choosed =true;
                var req = {
                    positionId:self.positionId,
                    activityId:activityId,
                    bgId:item.id
                };
                IO({
                    url : "/luban/LbReleasePositionScreen.do?type=updatebg&_input_charset=utf8",
                    type : "get",
                    data : req,
                    dataType : "jsonp",
                    success : function(res) {
                        console.dir(res);
                        if(res.success){
                            self.previewUrl =res.data;
                        }else{
                            mAlert("换色接口错误","danger")
                        }
                    },
                    error: function() {
                        mAlert("换色接口错误","danger");
                    }
                });

            },
            makeBanner:function(hideloading){
                 var activityId = Env.params.activityId;
                 var com = this;
                 var req = {
                          type:"1",
                          activityId:activityId
                        };
                  IO({
                        url : "/luban/LbResultScreen.do?_input_charset=utf8",
                        type : "get",
                        data : req,
                        dataType : "jsonp",
                        success : function(res) {
                          if(res.success){
                              com.loadBanner(com.positionId,hideloading);
                          }else{
                              mAlert("合图请求接口错误","danger")
                          }
                        },
                        error: function() {
                            mAlert("合图请求接口错误","danger")
                        }
                    },hideloading);
            },
            countMake:function (){
                var activityId = Env.params.activityId;
                var com = this;
                var req = {
                    type:"6",
                    activityId:activityId
                };
                IO({
                    url : "/luban/LbResultScreen.do?_input_charset=utf8",
                    type : "get",
                    data : req,
                    dataType : "jsonp",
                    success : function(res) {
                        if(res.success){
                            var data  = res.data;
                            var n = parseFloat(data[0]);
                            var m = parseFloat(data[2]);
                            window.app.$refs.loading.setLodingNum(n+m,n);
                            if(m == 0){
                                com.buckleNum = 0 ;
                                setTimeout(function(){
                                    window.app.$refs.loading.closeLoading();
                                },1000);
                            }else{
                                if(com.buckleNum==m){
                                    if(!com.beginTimer){
                                        com.beginTimer = true;
                                        com.timerout = setTimeout(function(){
                                            mAlert("因等待时间过长，后台默认进行合图工作");
                                            window.app.$refs.loading.closeLoading();
                                            clearTimeout(com.countTimer);
                                            com.beginTimer =false
                                        },8000)
                                    }
                                }else{
                                    clearTimeout(com.timerout);
                                    com.beginTimer =false
                                }
                                com.buckleNum = m;
                                com.countTimer =setTimeout(com.countMake,1000);

                            }
                        }else{
                            window.app.$refs.loading.closeLoading();
                        }
                    },
                    error: function() {
                        window.app.$refs.loading.closeLoading();
                        mAlert("合图出错","danger");
                    }
                },true);
            },
            delete(){
                var com = this;
                 this.$refs.modalmanage.showConfirmModal("确定要删除此模版？",function(){
                     var activityId = Env.params.activityId;
                     var positionId=com.positionId;
                     var req = {
                              type:"3",
                              activityId:activityId,
                              id:positionId
                            };
                      IO({
                            url : "/luban/LbReleasePositionScreen.do?_input_charset=utf8",
                            type : "get",
                            data : req,
                            dataType : "jsonp",
                            success : function(res) {
                              if(res.success){
                                 location.reload();
                              }else{
                                  console.log(res);
                              }
                            },
                            error: function() {
                               console.log("error");
                            }
                        });

                 })   


                 
            },
            loadBanner(positionId){
                var com = this;
                var parent = com.$parent.$parent;
                var moduleResultShow = parent.$refs.moduleresultshow;
                moduleResultShow.loading=true;
                moduleResultShow.loadBanner(positionId,"",true);
            },
            rawClick:function(e,item){

                var target=e.currentTarget;
                var dataId=target.getAttribute("data-id");
                this.positionId=dataId;
                this.rawType = item.rawType;
                if(this.rawType == "2" ){
                    this.itemIds = item.itemIds;
                    this.rawItemCount = item.rawItemCount;
                }

                dispatch.fire("raw-type",{rawType:this.rawType});

                this.positionW = parseFloat(item.width);
                this.positionH = parseFloat(item.heigh);
                this.$emit("changePostionSize",this.positionW,this.positionH);
                var idx=target.getAttribute("data-index");
                this.previewUrl=this.positions[idx].previewUrl;
                this.loadBanner(dataId);
                this.getTextAjax();

            }
        }
    }
</script>