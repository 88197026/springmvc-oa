<style lang="sass" scoped>
    .text-box {
        padding: 10px;
        margin-bottom: 10px;
        .short-input {
            margin-bottom: 10px;
        }
    }
    .text-box-wrap {
        padding: 15px;
        background: #f5f5f5;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    .tool-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 30px;
    }
    .handle-btn {
        display: flex;
        margin-bottom: 10px;
    }
    .handle-icon {
        width: 20px;
        height: 20px;
        cursor: pointer;
        background-size: contain;
    }
    .del-icon {
        background-image: url(../images/iconfont-delete.png);
        margin-left: 6px;
    }
    .save-icon {
        background-image: url(../images/iconfont-check.png);
    }

</style>

<template>
    <div class="text-box col-lg-4 col-md-4 col-xs-4 col-sm-4">
        <div class="text-box-wrap">
            <div class="tool-bar">
                <div>#{{index+1}}文案组</div>
                <div v-show = 'index!=0' class="handle-btn">
                    <div class="handle-icon del-icon" @click="delTextBox"></div>
                </div>
            </div>
            <input v-for="item in textlayer"  type="text" maxlength={{item.textlimit}}  v-model = 'textContent.cpTextName[$index]'  class="form-control short-input" placeholder="限{{item.tempTextlimit||item.textlimit}}个中文字"
                   @compositionstart="compositionstart" @compositionend="compositionend" @keyup  = "limitword($event,item.textlimit,item,$index)"
                   lazy
            >
        </div>
    </div>

</template>

<script>
    import {IO} from '../common/js/utils';
    import utils from '../common/js/utils.js';

    module.exports = {
        props: {
            textContent: {
                type: Object
            },
            index: {
                type: Number
            },
            textlayer:{

            }
        },
        data() {
            return {
                
                textlimit:"",
                cp:false
            }
        },
        methods: {
            delTextBox() {
                this.$dispatch('delTextBox', this.textContent.id, this.index);
            },
            compositionstart(){
                this.cp = true;    
            },
            compositionend(){
                this.cp = false;    
            },
            limitword(event,textlimit,item,flag){
                if(!this.cp){
                    var c=0;
                    var ele = event.target;
                    var index = 0;
                    var k= String(ele.value);
                    if(k){
                         if(!item.tempTextlimit){
                                item.tempTextlimit= textlimit
                            }
                            var limit = parseFloat(item.tempTextlimit)*2;
                            index = limit;
                            for(var i=0;i<k.length;i++){
                                if(k.charCodeAt(i)>999){
                                    c+=2;
                                    index--;
                                }else{
                                    c++;
                                } 
                                if(c > limit) {
                                    k=k.substring(0,i);
                                    ele.value = k;
                                    break;
                                }
                            };
                            if(index<=item.tempTextlimit){
                                item.textlimit = item.tempTextlimit;
                            }else {
                                item.textlimit = index;

                            }
                            this.textContent.cpTextName[flag] = $(event.target).val();
                    }

                    }
            
/*                
*/               
            }
        },

        events:{
            savebox:function(cb){
                var self = this;
                var cpTextNameArr = [];
                var isemptyInfo ="";
                var name = "#"+ (self.index+1)+"文案组";
                var content = {};
                for(var i = 0 ; i<self.textlayer.length;i++){
                        var text = self.textContent.cpTextName[i];
                        if(!text){
                            isemptyInfo = name + "文案不能为空";
                            cb(content,self.index,isemptyInfo);
                            return;
                        }
                        cpTextNameArr.push('"' + text + '"');
                }
                content = {
                    id:self.textContent.id||"",
                    name: "#"+ (self.index+1)+"文案组",
                    copywriter: cpTextNameArr.join(',')
                }
                cb(content,self.index,isemptyInfo);
            }

        }

    }
</script>