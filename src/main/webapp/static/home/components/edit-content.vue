
<style lang="sass" scoped>
.tip-box-warp {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-box-pack: center;
    width: 80px;
    -webkit-box-align: center;
    text-align: center;
    .tipbox {
        position: relative;
        width: 40px;
        .icon {
            width: 40px;
            height: 40px;
            background: red;
        }
        .tip-icon {
            position: absolute;
            min-width: 10px;
            border-radius: 10px;
            background: green;
            right: -30%;
            top: -5px;
            padding: 0 5px;
            color: white;
        }
    }
}

.upimgetext {
    padding: 10px;
    height: 50px;
    line-height: 36px;
    color: #666;
    font-size: 16px;
}

.upimge {
    position: relative;
    form {
        font-size: 19px;
        border: none;
        border-top: 1px solid #e5e5e5;
    }
    .dropzone .dz-default.dz-message {
        margin-left: 0px;
        margin-top: 0px;
        top: 0%;
        left: 0%;
        position: relative;
    }
}

.content-box {
    position: relative;
    background: #FFFFFF;
    display: flex;
    justify-content: space-between;
    .box-left {
        width: 252px;
        border-right: 1px solid #E1E6ED;
        border-left: 1px solid #E1E6Ed;
        min-height: 650px;
        .left-width {
            width: 250px;
        }
        .addLayerBoard {
            top: 35px;
            left: 210px;
        }
        .open + .addLayerBoard {
            display: block;
        }
    }
    .l-layer-board {
        background: #f9fafc;
        height: 40px;
        padding: 0px 8px;
        border-bottom: 1px solid #E1E6ED;
    }
    .alignChoosed {
        color: red;
    }
    .layer-board-ul {
        min-height: 120px;
        max-height: 350px;
        overflow-y: auto;
        width: 250px;
        .treeli {
            min-height: 35px;
            padding: 0px 13px;
            /*
            width: 250px;
    */
            flex: 1;
        }
        .file {
            .fileicon {
                margin-left: -13px;
                margin-right: -3px;
            }
            .treeliwarp {
                display: none;
            }
        }
        .file {
            .open + .treeliwarp {
                display: block;
            }
        }
        .hovertreeli:hover {
            background: #ceecff;
        }
    }
    .box {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .box-center {
        position: relative;
        background-color: #f9fafc;
        flex: 1;
        overflow: auto;
    }
    .box-right {
        width: 302px;
        border-right: 1px solid #E1E6ED;
        border-left: 1px solid #E1E6Ed;
        .right-width {
            width: 300px;
        }
    }
    .p-board {
        padding: 15px 0px !important;
    }
    .right-board {
        padding: 15px;
        text-align: left;
        .firstmo {
            .colortextname {
                display: none;
            }
        }
        .attr-tip {
            color: #e0e0e0;
            text-align: center;
        }
        .col-board {
            height: 50px;
            padding: 0px 15px;
        }
        .addsoild-bottom {
            border-bottom: 1px solid #eee;
        }
        .addgroupwarp {
            border-bottom: 1px dashed #eee;
            padding: 10px 15px 15px 15px;
            /*display: flex;
    justify-content: space-around;*/
        }
        .bgclorgroup:hover {
            background: #ceecff;
            /*
                border-bottom: 1px dashed #eee;
    */
        }
        .addcolorgroupbtn {
            width: 90px;
            height: 25px;
            border-radius: 5px;
            line-height: 25px;
            text-align: center;
            color: #ffffff;
            margin: auto;
            background-color: #97beff;
        }
        .bgclorgroup {
            display: flex;
            align-items: center;
            padding: 10px 15px;
            .bgclorgroupitem {
                flex: 1;
                overflow: hidden;
                .bgitem {
                    float: left;
                }
            }
            .color-group-name {
                width: 37px;
                font-size: 10px;
                color: #737373;
            }
            .color-group {
                font-size: 10px;
                text-align: center;
                color: #666666;
            }
            .chooseColor {
                width: 42px;
                height: 31px;
                border: 2px solid #49b7fb;
                margin: auto;
            }
            .chooseImage {
                width: 210px;
                height: 70px;
            }
            .delcolorgroup {
                color: #70c7fc;
            }
        }
        .bgimagesgroup {
            padding: 10px 3px;
            .text-item {
                margin-right: 5px;
            }
            .delImgGroupWarp {
                width: 30px;
            }
        }
    }
    .w94 {
        width: 94px;
    }
    .w210 {
        width: 210px;
    }
    .w30 {
        width: 30px;
    }
    .w40 {
        width: 40px;
    }
    .w60 {
        width: 60px;
    }
    .w65 {
        width: 65px;
    }
    .w70 {
        width: 70px;
    }
    .draw-bg {
        position: relative;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin: auto;
        overflow: hidden;
        transform-origin: 0% 0%;
        -ms-transform-origin: 0% 0%;
        /* IE 9 */
        -webkit-transform-origin: 0% 0%;
        /* Safari 和 Chrome */
        -moz-transform-origin: 0% 0%;
        /* Firefox */
        -o-transform-origin: 0% 0%;
    }
    .draw-item {
        .resize {
            position: absolute;
            width: 8px;
            height: 8px;
            display: none;
            border-radius: 100%;
            border: 1px solid red;
            background-color: #ffffff;
        }
        .resizeCL {
            top: 50%;
            left: -4px;
            cursor: ew-resize;
        }
        .resizeCR {
            top: 50%;
            right: -4px;
            cursor: ew-resize;
        }
        .resizeCT {
            top: -4px;
            left: 50%;
            cursor: ns-resize;
        }
        .resizeCB {
            bottom: -4px;
            left: 50%;
            cursor: ns-resize;
        }
        .resizeLT {
            top: -4px;
            left: -4px;
            cursor: nwse-resize;
        }
        .resizeTR {
            top: -4px;
            right: -4px;
            cursor: nesw-resize;
        }
        .resizeBR {
            bottom: -4px;
            right: -4px;
            cursor: nwse-resize;
        }
        .resizeLB {
            bottom: -4px;
            left: -4px;
            cursor: nesw-resize;
        }
    }
    .itemchoosed {
        background: #ceecff;
    }
    .drawitemchoosed {
        border: 1px solid red !important;
        .resize {
            display: block;
        }
    }
}

.pick-select {
    .btn-default {
        width: 150px;
    }
    .btn-group {
        margin-left: -5px;
    }
}
.bs-example {
    margin-top:20px;
}
.radio-warp{
    position:relative;
    margin-top:30px;
    min-height:20px;
    width:100%;
    padding:10px;
}
.radio-item{
    float:left;
    line-height:30px;
    
}
</style>

<template>
    <modal  class ="" title="选择模板" :show.sync="upimagesModal" width="50%">
        <div slot="modal-header" class="modal-header hide"></div>
        <div slot="modal-body" class="modal-body text-model-body">
            <div class="upimgetext">支持格式: JPG PNG &nbsp;|&nbsp;尺寸要求: {{bgWidthText}}*{{bgHeightText}}</div>
            <div class="upimge">
                <form action="/file-upload" class="dropzone edit-dropzone" enctype="multipart/form-data"  >
                </form>
            </div>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default" @click='upimagesModal = false'>关闭</button>
        </div>
    </modal>
    <div class="content-box">
        <div class="box-left" v-show="showleftbox">
            <div class="l-layer-board box left-width" ><span>图层</span>
                <div>
                    <span slot="span"  @click = "addLayer" class="glyphicon glyphicon-plus" v-bind:class="{ 'open': showAddLayerBoard}"  data-toggle="dropdown"></span>
                    <ul name="dropdown-menu" class="dropdown-menu addLayerBoard">
                        <li @click = "createLayer(1)"><a href="javaScript:void(0)"> <span class=" glyphicon glyphicon-shopping-cart"></span> 动态商品位 </a> </li>
                        <li @click = "createLayer(2)"><a href='javaScript:void(0)'> <span class=" glyphicon glyphicon-font"></span> 动态投放文案 </a> </li>
                        <li @click = "createLayer(3)"><a href="javaScript:void(0)"> <span class=" glyphicon glyphicon-picture"></span> 静态图片 </a> </li>
                        <li @click = "createLayer(4)"><a href="javaScript:void(0)"> <span class=" glyphicon glyphicon-file"></span> 静态文本 </a> </li>
                    </ul>
                </div>
            </div>
            <ul id="root-sortable-body" class="layer-board-ul">
                <li class="box treeli" v-for="item in layerTreesList" v-bind:class="{ 'itemchoosed': item.choosedStatus,hovertreeli:item.type !='file'}" @click = "treeChooseLayer(item)" >
                    <div v-if = "item.type ==1" ><span  class=" glyphicon  glyphicon-shopping-cart"></span> <span>动态商品位</span> </div>
                    <div v-if = "item.type ==2" ><span  class=" glyphicon glyphicon-font"></span> <span v-text="(item.textkindZH)?('动态文案 ('+item.textkindZH+')'):'动态文案'"></span> </div>
                    <div v-if = "item.type ==3"><span  class=" glyphicon glyphicon-picture"></span> <span>静态图片</span> </div>
                    <div v-if = "item.type ==4"><span  class=" glyphicon glyphicon-file"></span> <span>静态文本</span> </div>
                    <ul v-if = "item.type =='file'" class="flex1 file ">
                        <div v-bind:class="{'open': item.openStatus}" @click="turnfile(item)"><span class="fz10 fileicon glyphicon glyphicon-triangle-right scale06"  v-bind:class="{'glyphicon-triangle-bottom': item.openStatus}" > </span>  <span  class=" glyphicon glyphicon co_b glyphicon-folder-open"  ></span > <span v-text="item.fileName"> </span> </div>
                        <div class="treeliwarp sub-sortable-body">
                            <li class = "box treeli" v-for="children in item.children" v-bind:parentIndex= (item&&item.index)||0 v-bind:class="{'itemchoosed': children.choosedStatus,hovertreeli:children.type !='file'}" @click = "treeChooseLayer(children)">
                                <div v-if = "children.type ==1" ><span class=" glyphicon  glyphicon-shopping-cart"></span> <span>动态商品位</span> </div>
                                <div v-if = "children.type ==2" ><span class=" glyphicon glyphicon-font"></span> <span  v-text="(children.textkindZH)?('动态文案 ('+children.textkindZH+')'):'动态文案'"></span> </div>
                                <div v-if = "children.type ==3"><span  class=" glyphicon glyphicon-picture"></span> <span>静态图片</span> </div>
                                <div v-if = "children.type ==4"><span  class=" glyphicon glyphicon-file"></span> <span>静态文本</span> </div>
                                <span  @click = "delChildrenLayer(children)" class="glyphicon glyphicon-trash"></span>
                            </li>
                        </div>
                    </ul>
                    <span v-show =  "item.type !='file'" @click = "delLayer(item)" class=" glyphicon glyphicon-trash"></span>

                </li>
            </ul>

            <div class="l-layer-board box left-width" ><span>底图</span> </div>
            <ul class="layer-board-ul ">
                <li class="box treeli" v-bind:class="{ 'itemchoosed': bgChoosedStatus}"  @click = "bglayerChoosed" > <div> <span>背景设置</span> </div>    </li>
            </ul>
        </div>
        <div id="box-center" v-show="showcontentbox" class="box-center">
            <div id = "draw-bg" class="draw-bg" v-bind:style="bgObjCss">
                <template  v-for="item in layerList">
                    <div   class = "draw-item" v-bindele =item v-bind:class="{ 'drawitemchoosed': item.choosedStatus}" @mousedown = "doDrag(item,$event,$index)"  v-if = "item.type ==1||item.type ==3"  v-bind:style="item.cssStyle" >
                        <div v-show="allresize" @mousedown="doResize(item,$event,true, false, false, true)" class="resize resizeCL"></div>
                        <div v-show="allresize" @mousedown="doResize(item,$event,false, true, true, false)" class="resize resizeCT"></div>
                        <div v-show="allresize" @mousedown="doResize(item,$event,false, false, false, true)" class="resize resizeCR"></div>
                        <div v-show="allresize" @mousedown="doResize(item,$event,false, false, true, false)" class="resize resizeCB"></div>
                        <div @mousedown="doResize(item,$event,true, true, false, false)" class="resize resizeLT"></div>
                        <div @mousedown="doResize(item,$event,false, true, false, false)" class="resize resizeTR"></div>
                        <div @mousedown="doResize(item,$event,false, false, false, false)" class="resize resizeBR"></div>
                        <div @mousedown="doResize(item,$event,true, false, false, false)" class="resize resizeLB"></div>
                    </div>
                    <div class = "draw-item" v-bindele = item  v-bind:class="{ 'drawitemchoosed': item.choosedStatus}"  @mousedown = "doDrag(item,$event,$index)"   v-if = "item.type ==2||item.type ==4" v-bind:style="item.cssStyle" >
                        {{item.text}}
                    </div>
                </template>
            </div>
             
            <div class="radio-warp" v-show="showLables">
                <div>
                    <p>
                        <span>背景 －</span>
                        <input type="radio"  class="inline m0 mr5" id="BackImage" value= "BackImage" v-model="lableRadioValue">
                        <label for="BackImage">背景图像</label>
                        <input type="radio" id="BackGraph"  class="inline m0 mr5" value= "BackGraph" v-model="lableRadioValue">
                        <label for="BackGraph">人造背景图形</label>
                    </p>
                    <p>
                        <span>主体 －</span>
                        <input type="radio" id="MajorAuction" class="inline m0 mr5" value= "MajorAuction" v-model="lableRadioValue">
                        <label for="MajorAuction">商品</label>
                        <input type="radio" id="MajorModel" class="inline m0 mr5" value= "MajorModel" v-model="lableRadioValue">
                        <label for="MajorModel">模特</label>
                        <input type="radio"  id="MajorAssist" class="inline m0 mr5" value= "MajorAssist" v-model="lableRadioValue">
                        <label for="MajorAssist">辅助品</label>
                    </p>
                    <p>
                        <span>文案 －</span>
                        <input type="radio"  id="MainTitle" class="inline m0 mr5" name="MainTitle" value= "MainTitle" v-model="lableRadioValue">
                        <label for="MainTitle">主文案</label>
                        <input type="radio" id="SubTitle" class="inline m0 mr5" value= "SubTitle" v-model="lableRadioValue">
                        <label for="SubTitle">副文案</label>
                        <input type="radio"   class="inline m0 mr5" id="ExtraTitle" value= "ExtraTitle" v-model="lableRadioValue">
                        <label for="ExtraTitle">额外文案</label>
                    </p>
                    <p>
                        <span>高亮 －</span>
                        <input type="radio"  class="inline m0 mr5" id="HighPromotion" value= "HighPromotion" v-model="lableRadioValue">
                        <label for="HighPromotion">促销高亮</label>
                        <input type="radio"  class="inline m0 mr5" id="HighLogo" value= "HighLogo" v-model="lableRadioValue">
                        <label for="HighLogo">logo</label>
                    </p>
                    <p>
                        <span>修饰 －</span>
                        <input type="radio"  class="inline m0 mr5" id="DecoRegion" value= "DecoRegion" v-model="lableRadioValue">
                        <label for="DecoRegion">区域修饰</label>
                        <input type="radio"  class="inline m0 mr5" id="DecoPieces" value= "DecoPieces" v-model="lableRadioValue">
                        <label for="DecoPieces">小修饰</label>
                        <input type="radio"  class="inline m0 mr5" id="DecoBack" value= "DecoBack" v-model="lableRadioValue">
                        <label for="DecoBack">背景修饰</label>
                        <input type="radio"  class="inline m0 mr5" id="DecoMajor" value= "DecoMajor" v-model="lableRadioValue">
                        <label for="DecoMajor">主体修饰</label>
                        <input type="radio"  class="inline m0 mr5" id="DecoChar" value= "DecoChar" v-model="lableRadioValue">
                        <label for="DecoChar">文字修饰</label>
                        <input type="radio"  class="inline m0 mr5" id="DecoHigh" value= "DecoHigh" v-model="lableRadioValue">
                        <label for="DecoHigh">高亮修饰</label>
                    </p>

                    <p>
                        <span>蒙板 －</span>
                        <input type="radio"  class="inline m0 mr5" id="MaskBack" value= "MaskBack" v-model="lableRadioValue">
                        <label for="MaskBack">背景蒙板</label>
                        <input type="radio"  class="inline m0 mr5" id="MaskMajor" value= "MaskMajor" v-model="lableRadioValue">
                        <label for="MaskMajor">主体蒙板</label>
                        <input type="radio"  class="inline m0 mr5" id="MaskChar" value= "MaskChar" v-model="lableRadioValue">
                        <label for="MaskChar">文字蒙板</label>
                        <input type="radio"  class="inline m0 mr5" id="MaskHigh" value= "MaskHigh" v-model="lableRadioValue">
                        <label for="MaskHigh">高亮蒙板</label>
                    </p>


                </div>



                        

            </div>

                

        </div>
        <div class="box-right" v-show="showrightbox">
            <div v-show= 'showTextAttrBoard && !bgChoosedStatus'>
                <div class="l-layer-board box right-width" ><span>文案</span>
                </div>
                <div class="right-board bb1">
                    <div class="box ">
                        <div class="form-inline "><span class = "w40 inline-block"> 位置 </span> <input v-model="textXText"    type="number" class="form-control  w94 mr10" >  <input v-model="textYText"  type="number" class="form-control  w94" ></div>
                    </div>
                    <div><span class = "mt15 w40 inline-block mt15">  </span> <span class = "w94 inline-block attr-tip mr10"> x </span>  <span class = "w94 inline-block attr-tip"> y </span>   </div>
                </div>
                <div class="right-board bb1">
                    <div class="box mt15">
                        <div class="form-inline"><span class = "w40 inline-block"> 字体 </span>
                            <div class="inline-block pick-select ">
                                <v-select    :value.sync="familyText" >
                                    <v-option  value="方正兰亭黑">方正兰亭黑</v-option>
                                    <v-option  value="方正兰亭中黑">方正兰亭中黑</v-option>
                                    <v-option  value="方正兰亭粗黑">方正兰亭粗黑</v-option>
                                    <v-option  value="方正兰亭纤黑">方正兰亭纤黑</v-option>
                                    <v-option  value="方正粗黑宋简体">方正粗黑宋简体</v-option>
                                    <v-option  value="方正宋刻本秀楷">方正宋刻本秀楷</v-option>
                                    <v-option  value="方正正粗黑简体">方正正粗黑简体</v-option>
                                    <v-option  value="方正清刻本悦宋体">方正清刻本悦宋体</v-option>
                                    <v-option  value="方正特粗光辉简体">方正特粗光辉简体</v-option>
                                    <v-option  value="方正风雅宋">方正风雅宋</v-option>
                                    <v-option  value="方正正大黑简体">方正正大黑简体</v-option>
                                    <v-option  value="方正藏体简体">方正藏体简体</v-option>
                                    <v-option  value="方正中雅宋">方正中雅宋</v-option>
                                    <v-option  value="方正汉真广标简体">方正汉真广标简体</v-option>
                                    <v-option  value="方正正黑简体">方正正黑简体</v-option>
                                </v-select>
                            </div>
                        </div>
                    </div>
                    <div class="box ">
                        <div class="form-inline"><span class = "w40 inline-block"> 字号 </span><input  v-model="textSizeText"  value=""  type="number" class="form-control  w94" > </div>
                    </div>
                </div>
                <div class="right-board ">

                    <div class="box ">
                        <div class="form-inline"><span class = "w40 inline-block"> 颜色 </span><input  v-model="textColorText" value=" " class="jscolor form-control  w94" > </div>
                    </div>

                </div>
                <div class="l-layer-board box right-width" v-show = "choosedlayer && choosedlayer.type== '4'"><span>静态文案内容</span></div>
                <div class="right-board ">
                    <div class="box" v-show = "choosedlayer && choosedlayer.type== '4'">
                        <div class="form-inline"><span class = "w40 inline-block"> 内容 </span><input v-model="textContentText"  value=" " type="text" class="form-control  w210" > </div>
                    </div>
                </div>
                <div class="l-layer-board box right-width" ><span>规则设定</span></div>
                <div class="right-board">

                    <div class="box mt15">
                        <div class="form-inline"><span class = "w65 inline-block"> 文本对齐 </span>
                            <div class="inline-block ">
                                <v-select   placeholder = '请选择' :value.sync="textAlign" >
                                    <v-option  value="-1">左对齐</v-option>
                                    <v-option  value="3">居中</v-option>
                                    <v-option  value="1">右对齐</v-option>
                                </v-select>
                            </div>
                        </div>
                    </div>
                    <div class="box mt15">
                        <div class="form-inline"><span class = "w65 inline-block"> 文本类型 </span>
                            <div class="inline-block ">
                                <v-select   placeholder = '请选择' :value.sync="textType" >
                                    <v-option  value="2">动态文本</v-option>
                                    <v-option  value="4">静态文本</v-option>
                                </v-select>
                            </div>
                        </div>
                    </div>


                    <div class="box mt15" v-show="textType==2">
                        <div class="form-inline"><span class = "w65 inline-block"> 文本种类 </span>
                            <div class="inline-block ">
                                <v-select   placeholder = '请选择' :value.sync="textKind" >
                                    <v-option  value="1">主文案</v-option>
                                    <v-option  value="2">副文案</v-option>
                                </v-select>
                            </div>
                        </div>
                    </div>

                    <div class="box mt15" v-show="textType==2">
                        <div class="form-inline"><span class = "w70 inline-block"> 字数限制 </span><input placeholder = '8个' number v-model="textlimit"  type="number" class=" form-control  w60" > </div>
                    </div>

                </div>

            </div>

            <div v-show = 'showLayerAttrBoard && !bgChoosedStatus'>
                <div class="l-layer-board box right-width" ><span>商品图片</span></div>
                <div class="right-board">
                    <div class="box ">
                        <div class="form-inline"><span class = "w40 inline-block"> 位置 </span><input type="number" v-model="layerXText" value="" number class="form-control  w94" >  <input type="number" v-model="layerYText" value="" number class="form-control  w94"></div>
                    </div>
                    <div><span class = "mt15 w40 inline-block mt15">  </span> <span class = "w94 inline-block attr-tip mr10"> x </span>  <span class = "w94 inline-block attr-tip"> y </span>   </div>

                    <div class="box ">
                        <div class="form-inline"><span class = "w40 inline-block"> 尺寸 </span><input v-model="layerWidthText" type="number" value="" number class="form-control  w94" > <input v-model="layerHeightText" type="number" value="" number class="form-control  w94" ></div>
                    </div>
                    
                   


                    <div><span class = "mt15 w40 inline-block mt15">  </span> <span class = "w94 inline-block attr-tip mr10"> 宽 </span>  <span class = "w94 inline-block attr-tip"> 高 </span>   </div>


                     <div class="box ">
                        <div class="form-inline"><span class = "w40 inline-block"> 旋转 </span><input v-model="layerRotate" placeholder="角度"  type="number" value="" number class="form-control  w94" > </div>
                    </div>

                    


                </div>
                <div class="l-layer-board box right-width" v-show = "choosedlayer && choosedlayer.type== '3'"><span>静态图片地址</span></div>
                <div class="right-board">
                    <div class="box" v-show = "choosedlayer && choosedlayer.type== '3'">
                        <div class="form-inline"> <span class = "w40 inline-block"> 链接 </span><input v-model="layerImageText" type="text" value=""  class="form-control  w210" > </div>
                    </div>
                </div>

                <div class="l-layer-board box right-width" ><span>规则设定</span></div>
                <div class="right-board">
                    <div class="box mt15">
                        <div class="form-inline"><span class = "w94 inline-block"> 设置图片类型 </span>
                            <div class="inline-block ">
                                <v-select   placeholder = '请选择' :value.sync="imgType" >
                                    <v-option  value="1">动态图片</v-option>
                                    <v-option  value="3">静态图片</v-option>
                                    <v-option  value="bg">背景图</v-option>
                                </v-select>
                            </div>
                        </div>
                    </div>


                </div>


            </div>
            <div v-show = bgChoosedStatus>
                <div class="l-layer-board box right-width" ><span>背景属性</span> </div>
                <div class="right-board">



                    <div class="box ">
                        <div class="form-inline"><span class = "w40 inline-block"> 尺寸 </span><input v-model="bgWidthText" type="number" number class="form-control  w94" > <input v-model="bgHeightText" type="number" number class="form-control  w94" ></div>
                    </div>
                    <div><span class = "mt15 w40 inline-block mt15">  </span> <span class = "w94 inline-block attr-tip mr10"> 宽 </span>  <span class = "w94 inline-block attr-tip"> 高 </span>   </div>

                </div>
                <div class=" l-layer-board box right-width" ><span>规则设定</span> </div>
                <div class=" right-board p-board">

                    <div class="col-board addsoild-bottom">
                        <span class="mr5">将背景指定为</span>
                        <v-select placeholder = '请选择'  :value.sync="backgroundType" >
                            <v-option  value="1">背景色</v-option>
                            <v-option  value="2">背景图片</v-option>
                            <v-option  value="3">透明图</v-option>
                        </v-select>
                    </div>
                    <div v-show = "backgroundType == '1'" >
                        <div class="addgroupwarp">
                            <div class="addcolorgroupbtn" @click = "addTextGroup">添加配色方案</div>
                        </div>
                        <template  v-for="colorItems in BGrouplist">
                            <div class="bgclorgroup " @click = "chooseColorGroup(colorItems)"  v-bind:class="{ 'firstmo': $index!=0,'itemchoosed':colorItems.choosed}">
                                <div class="color-group-name" v-text="$index==0?'默认':$index"></div>
                                <div class= "bgclorgroupitem">
                                    <div class = "bgitem mr5 color-group" >
                                        <div class = "colortextname">背景色</div>
                                        <input type="text" v-model="colorItems.backgroundColorHex"  class="chooseColor jscolor {noshowcolor:true,value:'{{colorItems.backgroundColorHex}}'}" lazy  v-on:change="bgColorChange(colorItems,$event)"/>
                                    </div>
                                    <div class = "bgitem mr5 color-group"  v-for="colorItem in textDyGroups">
                                        <div class = "colortextname"  v-text="colorItem.textkindZH" ></div>
                                        <input type="text"    v-bind:value= colorItem.colorGroupPlan[colorItems.name] class="chooseColor jscolor {noshowcolor:true}"   lazy v-on:change="colorItem.colorChange(colorItems,$event)"/>
                                    </div>
                                </div>
                                <div  v-show = "$index!=0" class = "delcolorgroup" @click = "delcolorgroupText($index,colorItems)">
                                    删除
                                </div>

                            </div>
                        </template>

                    </div>


                    <div v-show = "backgroundType == '2'">
                        <div class="addgroupwarp">

                            <input type="checkbox" v-model="isUsedCustomBg" value="" class="mr5 m0"> 用户可自定义背景
                        </div>

                        <div class="addgroupwarp">
                            <div class="addcolorgroupbtn" @click = "addTextGroup">添加更多背景</div>
                        </div>

                        <template  v-for="colorItems in BGrouplist">
                            <div class="bgclorgroup bgimagesgroup" @click = "chooseColorGroup(colorItems)"  v-bind:class="{ 'firstmo': $index!=0,'itemchoosed':colorItems.choosed}">
                                <div class="color-group-name" v-text="$index==0?(colorItems.name=colorItems.name||'默认',colorItems.name):(colorItems.name=colorItems.name||$index,colorItems.name)"></div>
                                <div class= "bgclorgroupitem ">
                                    <div class = "bgitem mr5 color-group" >
                                        <img class="chooseImage" v-bind:src="colorItems.backgroundUrl"  @click='upimagebg($index,$event)'>
                                    </div>
                                    <div class = "bgitem mr5 color-group"  v-for="colorItem in textDyGroups">
                                        <div class = "colortextname"  v-text="colorItem.textKind=='1'?(colorItem.textIndex = 0,colorItem.textkindZH='主文案',colorItem.textkindZH):(colorItem.textIndex = ($index+1) ,colorItem.textkindZH = ('副文案'+($index+1)),colorItem.textkindZH)" ></div>
                                        <input type="text"    v-bind:value= colorItem.colorGroupPlan[colorItems.name] class="chooseColor jscolor {noshowcolor:true}"   lazy v-on:change="colorItem.colorChange(colorItems,$event)"/>
                                    </div>

                                </div>
                                <div class="delImgGroupWarp">
                                    <div  v-show = "$index!=0" class = "delcolorgroup" @click = "delcolorgroupText($index,colorItems)">
                                        删除
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="hide l-layer-board box right-width" ><span>设置</span> </div>
                <div class="hide right-board">
                    <div class="box mt15">
                        <div class="form-inline hide"><span class = "w30 inline-block"> 颜色 </span><input v-model="bgColorText"   placeholder = '颜色值不需要带#'  value=" " class="jscolor form-control  w94" > </div>
                        <div class="form-inline"><span class = "w30 inline-block"> 图片 </span><input v-model="bgImgText"   placeholder = '图片地址' class="form-control  w210" > </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
    Vue.directive('bindele', {
        twoWay: true,
        update: function(item) {
            // 值更新时的工作
            // 也会以初始值为参数调用一次
            //item.ele  = this.el;
            item.setEle(this.el);
        }
    })
    import utils from '../common/js/utils.js';
    import {IO} from '../common/js/utils.js';
    import { mAlert } from "../common/js/utils";
    import { modal } from 'vue-strap';
    import Env from '@ali/lib-env';
    import vSelect from 'vue-strap/src/Select.vue';
    import vOption from 'vue-strap/src/Option.vue'
    import dispatch from "../common/js/dispatch";    
    export default{
        props:{
            apiurl:{
                type:String,
                default:"/luban/rawdata.do"
                },
                showleftbox:{
                default:true       
                },
            showcontentbox:{
                default:true       
                },
            showrightbox:{
                default:true       
                },    
            isautoinit:{
                default:true       
                },
            istextchoosed:{
                default:true       
                },
            allresize:{
                default:true       
                },
            whres:{
                default:false       
                },
            showLables:{
                default:true     
                }
            },
        data: function() {
            return {
                rawModal:false,
                textModal: false,
                addItemModal: false,
                itemManageModal: false,
                bannerPreview: false,
                bannerRelease:false,
                category: [],
                textList: [],
                rawList:[],
                positionList:[],
                hasGetCategory: false,
                activityId: -1,
                activityName: '',
                passedNum: '',
                activityStartTime: '',
                activityEndTime: '',
                api: '/luban/LbSourceScreen.do',
                textApi: '/luban/LbCopywriterScreen.do',
                showAddLayerBoard:false,
                LayerItem:null,
                layerList:[],
                layerTreesList:[],
                chooseIndex:0,
                isResizeStatus:false,
                isDragStatus:false,
                upimagesModal:false,
                layerWidthText:"",
                layerHeightText:"",
                layerXText:"",
                layerYText:"",
                textXText:"",
                textYText:"",
                bgColorText:"",
                bgWidthText:"",
                bgHeightText:"",
                textContentText:"",
                textSizeText:"",
                textColorText:"",
                layerImageText:"",
                bgImgText:"",
                familyText:"方正兰亭黑",
                isCurrentAlign:0,
                groupTextObj:{},
                saveSendAjax:{},
                bgObjCss:{"backgroundColor":"","backgroundImage":'',width:"",height:''},
                initBgStatus:{},
                BGrouplist:[],
                initFromStatus: [],
                stageWidth:1125,
                choosedlayer:null,
                bgChoosedStatus:false,
                showTextAttrBoard:true,
                showLayerAttrBoard:true,
                textType:2,
                textGroupNum:1,
                textKind:"2",
                textlimit:8,
                imgType:3,
                backgroundType:'2',
                textDyGroups:[],
                upimageIndex:0,
                dropz:null,
                isUsedCustomBg:false,
                textAlign:"-1",
                layerRotate:"0",
                rawStatus:"0",
                lablesArr:['sdsd','2','3'],
                lableRadioValue:"",
                algorithmLabelBg:""


            }
        },
        components:{
            modal,
            vSelect,
            vOption
        },
        methods: {
            clearInitData:function(){
                this.layerList = [];
                this.layerTreesList = [];
                this.textDyGroups = [];
                this.groupTextObj = {};
                this.saveSendAjax = {};
                this.initBgStatus = {};
                this.BGrouplist = [];
                this.initFromStatus = [];
                this.textDyGroups = [];
            },
            addLayer:function(){
                this.showAddLayerBoard = !this.showAddLayerBoard;
            },

            initItemObj:function(){
                var self = this;
                this.LayerItem = function(op){
                    this.showEle = null;
                    this.ele = null;
                    this.ajaxCode = op;
                    this.type = parseFloat(op.type);
                    this.x = op.x||0;
                    this.y = op.y||0;
                    this.leftX = 0;
                    this.rightX = 0;
                    this.index = op.index;
                    this.subIndex = op.subIndex||1;
                    this.group = op.group||0;
                    this.choosedStatus = false;
                    this.textlimit = op.textlimit||8;
                    this.rotate = op.rotate||0;
                    this.algorithmLabel = op.algorithmLabel||""
                    switch (this.type){
                        case 1: //动态位图
                        case 3://静态位图
                            this.width = op.width||150;
                            this.height = op.height||150;
                            this.bgimg = op.picUrl||"https://gw.alicdn.com/tps/TB1XEHyMpXXXXahXXXXXXXXXXXX-360-360.png";
                            this.oldImageUrl = op.picUrl||"https://gw.alicdn.com/tps/TB1XEHyMpXXXXahXXXXXXXXXXXX-360-360.png";
                            this.cssStyle = {
                                width: this.width+"px",
                                height: this.height+"px",
                                backgroundImage: 'url('+this.bgimg+')',
                                backgroundSize:'100% 100%',
                                backgroundRepeat:"no-repeat",
                                left:this.x+"px",
                                top:this.y+"px",
                                position: 'absolute',
                                border: '1px solid transparent',
                                zIndex:100*this.index+this.subIndex,
                                transform:'rotate('+this.rotate+'deg)'
                            };
                            break;
                        case 2://动态文字
                        case 4://静态文字
                            this.textAlign = op.textAlign|| "-1";
                            this.text = op.text;
                            this.oldText = "";

                            if(!this.text&&this.type ==2){
                                this.text = "这里是动态的文字"
                            }
                            if(!this.text&&this.type ==4){
                                this.text = "这里是静态的文字"
                            }
                            this.textColorHex = op.textColorHex||"#fff000";
                            this.textkindZH = "";
                            this.colorGroupPlan = {
                                "默认":this.textColorHex
                            };
                            this.colorModeName = "默认";
                            this.textFont = op.textFont||"";
                            this.textSize = op.textSize||"22";
                            this.textKind = op.textKind||"2"; //"1"代表主文案 "2"代表辅文案;
                            this.cssStyle = {
                                color: this.textColorHex,
                                fontSize: this.textSize+"px",
                                top:this.y+"px",
                                fontFamily:this.textFont,
                                position: 'absolute',
                                whiteSpace: 'nowrap',
                                right:"inherit",
                                left:"inherit",
                                border: '1px solid transparent',
                                zIndex:100*this.index+this.subIndex
                            };
                            if(this.textAlign == "1"){
                                this.cssStyle.right = (self.stageWidth - this.x)+"px";
                            }else{
                                this.cssStyle.left = this.x+"px";
                            }
                            break;
                    }

                };
                this.LayerItem.prototype = {
                    colorChange:function(colorInfo,event){
                        var choosed = colorInfo.choosed;
                        var name = colorInfo.name;
                        var color = $(event.target).val();
                        if(color.indexOf("#")!=-1){
                            color = color.substring(1);
                        }

                        if(choosed){
                            this.setColor(color);
                        }else{
                            this.colorGroupPlan[name] = color;
                        }
                    },
                    changeColorMode:function(name){
                        this.colorModeName=name;
                        var color = this.colorGroupPlan[name]||"ffffff";
                        if(!this.colorGroupPlan[name]){
                            //this.colorGroupPlan[name]
                            Vue.set(this.colorGroupPlan,name,"ffffff");
                        }

                        if(color&&color.indexOf("#")!=-1){
                            color = color.substring(1);
                        }
                        this.setColor(color);
                    },
                    returenJson:function(){
                        var json = null;
                        switch (this.type){
                            case 1:
                            case 3:
                                json = {
                                    "index": this.index,
                                    "height": this.height,
                                    "width": this.width,
                                    "x": this.x,
                                    "y": this.y,
                                    "group":this.group,
                                    "subIndex":this.subIndex,
                                    "type": this.type,
                                    "notOffsetX": false,
                                    "notOffsetY": false,
                                    "picWidthStable": false,
                                    "textSize": 24,
                                    "dynamic":true,
                                    "rotate":this.rotate,
                                    "algorithmLabel":this.algorithmLabel
                                }
                                if(this.type==3){
                                    json.picUrl = this.bgimg;
                                    json.dynamic = false;
                                }
                                break;
                            case 2:
                            case 4:
                                json = {
                                    "index": this.index,
                                    "x": this.x,
                                    "y": this.y,
                                    "type": this.type,
                                    "textAlign":this.textAlign,
                                    "textColorHex":this.textColorHex,
                                    "textSize":this.textSize,
                                    "textFont":this.textFont,
                                    "notOffsetX":false,
                                    "notOffsetY":false,
                                    "group":this.group,
                                    "subIndex":this.subIndex,
                                    "picWidthStable":false,
                                    "textWidth":this.ele.offsetWidth,
                                    "text":this.text,
                                    "dynamic":true,
                                    "textlimit":this.textlimit,
                                    "textKind":this.textKind,
                                    "algorithmLabel":this.algorithmLabel
                                }
                                if(this.type == 4){
                                    json.text = this.text;
                                    json.dynamic = false;
                                }
                                break;
                        }

                        return json

                    },
                    setIndex:function(index){
                        this.index = index;
                        this.cssStyle.zIndex = this.index*100+this.subIndex;
                    },
                    setSubIndex:function(subIndex){
                        this.subIndex = subIndex;
                        this.cssStyle.zIndex = this.index*100+this.subIndex;
                    },
                    setWidth:function(width){
                        this.width = width;
                        this.cssStyle.width = this.width+"px";
                    },
                    setRotate:function(rotate){
                        this.rotate = rotate;
                        this.cssStyle.transform = 'rotate('+this.rotate+'deg)';
                    },
                    setHeight:function(height){
                        this.height = height;
                        this.cssStyle.height = this.height+"px";
                    },
                    setImg:function(img){
                        this.bgimg = img;
                        this.cssStyle.backgroundImage = 'url('+this.bgimg+')';
                    },
                    setX:function(x){
                        this.x = x;
                        switch (this.type){
                            case 1:
                            case 3:
                                this.cssStyle.left = this.x+"px";
                                break;
                            case 2:
                            case 4:
                                if(this.textAlign == "1"){
                                    this.cssStyle.right = (self.stageWidth - this.x)+"px";
                                    this.cssStyle.left = "inherit";
                                    this.rightX = this.x;
                                    if(this.ele){
                                        this.leftX = this.x - parseFloat(this.ele.offsetWidth);
                                    }
                                }else{
                                    this.cssStyle.left = this.x+"px";
                                    this.cssStyle.right = "inherit";
                                    if(this.ele){
                                        this.rightX = this.x + parseFloat(this.ele.offsetWidth);
                                    }
                                    this.leftX = this.x;
                                }
                                break;
                        }
                    },

                    setY:function(y){
                        this.y = y;
                        this.cssStyle.top = this.y+"px";

                    },
                    setContentText:function(text){
                        this.text = text;
                    },
                    setFontFamily:function(family){
                        this.textFont = family;
                        this.cssStyle.fontFamily = this.textFont;
                    },
                    setFontSize:function(size){
                        this.textSize = size;
                        this.cssStyle.fontSize = this.textSize+"px";
                    },
                    setColor:function(color){
                        this.textColorHex = "#"+color;
                        this.cssStyle.color = "#"+color;
                        if(this.colorGroupPlan[this.colorModeName]){
                            this.colorGroupPlan[this.colorModeName] = this.textColorHex;
                        }

                    },
                    setTextAlign:function(align){
                        this.textAlign = align;
                        if(this.textAlign == "1"){
                            self.textXText = this.rightX;

                        }else{
                            self.textXText = this.leftX;

                        }
                    },
                    setEle:function(ele$){
                        this.ele = ele$;
                        if(this.textAlign == "1"){
                            this.rightX = this.x;
                            this.leftX = this.x - parseFloat(this.ele.offsetWidth);
                        }else{
                            this.rightX = this.x + parseFloat(this.ele.offsetWidth);
                            this.leftX = this.x;
                        }
                    },
                    setDrawEle:function(ele$){
                        this.drawEle = ele$;
                    }
                }
            },
            doMakeJson:function(){
                var self = this;
                var json = {"layers":[]};
                json["layers"].push(self.returnBgJson())
                for(var i = 0 ; i <self.layerList.length;i++){
                    var item = self.layerList[i];
                    json["layers"].push(item.returenJson());
                }
                return json

            },
            bglayerChoosed:function(){
                var self = this;
                this.bgChoosedStatus = true;
                for(var i = 0 ; i<self.layerList.length;i++){
                    var item = self.layerList[i];
                    item.choosedStatus = false;
                }
                self.lableRadioValue = self.algorithmLabelBg 
                setTimeout(function(){
                    if(self.showrightbox){
                        jscolor.installByClassName("jscolor");
                    }
                },10);

            },
            addTextGroup:function(){
                var self = this;
                var name = self.textGroupNum;
                var obj = {
                    id:self.textGroupNum+1,
                    name:name,
                    backgroundColorHex:"eeeeee",
                    backgroundUrl:"https://gw.alicdn.com/tps/TB190OCJVXXXXa6XFXXXXXXXXXX-600-326.png",
                    copywriters:[],
                    choosed:false
                };
                for(var i =0;i<self.textDyGroups.length;i++){
                    var item = self.textDyGroups[i];
                    Vue.set(item.colorGroupPlan,name,"ffffff");
                }
                self.BGrouplist.push(obj);
                self.textGroupNum++;
                setTimeout(function(){
                    self.showrightbox&&jscolor.installByClassName("jscolor");
                },10);
            },
            saveTextGroup:function(){
                var self = this;
                for(var i = 0;i<self.BGrouplist.length;i++){
                    var list = self.BGrouplist[i];
                    var name = list.name;
                    var copywriters = [];
                    for(var k =0;k<self.textDyGroups.length;k++){
                        var item = self.textDyGroups[k];
                        var colorGroupPlan = item.colorGroupPlan;
                        var ob = {textIndex:item.textIndex,index:item.index,subIndex:item.subIndex,textKind: item.textKind,textkindZH:item.textkindZH,color:colorGroupPlan[name],name:name};
                        copywriters.push(ob);
                    }
                    list.copywriters = copywriters;
                }

            },
            delcolorgroupText:function(index,info){
                var self = this;
                var name = info.name;
                self.BGrouplist.splice(index,1);
                if(info.choosed){
                    self.chooseColorGroup(self.BGrouplist[0]);
                }
            },
            upimagebg:function(index,event){
                event.stopPropagation();
                var self = this;
                self.upimagesModal = true;
                self.upimageIndex = index;
                self.dropz.removeAllFiles();
                return false;

            },
            chooseColorGroup:function(item){
                var self = this;
                var name = item.name;
                item.choosed = true;
                for(var i = 0 ; i<self.BGrouplist.length;i++){
                    var group =  self.BGrouplist[i];
                    if(group.name != name){
                        group.choosed = false;
                    }
                }
                if(self.backgroundType==1){
                    this.bgColorText = item.backgroundColorHex;

                }
                if(self.backgroundType==2){
                    self.bgImgText = item.backgroundUrl;;
                }
                for(var i =0;i<self.textDyGroups.length;i++){
                    var item = self.textDyGroups[i];
                    item.changeColorMode(name);
                }
                setTimeout(function(){
                    self.showrightbox&&jscolor.installByClassName("jscolor");
                },10);
            },
            doZoom:function(num){
                var val = num/100;
                $("#draw-bg").css({
                    transform: "scale("+val+")",
                    webkitTransform: "scale("+val+")"
                })
            },
            bgColorChange:function(colorInfo,event){
                var choosed = colorInfo.choosed;
                var target = $(event.target);
                var color = target.val();
                if(color.indexOf("#")!=-1){
                    color = color.substring(1);
                }
                if(choosed){
                    this.bgColorText = color;
                }
            },
            doSave:function(consParams){
                var self = this;
                consParams = consParams||{};
                consParams.type = consParams.type||"edit";
                consParams.id = consParams.id||lib.env.params['id'];
                var json = self.doMakeJson();
                if(self.textDyGroups.length){
                    var hasTextKindone = false;
                    for(var i = 0 ; i<self.textDyGroups.length; i++){
                        var textob = self.textDyGroups[i];
                        if(textob.textKind =="1"){
                            hasTextKindone = true;
                            break;
                        }
                    };
                    if(!hasTextKindone){
                        mAlert("模版中要有主文案","danger");
                        return;
                    }
                }
                self.saveTextGroup();
                IO({
                    url: self.apiurl,
                    dataType:"json",
                    type:"post",
                    data:{
                        type:consParams.type,
                        id:consParams.id,
                        rawdata:JSON.stringify(json),
                        bgRawdata:JSON.stringify(self.BGrouplist),
                        _input_charset: 'utf8'
                    },
                    success: function(res) {
                        var data = res.data;
                        if(res.errorMsg){
                            mAlert(res.errorMsg,"danger");
                            return;
                        }
                        if(res.success&&!res.errorMsg){
                            mAlert("保存成功");
                            if(typeof consParams.bc =="function"){
                                consParams.bc(data); 
                            }    

                        }
                    },
                    error: function(e) {
                        console.log('category io error')
                    }
                });
                //saveSendAjax
            },
            addDytextArrs:function(item){
                var self = this;
                if(self.textDyGroups.indexOf(item)==-1){
                    self.textDyGroups.push(item);

                    setTimeout(function(){
                        self.showrightbox&&jscolor.installByClassName("jscolor");
                    },10);
                }

            },
            removeDytextArrs:function(item){
                var self = this;
                var index = self.textDyGroups.indexOf(item);
                var hasTextKindone =false;
                //self.textDyGroups.$remove(item);
                if(index!=-1){
                    self.textDyGroups.splice(index,1);
                    for(var i = 0 ; i<self.textDyGroups.length; i++){
                        var textob = self.textDyGroups[i];
                        if(textob.textKind =="1"){
                            hasTextKindone = true;
                            break;
                        }
                    };
                    if(!hasTextKindone){
                        if(self.textDyGroups[0]){
                            self.textDyGroups[0].textKind = "1";
                        }
                    }
                };
            },
            initRdata:function(consParams){
                var self = this;
                consParams = consParams||{};
                consParams.type = consParams.type||"get";
                consParams.id = consParams.id||lib.env.params['id'];
                this.clearInitData();
                IO({
                    url: self.apiurl,
                    dataType:"jsonp",

                    data: {
                        type:consParams.type,
                        id:consParams.id,
                        _input_charset: 'utf8'
                    },
                    success: function(res) {
                        var data = res.data;
                        if(res.errorMsg){
                            mAlert(res.errorMsg,"danger");
                            return;
                        }
                        if(res.success&&data.rawdata){
                            data.rawdata=data.rawdata.replace(/&quot;/g, '\"');
                            var rawdata = JSON.parse(data.rawdata);
                            if(data.bgRawdata&&self.showrightbox){
                                data.bgRawdata=data.bgRawdata.replace(/&quot;/g, '\"');
                                var bgRawdata = JSON.parse(data.bgRawdata);
                                self.BGrouplist= bgRawdata;
                            }
                            var  layers = rawdata['layers'];
                            if(window.app.$refs.editCtrl){
                                window.app.$refs.editCtrl.title = data.name;
                            }
                            var bgindex = 0;
                            for(var i = 0; i<layers.length;i++){
                                var item = layers[i];
                                if(item.index == 0){
                                    bgindex = i;
                                    self.initBgStatus = item;
                                }else{
                                    self.initFromStatus.push(item);
                                }
                            }
                            self.rawStatus = data.rawStatus;
                            dispatch.fire("changeraw",{"rawStatus":self.rawStatus});
                    /*         self.initBgStatus = {
                             dynamic: false,
                             index: 0,
                             notOffsetX: false,
                             notOffsetY: false,
                             picUrl: "http://img.daily.taobaocdn.net/imgextra/i1/5/TB2R4VXXXXXXXckXXXXXXXXXXXX_!!5-2-yamato.png",
                             picWidthStable: false,
                             resultHeight: 330,
                             resultWidth: 281,
                             textSize: 24,
                             backgroundColorHex:"#00BFFF",
                             bgType:1

                             }
                             self.initFromStatus = [
                             {"dynamic":false,"height":227,"index":1,"subIndex":1, "notOffsetX":false,"notOffsetY":false,"picUrl":"http://img.daily.taobaocdn.net/imgextra/i4/5/TB2J1dXXXXXXXcTXXXXXXXXXXXX_!!5-2-yamato.png","picWidthStable":false,"textSize":24,"type":3,"width":244,"x":28,"y":102},
                             {"dynamic":false,"height":218,"index":2,"subIndex":1,"notOffsetX":false,"notOffsetY":false,"picUrl":"http://img.daily.taobaocdn.net/imgextra/i1/5/TB2AKXXXXXXXXXBXpXXXXXXXXXX_!!5-2-yamato.png","picWidthStable":false,"textSize":24,"type":3,"width":220,"x":32,"y":113},
                             {"dynamic":false,"group":1,"height":34,"subIndex":1,"index":3,"notOffsetX":false,"notOffsetY":false,"picWidthStable":false,"text":"红色清新童鞋","textAlign":-1,"textColorHex":"#97FFFF","textFont":"方正兰亭黑","textSize":12,"type":2,"width":214,"x":27,"y":80},
                             {"dynamic":false,"group":1,"height":40,"subIndex":7,"index":3,"notOffsetX":false,"notOffsetY":false,"picWidthStable":false,"text":"天猫焕新","textAlign":-1,"textColorHex":"#97FFFF","textFont":"方正兰亭黑","textSize":14,"type":4,"width":166,"x":27,"y":28},
                             {"dynamic":false,"height":189,"index":4,"subIndex":1,"notOffsetX":false,"notOffsetY":false,"picUrl":"http://img.daily.taobaocdn.net/imgextra/i2/5/TB2S1dXXXXXXXcWXXXXXXXXXXXX_!!5-2-yamato.png","picWidthStable":false,"textSize":24,"type":1,"width":219,"x":32,"y":127},
                             {"dynamic":false,"group":1,"height":55,"subIndex":9,"index":3,"notOffsetX":false,"notOffsetY":false,"picWidthStable":false,"text":"图片请放置在 红色区域内","textAlign":-1,"textColorHex":"#97FFFF","textFont":"方正兰亭黑","textSize":8,"type":4,"width":139,"x":73,"y":195}
                             ]*/
                        }
                        self.initCanvas();
                    },
                    error: function(e) {
                        mAlert("初始化数据请求错误","danger");
                    }
                });
            },
            doPreview:function(){

            },
            returnBgJson:function(){
                return {"backgroundColorHex":"#"+this.bgColorText,
                    "index":0,
                    "resultHeight":this.bgHeightText,
                    "notOffsetX":false,
                    "notOffsetY":false,
                    "picWidthStable":false,
                    "textSize":24,
                    "picUrl":this.bgImgText,
                    "resultWidth":this.bgWidthText,
                    "bgType":this.backgroundType,
                    "isUsedCustomBg":this.isUsedCustomBg,
                    "algorithmLabel":this.algorithmLabelBg

                }
            },
            doTextLeftAlign:function(){
                var self = this;
                self.isCurrentAlign = -1;
                var list = self.groupTextObj[self.choosedlayer.group];
                list.sort(function(a,b){
                    return a.leftX - b.leftX;
                })
                for(var i = 0 ; i < list.length; i ++ ){
                    var item = list[i];
                    item.textAlign = -1;
                    if(self.choosedlayer.index == item.index){
                        self.textXText = list[0].leftX;
                    }else{
                        item.setX(list[0].leftX);
                    }
                }
            },
            doTextRightAlign:function(){

                var self = this;
                self.isCurrentAlign = 1;
                var list = self.groupTextObj[self.choosedlayer.group];
                list.sort(function(a,b){
                    return b.rightX - a.rightX;
                });
                for(var i = 0 ; i < list.length; i ++ ){
                    var item = list[i];
                    item.textAlign = 1;
                    if(self.choosedlayer.index == item.index){
                        self.textXText = list[0].rightX;
                    }else{
                        item.setX(list[0].rightX);


                    }

                }


            },
            doDrag:function(item,event,index){
                var disX = 0;
                var disY = 0;
                var self = this;
                switch(item.type){
                    case 2:
                    case 4:
                        if(!self.istextchoosed){
                            return;    
                        }  
                    break
                }    
                self.choosLayer(item);
                var event = event || window.event;
                event.stopPropagation();
                var oDrag = event.target;
                disX = event.clientX - oDrag.offsetLeft;
                disY = event.clientY - oDrag.offsetTop;
                oDrag.style.cursor = "move";
                document.onmousemove = function (event)
                {
                    var event = event || window.event;
                    self.isDragStatus = true;
                    var iL = event.clientX - disX;
                    var iT = event.clientY - disY;
                    var maxL = document.documentElement.clientWidth - oDrag.offsetWidth;
                    var maxT = document.documentElement.clientHeight - oDrag.offsetHeight;
                    var type =item.type;
                    switch (type){
                        case 1:
                        case 3:
                            self.layerXText = iL;
                            self.layerYText = iT;
                            break;
                        case 2:
                        case 4:
                            if(item.textAlign == 1){
                                self.textXText =  iL+oDrag.offsetWidth
                                //this.cssStyle.right = (self.stageWidth - this.x)+"px";
                            }else {
                                self.textXText =  iL;
                            }
                            self.textYText =  iT;
                            break;
                    }



                    return false
                };
                document.onmouseup = function ()
                {
                    document.onmousemove = null;
                    document.onmouseup = null;
                    self.isDragStatus = false;
                    this.releaseCapture && this.releaseCapture()
                };
                this.setCapture && this.setCapture();
                return false

            },
            doResize:function(item,event,isLeft, isTop, lockX, lockY){
                var self = this;
                var dragMinWidth = 50;
                var dragMinHeight = 50;
                var event = event || window.event;
                event.stopPropagation();
                var handle = event.target;
                var oParent = handle.parentNode;
                var disX = event.clientX - handle.offsetLeft;
                var disY = event.clientY - handle.offsetTop;
                var iParentTop = oParent.offsetTop;
                var iParentLeft = oParent.offsetLeft;
                var iParentWidth = oParent.offsetWidth;
                var iParentHeight = oParent.offsetHeight;
                document.onmousemove = function (event)
                {
                    var event = event || window.event;
                    self.isResizeStatus = true;
                    var iL = event.clientX - disX;
                    var iT = event.clientY - disY;
                    var maxW = document.documentElement.clientWidth - oParent.offsetLeft - 2;
                    var maxH = document.documentElement.clientHeight - oParent.offsetTop - 2;
                    var iW = isLeft ? iParentWidth - iL : handle.offsetWidth + iL;
                    //if(iW)
                    var iH = isTop ? iParentHeight - iT : handle.offsetHeight + iT;
                    if(self.whres){
                        var tempH =   (iW *  iParentHeight) /iParentWidth;
                        if( Math.abs(tempH) < Math.abs(iH)){
                            iW  = (iH *  iParentWidth) /iParentHeight;
                        }else{
                            iH = tempH;
                        }

                    }


                    //isLeft && ( oParent.style.left = iParentLeft + iL + "px");
                    var type =item.type;
                    
                    
                    if(isLeft){
                        switch (type){
                            case 1:
                            case 3:
                                self.layerXText = iParentLeft + iL;
                                break;
                            case 2:
                            case 4:
                                self.textXText = iParentLeft + iL;
                                break;
                        }
                    }
                    //isTop && (  oParent.style.top = iParentTop + iT + "px");
                    if(isTop){
                        switch (type){
                            case 1:
                            case 3:
                                self.layerYText = iParentTop + iT;
                                break;
                            case 2:
                            case 4:
                                self.textYText = iParentTop + iT;
                                break;
                        }
                    }

                    iW < dragMinWidth && (iW = dragMinWidth);
                    iW > maxW && (iW = maxW);
                    //lockX || (oParent.style.width = iW + "px");


                    iH < dragMinHeight && (iH = dragMinHeight);
                    iH > maxH && (iH = maxH);
                    //lockY || (oParent.style.height = iH + "px");
                    lockX || (self.layerWidthText = iW); 
                    lockY || (self.layerHeightText = iH);

                    //if()



                    if((isLeft && iW == dragMinWidth) || (isTop && iH == dragMinHeight)) document.onmousemove = null;

                    return false;
                };
                document.onmouseup = function ()
                {
                    document.onmousemove = null;
                    document.onmouseup = null;
                    self.isResizeStatus = false;
                };
                return false;
            },

            treeChooseLayer:function(item,lists){
                var self = this;
                lists = lists||self.layerTreesList;
                if(!item||item.type =="file"){
                    return;
                }

               //lableRadioValue     


                for(var i = 0;i< lists.length;i++){
                    var layer  = lists[i];
                    if(layer.children){
                        if(self.treeChooseLayer(item,layer.children)){
                            return
                        }
                    }else{
                        if(layer.index == item.index && layer.subIndex == item.subIndex){
                            self.choosLayer(layer);
                            return  true;
                        }

                    }

                }
            },
            choosLayer:function(item){
                var self = this;
                var layer = item;

                if(layer){
                    var index = layer.index;
                    var subIndex = layer.subIndex;
                    self.choosedlayer = layer;
                    self.bgChoosedStatus = false;
                    layer.choosedStatus = true;
                    for(var i = 0 ; i<self.layerList.length;i++){
                        var item = self.layerList[i];
                        if(item.index!=index){
                            item.choosedStatus = false;
                        }
                        if(item.index ==index&& item.subIndex!=subIndex){
                            item.choosedStatus = false;
                        }
                    }
                    var type = layer.type;
                    switch (type){
                        case 1:
                        case 3:
                            self.showLayerAttrBoard = true;
                            self.showTextAttrBoard = false;
                            self.layerWidthText = layer.width;
                            self.layerHeightText = layer.height;
                            self.layerXText = layer.x;
                            self.layerYText = layer.y;
                            self.layerImageText = layer.bgimg;
                            self.imgType = layer.type;
                            break;
                        case 2:
                        case 4:
                            self.showTextAttrBoard = true;
                            self.showLayerAttrBoard = false;
                            self.textXText = layer.x;
                            self.textYText = layer.y;
                            self.textSizeText = layer.textSize;
                            self.textColorText = layer.textColorHex.substring(1);
                            self.familyText = layer.textFont;
                            self.isCurrentAlign = self.groupTextObj[layer.group][0].textAlign;
                            self.textContentText  =layer.text;
                            self.textType = layer.type;
                            self.textlimit = layer.textlimit;
                            self.textKind = layer.textKind;
                            self.textAlign = String(layer.textAlign);
                            break;
                    }
                    self.lableRadioValue = layer.algorithmLabel; 
                    setTimeout(function(){
                        self.showrightbox&&jscolor.installByClassName("jscolor");
                    },10);
                }

            },

            createLayer:function(type){
                var self = this;
                var index = self.layerTreesList.length+1;
                var ob = null;
                var type = parseFloat(type);
                switch (type){
                    case 1:
                    case 3:
                        ob =  {
                            "index": index,
                            "subIndex":1,
                            "notOffsetX": false,
                            "notOffsetY": false,
                            "height": 100,
                            "width": 100,
                            "picWidthStable": false,
                            "x": 0,
                            "y": 0,
                            "textSize": 24,
                            "type": type
                        };
                        var item = new self.LayerItem(ob);
                        break;
                    case 2:
                    case 4:
                        ob ={
                            "index": index,
                            "subIndex":1,
                            "notOffsetX": false,
                            "notOffsetY": false,
                            "picWidthStable": false,
                            "text": "",
                            "textAlign": "-1",
                            "group":0,
                            "textColorHex": "#FFFFFF",
                            "textFont": "方正兰亭黑",
                            "textSize": 22,
                            "x": 0,
                            "y": 0,
                            "textlimit":8,
                            "textkindZH":"",
                            "textkind":"2",
                            "type": type
                        }
                      /*  if(type ==2){
                            ob.text = "这里是动态的文字"
                        }
                        if(type ==4){
                            ob.text = "这里是静态的文字"
                        }*/
                        var item = new self.LayerItem(ob);
                        if(type ==2){
                            self.addDytextArrs(item);

                        }
                        self.groupTextObj[item.group] = self.groupTextObj[item.group]||[];
                        self.groupTextObj[item.group].unshift(item);
                        break;
                }
                self.layerList.unshift(item);
                self.layerTreesList.unshift(item);
                self.showAddLayerBoard = false;
            },
            turnfile:function(item){
                item.openStatus = !item.openStatus;
            },
            createLayerInfo:function(){
                var self = this;
                var infos = self.initFromStatus;
                var groups = {};
                infos.sort(function(a,b){
                    return  b.index - a.index;
                });

                for(var i = 0;i < infos.length;i++){
                    var item = new self.LayerItem(infos[i]);
                    self.layerList.push(item);
                    switch (item.type){
                        case 2:
                        case 4:
                            var group  = item.group||0;
                            self.groupTextObj[group] = self.groupTextObj[group]||[];
                            self.groupTextObj[group].push(item);
                            if(item.type == 2){
                                self.textDyGroups.push(item);
                            }
                            break;
                    }
                }
                for(var i = 0;i < self.layerList.length;i++){
                    var  info = self.layerList[i];
                    var group = info.group||"0";
                    groups[group] = groups[group]||[];
                    groups[group].push(info);
                }
                self.layerTreesList = groups["0"]||[];
                for(var key in groups){
                    if(key != 0 ){
                        var fileObj = {
                            children:groups[key],
                            fileName:key,
                            type:"file",
                            openStatus:true,
                            index:groups[key][0].index
                        }
                        self.layerTreesList.push(fileObj);
                    }
                }

                self.layerTreesList.sort(function(a,b){
                    return a.index - b.index;
                });

                self.layerTreesList.sort(function(a,b){
                    return  b.index - a.index;
                });

                self.initGroupTreesIndex();

                self.layerList.sort(function(a,b){
                    return  b.index - a.index;
                });
                self.treeChooseLayer(self.layerTreesList[self.chooseIndex]);

            },

            addImagesGroup:function(){




            },
            setLayerIndex:function(layer,index){
                if(layer.children){
                    for(var k = 0; k< layer.children.length;k++){
                        layer.index = index;
                        var child = layer.children[k];
                        child.setIndex(index);
                        var len = layer.children.length;
                        child.setSubIndex(len-k);
                    }
                }else{
                    layer.setIndex(index);
                }
            },


            initGroupTreesIndex:function(){
                var self = this;
                for(var i = self.layerTreesList.length-1 ; i >=0;i--) {
                    var key = self.layerTreesList.length-i-1;
                    var layer = self.layerTreesList[key];
                    self.setLayerIndex(layer,i+1);
                }
            },




            delChildrenLayer:function(item){
                var self = this;
                var index = item.index;
                var subIndex = item.subIndex;
                var len = self.layerTreesList.length - index;
                var children = self.layerTreesList[len].children;
                for(var  i = 0 ; i<children.length;i++){
                    var child = children[i];
                    if(child.index == index && child.subIndex == subIndex){
                        if(children.type==2&&children.textKind=="1"){
                            mAlert("该层为主文案!需要在其他层设置主文案后才能删除");
                            return
                        }
                        children.splice(i,1);
                        break;
                    }
                }
                self.removeDytextArrs(item);
                for(var i = 0 ; i < self.layerList.length;i++){
                    var layer = self.layerList[i];
                    if(layer.index == index && layer.subIndex == subIndex){
                        if(layer.choosedStatus){
                            self.treeChooseLayer(self.layerTreesList[self.chooseIndex]);
                        }
                        self.layerList.splice(i,1);
                        break;
                    }
                }
                if(!children.length){
                    self.delLayer(self.layerTreesList[len]);
                }
            },
            delLayer:function(item){
                var self = this;
                var index = item.index;
                var subIndex = item.subIndex;
                var len = self.layerTreesList.length - index;
                for(var i = 0 ; i < self.layerList.length;i++){
                    var layer = self.layerList[i];
                    if(layer.index == index && layer.subIndex == subIndex){
                        if(layer.type==2&&layer.textKind=="1"){
                            mAlert("该层为主文案! 需要在其他层设置主文案后才能删除");
                            return
                        }
                        if(layer.choosedStatus){
                            self.treeChooseLayer(self.layerTreesList[self.chooseIndex]);
                        }
                        self.layerList.splice(i,1);
                        break;
                    }
                }
                self.layerTreesList.splice(len,1);
                self.removeDytextArrs(item);
                for(var i = 0; i < len;i++){
                    var layer = self.layerTreesList[i];
                    var index = layer.index - 1;
                    self.setLayerIndex(layer,index);
                }
            },
            initSortable:function(){
                var self = this;
                var sortable = Sortable.create(document.getElementById("root-sortable-body"),{animation: 150,draggable:".treeli", onUpdate:function(evt){
                    var startIndex = evt.oldIndex ;
                    var newIndex =  evt.newIndex;
                    //self.LayerItem[]
                    if(newIndex>startIndex){
                        var len = newIndex+1;
                        for(var i = startIndex; i<len; ++i){
                            var  layer = self.layerTreesList[i];
                            if(i == startIndex){
                                var index = layer.index-(newIndex-startIndex);
                                self.setLayerIndex(layer,index);
                            }
                            if(i!=startIndex){
                                var index = layer.index + 1;
                                self.setLayerIndex(layer,index);
                            }
                        }
                    }else if(newIndex<startIndex) {
                        var layer = self.layerTreesList[startIndex];
                        var index = layer.index+(startIndex-newIndex);
                        self.setLayerIndex(layer,index);
                        for(var i = newIndex;i< startIndex;i++){
                            var layer = self.layerTreesList[i];
                            var index = layer.index - 1;
                            self.setLayerIndex(layer,index);
                        }
                    }
                    self.layerTreesList.sort(function(a,b){
                        return b.index-a.index;
                    });
                    self.layerList.sort(function(a,b){
                        return b.index -a.index;
                    });

                }});

                $(".sub-sortable-body").each(function(index,item){
                    var sort = Sortable.create(item,{animation: 150, draggable:".treeli", onUpdate:function(evt){
                        var startIndex = evt.oldIndex ;
                        var newIndex =  evt.newIndex;
                        var parentIndex = parseFloat($(evt.item).attr("parentIndex")) ; //
                        var len = self.layerTreesList.length;
                        var children = self.layerTreesList[len - parentIndex].children;
                        if(newIndex>startIndex){
                            var len = newIndex+1;
                            for(var i = startIndex; i<len; ++i){
                                var  layer = children[i];
                                if(i == startIndex){
                                    var index = layer.subIndex-(newIndex-startIndex);
                                    layer.setSubIndex(index);
                                }
                                if(i!=startIndex){
                                    var index = layer.subIndex + 1;
                                    layer.setSubIndex(index);
                                }
                            }
                        }else if(newIndex<startIndex) {

                            var  layer = children[startIndex];
                            var index = layer.subIndex+(startIndex-newIndex);
                            layer.setSubIndex(index);
                            for(var i = newIndex;i< startIndex;i++){
                                var layer = children[i];
                                var index = layer.subIndex - 1;
                                layer.setSubIndex(index);
                            }
                        }

                        setTimeout(function(){
                            children.sort(function(a,b){
                            return b.subIndex- a.subIndex;
                        })
                        },100)
                    }});
                });
            },

            initKeyEvent:function(){
                var self = this;
                document.onkeydown=function(e){
                    switch(e.keyCode){
                        case 37: //左键
                            //self.choosLayer()
                            if(self.choosedlayer) {
                                //self.choosedlayer.setColor(self.textColorText);
                                if(self.choosedlayer.type ==1 || self.choosedlayer.type==3){
                                    self.layerXText--;
                                }else if(self.choosedlayer.type ==2 || self.choosedlayer.type==4){

                                    self.textXText--;


                                }
                            }

                            return false;

                            break;
                        case 38: //向上键

                            if(self.choosedlayer) {
                                //self.choosedlayer.setColor(self.textColorText);
                                if(self.choosedlayer.type ==1 || self.choosedlayer.type==3){
                                    self.layerYText--;



                                }else if(self.choosedlayer.type ==2 || self.choosedlayer.type==4){

                                    self.textYText--;
                                }
                            }

                            return false;
                            break;
                        case 39: //右键

                            if(self.choosedlayer) {
                                //self.choosedlayer.setColor(self.textColorText);
                                if(self.choosedlayer.type ==1 || self.choosedlayer.type==3){
                                    self.layerXText++;
                                }else if(self.choosedlayer.type ==2 || self.choosedlayer.type==4){

                                    self.textXText++;
                                }
                            }
                            return false;
                            break;
                        case 40: //向下键
                            if(self.choosedlayer) {
                                //self.choosedlayer.setColor(self.textColorText);
                                if(self.choosedlayer.type ==1 || self.choosedlayer.type==3){
                                    self.layerYText++;
                                }else if(self.choosedlayer.type ==2 || self.choosedlayer.type==4){
                                    self.textYText++;
                                }
                            }
                            return false;
                            break;
                    }

                }


            },


            updataBGrouplist:function(){
                var self = this;
                if(!self.BGrouplist.length){
                    var color =  (self.initBgStatus.backgroundColorHex&&self.initBgStatus.backgroundColorHex.substring(1))||"4DFFF9";
                    if(color==" "){
                        color= "4DFFF9";
                    }
                    var img = self.initBgStatus.picUrl||"";
                    self.BGrouplist = [
                        {
                            id:1,
                            name:"默认",
                            backgroundColorHex:color,
                            backgroundUrl:img,
                            copywriters:[],
                            choosed:true
                        }
                    ]
                    return;
                }
                for(var  i = 0;i<self.BGrouplist.length;i++){
                    var list = self.BGrouplist[i];
                       list.id =  i+1;
                    var copywriters = list.copywriters;
                    for(var y=0;y< copywriters.length;y++){
                        var copywriter = copywriters[y];


                        for(var k = 0;k<self.textDyGroups.length;k++){
                            var item = self.textDyGroups[k];
                            if(item.index == copywriter.index && item.subIndex == copywriter.subIndex){
                                item.colorGroupPlan[copywriter.name] = copywriter.color;
                            }
                        }
                    }
                }
                self.textGroupNum = self.BGrouplist.length;
            },
            initBgLayer:function(){
                var self = this;
                var color =  (self.initBgStatus.backgroundColorHex&&self.initBgStatus.backgroundColorHex.substring(1))||"4DFFF9";
                if(color==" "){
                    color= "4DFFF9";
                }
                self.backgroundType = self.initBgStatus.bgType||"2";
                self.isUsedCustomBg = self.initBgStatus.isUsedCustomBg;
                self.bgWidthText = self.bgObjCss["width"] = self.initBgStatus.resultWidth||1125;
                self.bgHeightText = self.bgObjCss["height"] =  self.initBgStatus.resultHeight||225;
                self.algorithmLabelBg = self.initBgStatus.algorithmLabel;

                var img = self.initBgStatus.picUrl||"";
                if(self.backgroundType==1){
                    if(color){
                        self.bgColorText = color;
                        self.bgObjCss["backgroundColor"] = "#"+color;
                        self.bgObjCss["backgroundImage"] = "none";
                    }
                }
                if(self.backgroundType==2){
                    if(img){
                        self.bgImgText = img;
                        self.bgObjCss["backgroundColor"] = "rgba(0,0,0,0)";
                        self.bgObjCss["backgroundImage"] = "url(' "+img+"')";
                    }
                }
                 if(self.backgroundType==3){
                        self.bgObjCss["backgroundColor"] = "rgba(0,0,0,0)";
                        self.bgObjCss["backgroundImage"] = "none";

                    
                }



            },


            initCanvas:function(){
                var self = this;
                this.createLayerInfo();
                this.initBgLayer();
                self.showrightbox&&this.updataBGrouplist();
                setTimeout(function(){
                    if(self.showleftbox){
                        self.initSortable();
                    }
                    self.showrightbox&&jscolor.installByClassName("jscolor");
                },10);
            },
            onDispatchEvent:function(){
                var self = this;
                dispatch.on("sacle-big",function(obj){
                    self.doZoom(obj.zoomNum);
                });
                dispatch.on("sacle-small",function(obj){
                    self.doZoom(obj.zoomNum);

                });
            }
        },
        watch: {

            textAlign:function(){
                var self = this;
                if(self.choosedlayer ){
                    self.choosedlayer.setTextAlign(self.textAlign);
                }
            },
            lableRadioValue:function(){
                var self = this;
                if(self.bgChoosedStatus){
                    self.algorithmLabelBg = self.lableRadioValue;
                }else if(self.choosedlayer){
                    self.choosedlayer.algorithmLabel = self.lableRadioValue;
                }  
            },
            layerWidthText:function(){
                var self = this;
                if(self.choosedlayer ){
                    self.choosedlayer.setWidth(self.layerWidthText);
                }
            },
            layerRotate:function(){

                var self = this;
                if(self.choosedlayer ){
                    self.choosedlayer.setRotate(self.layerRotate);
                }
            },
            layerHeightText:function(){
                var self = this;
                if(self.choosedlayer) {
                    self.choosedlayer.setHeight(self.layerHeightText);
                }
            },
            layerXText:function(){
                var self = this;
                if(self.choosedlayer) {
                    self.choosedlayer.setX(self.layerXText);
                }
            },
            textXText:function(){
                var self = this;
                if(self.choosedlayer ) {
                    self.choosedlayer.setX(self.textXText);
                }
            },
            textYText:function(){
                var self = this;
                if(self.choosedlayer) {
                    self.choosedlayer.setY(self.textYText);
                }
            },
            textColorText:function(){
                var self = this;
                if(self.choosedlayer) {
                    self.choosedlayer.setColor(self.textColorText);
                }
            },
            textContentText:function(){
                var self = this;
                if(self.choosedlayer){
                    self.choosedlayer.setContentText(self.textContentText);
                }
            },
            layerYText:function(){
                var self = this;
                if(self.choosedlayer ) {
                    self.choosedlayer.setY(self.layerYText);
                }
            },
            layerImageText:function(){
                var self = this;
                if(self.choosedlayer ) {
                    self.choosedlayer.setImg(self.layerImageText);
                }


            },
            bgColorText:function(){
                var self = this;
                self.initBgStatus.backgroundColorHex = self.bgObjCss["backgroundColor"] ="#"+self.bgColorText;
            },
            bgWidthText:function(){
                var self = this;
                self.initBgStatus.resultWidth = self.bgWidthText;
                self.bgObjCss["width"] = self.bgWidthText +"px";

            },
            bgHeightText:function(){
                var self = this;
                self.initBgStatus.resultHeight  = self.bgHeightText;
                self.bgObjCss["height"] = self.bgHeightText +"px";
            },
            bgImgText:function(){
                var self = this;
                self.initBgStatus.backgroundImg  = self.bgImgText;
                self.bgObjCss["backgroundImage"] = "url(' "+self.bgImgText+"')";

            },
            textSizeText:function(){
                var self = this;
                if(self.choosedlayer ) {
                    self.choosedlayer.setFontSize(self.textSizeText);
                }
            },
            familyText:function(){
                var self = this;
                if(self.choosedlayer ) {
                    self.choosedlayer.setFontFamily(self.familyText);
                }
            },
            imgType:function(){
                var self = this;
                if(self.choosedlayer){
                    if(self.imgType == "bg"){
                    }else{

                        self.choosedlayer.type =  parseInt(self.imgType);
                    }
                    if(self.imgType == 1){
                        self.choosedlayer.oldImageUrl = self.layerImageText;
                        self.layerImageText = self.choosedlayer.oldImageUrl||"https://gw.alicdn.com/tps/TB1XEHyMpXXXXahXXXXXXXXXXXX-360-360.png"
                    }
                    if(self.imgType == 3){
                        self.layerImageText = self.choosedlayer.oldImageUrl||"https://gw.alicdn.com/tps/TB1XEHyMpXXXXahXXXXXXXXXXXX-360-360.png"
                    }
                }
            },
            textType:function(){
                var self = this;
                if(self.choosedlayer) {
                    self.choosedlayer.type = parseInt(self.textType);
                    if(self.textType == 2){
                        self.choosedlayer.oldText = self.textContentText;
                        self.textContentText = "这里是动态的文字";
                        self.addDytextArrs(self.choosedlayer);
                    }
                    if(self.textType == 4){
                        if(!self.choosedlayer.oldText){
                            self.choosedlayer.oldText = "这里是静态的文字";
                        }
                        self.textContentText = self.choosedlayer.oldText;
                        self.removeDytextArrs(self.choosedlayer);
                        self.choosedlayer.textKind = "2";
                    }
                }
            },
            textKind:function(){
                var self = this;
                if(self.choosedlayer) {
                    if(self.textKind =="1"){
                        for(var i = 0 ; i<self.textDyGroups.length; i++){
                            var textob = self.textDyGroups[i];
                            textob.textKind = "2";
                        };
                        self.choosedlayer.textKind = self.textKind;
                    }else{
                        var hasTextKindone =false;
                        self.choosedlayer.textKind = self.textKind;

                        for(var i = 0 ; i<self.textDyGroups.length; i++){
                            var textob = self.textDyGroups[i];
                            if(textob.textKind =="1"){
                                hasTextKindone = true;
                                break;
                            }
                        };
                        if(!hasTextKindone){
                            mAlert("必须有主文案");
                            self.textKind = "1";
                            self.choosedlayer.textKind = self.textKind;
                        }
                    }
                }
            },
            backgroundType:function(){
                var self = this;
                var color = (self.initBgStatus.backgroundColorHex&&self.initBgStatus.backgroundColorHex.substring(1))||"4DFFF9";
                if(color==" "){
                    color= "4DFFF9";
                }

                var img = self.initBgStatus.picUrl||"";
                if(self.backgroundType==1){
                    if(color){
                        self.bgColorText = color;
                        self.bgObjCss["backgroundColor"] = "#"+color;
                        self.bgObjCss["backgroundImage"] = "none";

                        self.bgImgText = "";
                    }
                }
                if(self.backgroundType==2){
                    if(img){
                        self.bgImgText = img;
                        self.bgObjCss["backgroundImage"] = "url(' "+img+"')";
                        self.bgObjCss["backgroundColor"] = "rgba(0,0,0,0)";

                    }
                }
                if(self.backgroundType==3){
                    self.bgObjCss["backgroundColor"] = "rgba(0,0,0,0)";
                    self.bgObjCss["backgroundImage"] = "none";
                }

                                    

            },

            textlimit:function(){
                var self = this;
                if(self.choosedlayer) {
                    self.choosedlayer.textlimit = self.textlimit;
                    if(self.textType == 2){
                        if(self.textlimit<1){
                            self.textlimit =1;
                        }
                        if(self.choosedlayer.type=="2"){
                            var str = "这里是动态的文字";
                        }
                        if(self.choosedlayer.type=="4"){
                            var str = self.choosedlayer.oldText;
                        }
                        if(str.length > self.textlimit){
                            str = str.substr(0,self.textlimit);
                            self.textContentText = str;
                        }
                        if( self.textlimit == 8 && self.choosedlayer.type=="2"){
                            self.textContentText = "这里是动态的文字";
                        }
                        if(self.textlimit>str.length){
                            var dislen =  self.textlimit-str.length;
                            var addstr = "";
                            while (dislen>0){
                                addstr +="文";
                                dislen--;
                            }
                            self.textContentText = str+addstr;
                        }
                    }
                }


            }

        },
        events: {
        },
        ready() {
            var self = this;
            this.initItemObj();
            this.initKeyEvent();
            if(this.isautoinit){
                this.initRdata();
            }
            this.onDispatchEvent();



            if(this.showrightbox){
                var dropEle = $(".edit-dropzone")[0];
                self.dropz = new Dropzone(dropEle, {
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
                    maxFiles:1
                });
                self.dropz.on("error", function(file,message) {
                    mAlert(message,"danger");
                });
                self.dropz.on("success", function(file,res) {
                    var res = JSON.parse(res);
                    if(res.success){
                        var url = res.data[0];
                        self.BGrouplist[self.upimageIndex].backgroundUrl = url;
                        self.upimagesModal = false;
                        mAlert("上传成功");
                    }else{
                        mAlert("上传失败","danger");
                    }
                });
            } 
        }
    }
</script>