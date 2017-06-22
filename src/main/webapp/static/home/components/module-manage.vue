<template>

    <modal-manage v-ref:modalmanage :positionid = positionId :lablehadchooseid = logoTagId :lablelogotagsize = logoTagSize > </modal-manage>
    <div class="wrap">
        <div class="control-panel">
            <button class="btn btn-default " @click="doShowModal()" >
                <span class="glyphicon glyphicon-plus co_g mr5" aria-hidden="true"></span>添加投放位
            </button>
            <modal :show.sync="showModal" title ="添加投放位" effect="fade" large width="1100px">
                <div slot="modal-body" class="modal-body">
                    <bu-rawmanage ></bu-rawmanage>
                </div>
                <div slot="modal-footer" class="modal-footer">
                </div>
            </modal>
            <modal title="文案管理" :show.sync="textModal" large>
                <div slot="modal-body" class="modal-body text-model-body">
                    <t-textmanage  :text-list="textList"  :positionid='positionId' :previewurl.sync = "previewUrl"  :textlayer="textLayer" ></t-textmanage>
                </div>
                <div slot="modal-footer" class="modal-footer"></div>
            </modal>
        </div>
        <div class="main">
            <modal title="选择模板" :show.sync="upimagesModal" width="500px">
                <div slot="modal-header" class="modal-header hide"></div>
                <div slot="modal-body" class="modal-body text-model-body">
                    <div class="upimgetext">支持格式: JPG PNG &nbsp;|&nbsp;尺寸要求: 700*200</div>
                    <div class="upimge">
                        <form action="/file-upload" class="dropzone" enctype="multipart/form-data" id="upimages-dropzone">
                        </form>
                    </div>
                </div>
                <div slot="modal-footer" class="modal-footer">
                    <button type="button" class="btn btn-default" @click='upimagesModal = false'>关闭</button>
                </div>
            </modal>
            <modal title="上传psd" :show.sync="upPsdModal" width="500px">
                <div slot="modal-header" class="modal-header hide"></div>
                <div slot="modal-body" class="modal-body text-model-body uppsd-modal-body">
                    <div class="upimgetext">支持格式: psd </div>
                    <div class="upimge">
                        <form action="/file-upload" class="dropzone" enctype="multipart/form-data" id="uppsd-dropzone">
                        </form>
                    </div>
                    <div class="upPsd-id">

                        <div class="form-group">
                            <label >模版名称</label>
                            <input type="text" class="form-control" id="customModalName" value = "" v-model="customModalName">
                        </div>
                        <p> 填写商品ID(选项，用于个性化推荐)</p>
                        <div>
                            <textarea  v-model="itemIds"  placeholder="填写商品ID,多个以逗号分开"></textarea>
                        </div> 
                    </div>
                    <div class="upPsd-btn btn " :class = {'upPsd-btn-success':canUpPsd}  @click="doUpPsd">提交</div>

                </div>
                <div slot="modal-footer" class="modal-footer hide">
                    <button type="button" class="btn btn-default" @click='upPsdModal = false'>关闭</button>
                </div>
            </modal>


            <modal title="填写商品ID(选项，用于个性化推荐)" :show.sync="psdIdModal" width="500px">
                <div slot="modal-body" class="modal-body text-model-body uppsd-modal-body">
                    <div class="upPsd-id">
                        <div>
                            <textarea  v-model="itemIds"  placeholder="填写商品ID,多个以逗号分开"></textarea>
                        </div> 
                    </div>
                    <div class="upPsd-btn btn upPsd-btn-success"  @click="updatePsdId">提交</div>
                </div>
                <div slot="modal-footer" class="modal-footer hide">
                    <button type="button" class="btn btn-default" @click='upPsdModal = false'>关闭</button>
                </div>
            </modal>



            <modal  :show.sync="chooseAllBgModal" effect="fade">
                <div slot="modal-header" class="modal-header hide"></div>
                <div slot="modal-body" class="modal-body">
                    <div class = "choose-bg-modal">
                        <div class="mt15">
                            选择投放风格 <span class="ml5">共<span class="co_b">10</span>种</span>
                        </div>
                        <div class = "allbg-contents">
                            <div class="bgitem  choosed-status"></div>
                            <div class="bgitem "></div>
                            <div class="bgitem rightitem"></div>
                            <div class="bgitem "></div>
                            <div class="bgitem "></div>
                            <div class="bgitem rightitem"></div>
                            <div class="bgitem "></div>
                            <div class="bgitem "></div>
                            <div class="bgitem rightitem"></div>
                            <div class="bgitem "></div>
                            <div class="bgitem "></div>
                            <div class="bgitem rightitem"></div>
                            <div class="bgitem "></div>
                            <div class="bgitem "></div>
                            <div class="bgitem rightitem"></div>
                            <div class="bgitem "></div>
                            <div class="bgitem "></div>
                            <div class="bgitem rightitem"></div>
                        </div>
                        <div class="mt20 t-c">
                            <button class="btn btn-large btn-primary go-to-choose">确定使用</button>
                        </div>
                    </div>
                </div>
                <div slot="modal-footer"  class="modal-footer hide"></div>
            </modal>


            <div class="size-shown">
                <div class="btn-group" role="group" aria-label="">
                  <button v-for="position  in positions " data-id="{{position.id}}" data-index="{{$index}}" type="button" class="btn btn-default btn-size" :class="{'active': positionId == position.id}" @click='rawClick($event,position)'><p>{{position.rawdataName}}</p><p>{{position.size}}</p></button>
                </div>
            </div>
            <div class="row" v-show="showBox">
                <div class="col-xs-6 col-md-12 banner-current-wrapper">

                    <div class="banner-box">
                        <div class="banner-op">
                            <div v-show = "rawType == '1'&&textLayer.length!=0" class="edit-text text-box mr15" @click="editTextMange">
                                <span class="glyphicon glyphicon-edit"></span>
                                 <span>编辑文案</span>
                                <span class = "text-tip-icon">{{textGroupNum}}</span>
                            </div>
                             <div v-show = "rawType == '2'" class=" text-box mr15" @click="psdIdModal = true" >
                                <span class="glyphicon  glyphicon-pencil"></span>
                                 <span>编辑宝贝id</span>
                                <span class = "text-tip-icon" >{{rawItemCount}}</span>
                            </div>

                            <div v-show = "rawType == '1'&&previewUrl&& previewUrl.length>0" class=" text-box mr15" @click="showEditIconModal" >
                                <span class="glyphicon  glyphicon-pencil"></span>
                                 <span>编辑业务标签</span>
                            </div>
                            <div class=" text-box mr15"  @click="delete" v-show="previewUrl&& previewUrl.length>0">
                                <span class="glyphicon  glyphicon-trash"></span>
                                <span >删除模版</span>
                            </div>
                        </div>
                        <div class=" banner-current" v-bind:class="{'h300':(positionW<positionH&&positionH>300)}">
                            <div class="op-lable" @click="dellogoTag" :class="{'op-lable-target':logoTagId}">
                                <span class="glyphicon  glyphicon-trash"></span>
                                <span >删除标签</span>
                            </div>

                            <img v-if="previewUrl&& previewUrl.length == 0" class="thumbnail-imgeW"  src="http://gw.alicdn.com/mt/TB1CsDrMpXXXXcQXVXXXXXXXXXX-600-180.png" />
                                <img v-if="previewUrl&& previewUrl.length>0"    v-bind:class="{'thumbnail-imgeW': (positionW>=positionH&&positionW>600),'thumbnail-imgeH':(positionW<positionH&&positionH>300)}"  v-bind:src="previewUrl"/>
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="backgroundRawdata&&backgroundRawdata.list&&backgroundRawdata.list.length>1">
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
                <button class="btn btn-large  btn-primary go-to-result"  v-bind:class="{'go-to-success': positions.length&&itemNum&&((textGroupNum&&textLayer.length)||!textLayer.length)}"  v-show="showBox"  @click='domakeBanner'>立即生成素材</button>
                <a href="javascript:void(0);" class="J_hide" @click='toggle'>
                    <template v-if="!showBox">
                        展开
                    </template>
                    <template v-else>
                        收起  
                    </template>
                </a>
            </div>
        </div>
    </div>
