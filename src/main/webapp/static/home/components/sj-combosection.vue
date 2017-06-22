<style lang = "sass" >

    .banner-result-warp{
        padding: 0px 10px;
    }
</style>
<template>
    <div>
        <cm-make-banner></cm-make-banner>
        <div class="banner-result-warp">
            <cm-banner-result></cm-banner-result>
        </div>
    </div>
</template>

<script>
    import {IO} from '../common/js/utils';
    import Env from '@ali/lib-env';
    import { mAlert } from "../common/js/utils";
    import dispatch from "../common/js/dispatch";
    import tPagination from './pagination.vue';

    module.exports = {
        props: {
            itemlist: {
                type: Array,
                default:[]
            }
        },
        data: function () {
            return {
                page: 1,
                reachEnd: false,
                errajax: false,
            }
        },
        components: {
            cmMakeBanner: require('../components/cm-make-banner.vue'),
            cmBannerResult: require('../components/cm-banner-result.vue')


        },
        watch: {
        },
        ready:function(){

        }
    }
</script>