<template>
    <header>
        <div class="header-container">
            <nav class="nav-head">
                <div class="navbar-left">
                    <ul class="nav ">
                        <li class="logo">保稅仓金融服务</li>
                    </ul>
                </div>
                <div class="navbar-right">
                    <ul class="nav navbar-nav">
                        <li class="head-lable">
                            <a  class="nav-a " :class="{'nav-a-active': currentTab=='index'}" href="../src/ml-index.html" >首页</a>
                        </li>
                        <li class="head-lable">
                            <a class="nav-a" :class="{'nav-a-active': currentTab=='loanmange'}" href="../src/ml-loanmange.html" >贷款管理</a>
                        </li>
                        <li class="head-lable">
                            <a class="nav-a"  :class="{'nav-a-active': currentTab=='backloan'}" href="../src/ml-choosebackloan.html" >提前还贷</a>
                        </li >
                        <li  class="head-lable">
                            <dropdown class="user-entry">
                                <button type="button" class="btn btn-default user-entry-btn" data-toggle="dropdown">
                                    <div class="user-name">
                                        {{userNick}}
                                    </div>
                                    <span class="caret"></span>
                                </button>
                                <ul name="dropdown-menu" class="dropdown-menu">
                                    <li><a href="#" >个人管理</a></li>
                                    <li><a href="#" >切换账号</a></li>
                                </ul>
                            </dropdown>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </header>
</template>
<style lang='sass' scoped>


.header-container {
    width: 1140px;
    margin:auto;
    .navbar-left{
        float: left;
        .logo {
            padding-left:20px;
            font-size: 24px;
            line-height: 60px;
            color: #fff;
        }
    }
    .navbar-right{
        .head-lable {
            text-align: center;
            width: 150px;

            .nav-a {
                line-height: 30px;
                font-size: 18px;
                color: #fff;
            }

            .nav-a:link {
                color: #fff;
            }

            .nav-a:visited {
                color: #fff;
            }

            .nav-a-active {
                text-decoration: none;
                background-color: #eee;
                color: #333 !important;
            }

            .nav-a:hover {
                text-decoration: none;
                background-color: #eee;
                color: #333;
            }
        }

    }

}

.user-entry {
    margin-left: 10px;
    .user-entry-btn {
        border: none;
        height: 58px;
        line-height: 58px;
        overflow: hidden;
        padding: 0;
        background: transparent!important;
        outline: none!important;
    }
    .user-name {
        font-size: 12px;
        margin-top: 5px;
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border-radius: 50px;
        display: inline-block;
        padding: 0;
        background: #48bc2f;
        color: #fff;
    }
    .caret{
        color: #fff;
    }
    .dropdown-menu {
        min-width: 100px;
        a {
            height: 30px;
            line-height: 30px;
            font-size: 14px;
        }
    }
}
</style>
<script>
import { dropdown } from 'vue-strap';
export default {
    props: {
        "userNick": {
            type: String,
            default: "请登录"
        },
        "currentTab": {
            type: String,
            default: "index"
        }
    },
    components: {
        dropdown
    },
    methods: {
        logout() {
            window.location.href = this.logoutUrl;
        }
    },
    events: {
        PAGE_DATA_GET(data) {
            if (data && data.lbBasicInfoDTO && data.lbBasicInfoDTO.logoutUrl) {
                this.logoutUrl = data.lbBasicInfoDTO.logoutUrl;
            }
        }
    }
}
</script>