</template>
<style lang='sass' >
    .tip-box-warp {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-box-pack: center;
    width: 108px;
    -webkit-box-align: center;
    text-align: center;
    .tipbox {
        position: relative;
        width: 40px;
        .icon {
            width: 40px;
            height: 40px;
            .mt10 {
                margin-top: 10px;
            }
            .mt5 {
                margin-top: 5px;
            }
        }
    }
}
.choose-bg-modal {
    padding: 20px;
    .allbg-contents {
        height: 400px;
        overflow-x: hidden;
        overflow-y: auto;
        width: 558px;
        .bgitem {
            background: red;
            width: 160px;
            height: 70px;
            margin-bottom: 20px;
            float: left;
            margin-right: 30px;
            border: 3px solid transparent;
        }
        .rightitem {
            margin-right: 0px;
        }
    }
    .go-to-choose {
        padding: 10px 20px;
        background: #49B7FB;
        border: none;
        border-radius: 30px;
        font-size: 18px;
        margin: auto;
    }
}




.wrap {
    display: flex;
    width: 100%;
    margin-bottom: 20px;
}

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
    .swiper-wrapper {}
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
    .swiper-slide {}
}
.main {
    display: block;
    flex: 10;
    background: #F9FAFC;
    .size-shown {
        width: 100%;
        text-align: center;
        .btn-size {
            p {
                height: 20px;
                line-height: 20px;
                margin: 0;
                padding: 0;
            }
        }
    }

    .thumbnail-imgeW {
        width: 100% !important;
    }
    .thumbnail-imgeH {
        height: 100% !important;
    }

    .thumbnail-imge {
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: 50%;
    }

    .h300 {
        height: 300px;
    }
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
            .op-lable{
                position: absolute;
                display: none;
                left: 0px;
                top:0px;
                width: 100px;
                height: 30px;
                line-height: 30px;
                background: rgba(0,0,0,0.5);
                border-radius: 3px;
                color: #fff;
            }
        }
        .banner-current:hover{
            .op-lable-target{
                display: block;
            }
        }
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

