<style lang="sass" >
    .select-sm .dropdown-menu{
        max-height: 500px;
        overflow-y: auto;
    }
</style>

<template>

        <v-select width="80" class="select-sm" :value.sync="cateVal" :placeholder="initplaceholder" :options="mainCate" :search="true"  :close-on-select="true"></v-select>
        <v-select v-if="subData.length" :placeholder="initplaceholder" width="80" class="select-sm" :value.sync="subCateVal"  :options='subData' :close-on-select="true"></v-select>
</template>

<script>
    var utils = require('../common/js/utils.js');
    module.exports = {
        props: {
            mainCate: {
                type: Array
            }
        },
        data: function() {
            return {
                cateVal: '',
                subData: [],
                subCateVal: '',
                initplaceholder : "请选择"
            }
        },
        components: {
            vSelect: VueStrap.select,
            vOption: VueStrap.option
        },
        watch: {
            cateVal: function(val, old) {
                var cateLength = this.mainCate.length;
                for (var i = 0; i< cateLength; i++) {
                    if (this.mainCate[i].value == val) {
                        this.subData = this.mainCate[i].subLbCategoryDTOList;
                    }
                }
                this.$dispatch('getSelection', [val, this.subCateVal]);
            },
            subCateVal: function(val, old) {
                this.$dispatch('getSelection', [this.cateVal, val]);
            }
        },
        ready: function() {
            this.subData = this.mainCate[0].subLbCategoryDTOList;
        }
    }
</script>