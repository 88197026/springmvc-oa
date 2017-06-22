

<template>
    <div class="control-box">

        <div class="control-box-col active-info-box">
            <div class="active-name"> <a href="./detail.html?activityId={{activityId}}"> {{activityName}}</a></div>
            <div class="time-range">{{activityNick}}{{activityStartTime}}最后更新，投放结束时间：{{activityEndTime}}</div>
        </div>
    </div>
</template>
<style lang='sass'>
    
.closefix {
    right: 16px;
    position: absolute;
}

.text-model-body {
    padding: 20px;
}

.control-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 100%;
}

.active-info-box {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    .active-name {
        font-size: 26px;
        color: #000;
    }
    .time-range {
        font-size: 8px;
        color: #999;
    }
}

.active-h-box {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    align-content: center;
}

.more {
    text-align: left;
}

.active-tool {
    display: flex;
    justify-content: flex-end;
    .tool-box {
        margin: 0 10px;
        cursor: pointer;
    }
    .passed {
        width: 60px;
        height: 60px;
        border-radius: 100px;
        border: 1px solid #DAE2EB;
        display: flex;
        color: red;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        align-items: center;
    }
    .tool-icon {
        width: 30px;
        height: 30px;
        background-size: contain;
    }
    .download-icon {
        background-image: url(../images/iconfont-down.png);
    }
    .preview-icon {
        background-image: url(https://gw.alicdn.com/tps/TB1itLjHVXXXXaaaXXXXXXXXXXX-25-25.png);
    }
    .push-icon {
        background-image: url(https://gw.alicdn.com/tps/TB1ROHfHVXXXXbuXVXXXXXXXXXX-25-25.png);
    }
}

.tips {
    width: 'auto';
}

.active-button {
    display: flex;
    width: 400px;
    justify-content: flex-end;
    .tool-box {
        margin: 0 10px;
        cursor: pointer;
    }
    .tool-icon {
        width: 40px;
        height: 40px;
        background-size: contain;
    }
    .download-icon {
        background-image: url(../images/iconfont-down.png);
    }
}

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
        .tip-icon {
            position: absolute;
            min-width: 10px;
            border-radius: 10px;
            background: red;
            right: -30%;
            top: -5px;
            padding: 0 5px;
            color: white;
        }
    }
}
.bs-example {
  margin-top:20px;
}
</style>
<script>

    import utils from '../common/js/utils.js';
    import {IO} from '../common/js/utils.js';
    import { modal } from 'vue-strap';
    import Env from '@ali/lib-env';
    import dispatch from "../common/js/dispatch";
    export default{
        data: function() {
            return {
                activityNick:"",
                activityName: '',
                activityEndTime: '',
                activityStartTime: '',
                activityId: -1
            }
        },
        components:{

        },
        methods: {

        },
        events: {
            PAGE_DATA_GET(data){
                this.activityName = data.activity.name;
                this.activityNick = data.activity.createNick;
                this.activityStartTime= data.activity.updateTimeStr;
                this.activityEndTime = data.activity.releaseEndStr;
                this.activityId=data.activity.id;
            }
        },
        ready() {

            //this.activityId = Env.params.activityId;

        }
    }
</script>