.modal-header {
    .close-btn {
        position: absolute;
        top: 10px;
        right: 10px;
    }
}
.modal-body {
    padding: 0;
}
.bgcolor-info {
    position: absolute;
    left: 13%;
    top: 100px;
    z-index: 100;
}

.upimgetext {
    padding: 10px;
    height: 50px;
    line-height: 36px;
    color: #666;
    font-size: 16px;
}

.uppsd-modal-body{
    padding: 0px 20px;
}

.upPsd-btn{
    display: inherit;
    width: 100px;
    margin: 20px auto;
    color: #666;
    background-color: #eeeeee;

}
.upPsd-btn-success{
    color: #fff;
    background-color: #49B7FB;

}
.upPsd-id{
    font-size: 16px;
    color: #666;
    textarea{
        margin-top: 10px;
        width: 100%;
        padding: 10px;
        height: 100px;
        border: 1px solid #e5e5e5;
        text-align: left;
    }
}
.upimge {
    position: relative;
    form {
        font-size: 19px;
        border: 1px dashed #e5e5e5;
        margin-bottom: 20px;
    }
    .dropzone .dz-default.dz-message {
        margin-left: 0px;
        margin-top: 0px;
        top: 0%;
        left: 0%;
        position: relative;
    }
}
</style>
<script>
    var utils = require('../common/js/utils.js');
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
                showBox : true,
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
                chooseBuList:["手淘","天猫"],
                chooseBuInfo:{},
                chooseBizName:"",
                chooseBizList:["首页","淘宝头条"],
                chooseBizInfo:{},
                choosePuId:"",
                choosePuList:[{"name":"手淘","id":"1222"}],
                logoTagId:"",
                logoTagSize:2,
                customModalName:"",
                positionItem:null
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
                    this.logoTagId = this.positions[0].logoTagId;
                    this.logoTagSize = this.positions[0].logoTagSize;
                    if(this.rawType == "2"){
                        this.itemIds = this.positions[0].itemIds;
                        this.rawItemCount = this.positions[0].rawItemCount;

                    }
                    dispatch.fire("raw-type",{rawType:this.rawType});
                    this.positionW = parseFloat(this.positions[0].width);
                    this.positionH = parseFloat(this.positions[0].heigh);
                    this.positionItem = this.positions[0];
                    this.getTextAjax();
                }else {
                        setTimeout(function(){
                            self.showModal=true;
                            dispatch.fire("do-shwomodal");
                        },300);
                }
            },
            changeCopywriteNum(num,noCloseModal){
                this.textGroupNum = num;
                if(!noCloseModal){
                    this.textModal = false;
                }
            },

            /*uploadPsd:function(bu,bizName,buConfigId){
                var com  = this;
                this.upPsdModal = true;
                com.itemIds = "";
                com.customModalName =bu+bizName+"自定义模版";
                com.droppsd.options.params.bu=com.upBu = bu;
                com.droppsd.options.params.bizName=com.upBizName = bizName;
                com.droppsd.options.params.buConfigId=com.upBuConfigId = buConfigId;
            }*/
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
            dispatch.on("add-lable",function(obj){
                var previewUrl = obj.res.data.previewUrl;
                var logoTagId = obj.logoTagId;
                com.updataLogoTag(logoTagId,previewUrl);

            })
            dispatch.on("del-lable",function(obj){
                var previewUrl = obj.res.data.previewUrl;
                com.updataLogoTag("",previewUrl);
            })

            dispatch.on("cm-modle-show-uploadPsd",function(obj){
                var currentChooseItem = obj.currentChooseItem;
                com.upPsdModal = true;
                com.itemIds = "";
                com.customModalName =currentChooseItem.bu+ currentChooseItem.biz+ currentChooseItem.name+"自定义模版";
                com.droppsd.options.params.bu=com.upBu = currentChooseItem.bu;
                com.droppsd.options.params.bizName=com.upBizName = currentChooseItem.biz;
                com.droppsd.options.params.buConfigId=com.upBuConfigId = obj.buConfigId;
            })
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

            var dropz = new Dropzone("#upimages-dropzone", {
                        url: "/luban/file.do",
                        addRemoveLinks: true,
                        dictDefaultMessage:"请在此区域上传图片(支持拖拽)",
                        acceptedFiles: ".png,.jpg,.jpeg",
                        maxFilesize:5,
                        uploadMultiple:true,
                        paramName:"file",
                        params:{
                            type:"picupload"
                        },
                        maxFiles:10
             });
            dropz.on("error", function(file,message) {
                mAlert(message,"danger");
            });
            dropz.on("success", function(file,res) {
                var res = JSON.parse(res);
                if(res.success){
                    console.dir("success");
                    var dataUrls = res.data;
                    console.dir(dataUrls);
                    mAlert("上传成功");
                }else{
                    mAlert("上传失败","danger");
                }
            });
             var droppsd = com.droppsd = new Dropzone("#uppsd-dropzone", {
                     url:utils.hostName + "/luban/Raw.do?_input_charset=utf8",
                     addRemoveLinks: true,
                     acceptedFiles: ".psd",
                     maxFilesize:80,
                     uploadMultiple:false,
                     autoProcessQueue: false,
                     paramName:"psd_file",
                     parallelUploads:1,
                     maxFiles:1,
                     params:{
                         type:"xbupload",
                         _input_charset:'utf8',
                         bu:com.upBu,
                         bizName:com.upBizName,
                         buConfigId:com.upBuConfigId,
                         itemIds:com.itemIds,
                         name:com.customModalName,
                         activityId:Env.params.activityId
                     },
             });
            droppsd.on("error", function(file,message) {
                mAlert(message,"danger");
            });
            droppsd.on("addedfile", function(file,message) {
                    var len = droppsd.getAcceptedFiles().length;
                    if(len == 0){
                        com.canUpPsd = true;
                        mAlert("文件添加成功");
                    }
                
            });
            droppsd.on("removedfile", function(file,message) {
                console.dir(droppsd.getAcceptedFiles().length);
                var len = droppsd.getAcceptedFiles().length;
                if(len == 0){
                    com.canUpPsd = false;
                }
            });
 
            

            /*addedfile*/
            droppsd.on("success", function(file,res) {
                var res = JSON.parse(res);
                if(res.success){
                    var dataUrls = res.data;
                    dispatch.fire('updatateplist')
                    com.upPsdModal = false;
                    mAlert("上传成功");
                }else{
                    var msg = res.errorMsg||"上次失败";
                    mAlert(res.errorMsg,"danger");
                }
            });
            //this.getBuChoose();
    },
        methods:{
            toggle: function() {
                var com = this;
                com.showBox = !com.showBox;
            },
            doShowModal:function(){
                this.showModal = true;
                dispatch.fire("do-shwomodal");
            },
            editTextMange:function(){
                this.textModal = true;
                this.getTextAjax();
            },
            showEditIconModal:function(){
                this.$refs.modalmanage.showEditIconModal();
            },
            dellogoTag:function(){
                this.$refs.modalmanage.cancleLableBtn();
            },
/*
*/
/*          getBuChoose:function(){
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
            },*/
            doUpPsd:function(){
                if(this.canUpPsd){
                    this.droppsd.options.params.itemIds=this.itemIds;
                    this.droppsd.options.params.name=this.customModalName;
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
                        self.positionItem.itemIds = res.data.itemIds;
                        self.positionItem.rawItemCount = res.data.rawItemCount;
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
            updataLogoTag:function(logoTagId,previewUrl){
                this.positionItem.logoTagId=this.logoTagId = logoTagId;
                this.positionItem.previewUrl = this.previewUrl = previewUrl
                this.loadBanner(this.positionId);
            },
            rawClick:function(e,item){
                var target=e.currentTarget;
/*
                item = item||this.positionItem;
*/
                var dataId=target.getAttribute("data-id");
                this.positionId=dataId;
                this.rawType = item.rawType;
                this.logoTagId = item.logoTagId;
                this.logoTagSize = item.logoTagSize;
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
                this.positionItem = item;
            }
        }
    }
</script>