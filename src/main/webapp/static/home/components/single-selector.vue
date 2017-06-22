<style lang="sass" scoped>
    .select-sm {
        .btn {
            padding: 5px 10px;
            font-size: 12px;
            line-height: 1.5;
            border-radius: 3px;
        }
    }
</style>


<template>
    <v-select width="80" class="select-sm" :placeholder="initplaceholder" :value.sync="value" :options="options" :close-on-select="true"></v-select>
</template>
<script>
    var utils = require('../common/js/utils.js');

    module.exports = {
        props: {
            value: {
                type: String,
            },
            options: {
                type: Array
            },
            valName: {
                type: String
            }
        },
        data: function() {
            return {
                initplaceholder : "请选择"
            }
        },
        components: {
            vSelect: VueStrap.select,
            vOption: VueStrap.option,
        },
        watch: {
            value(val, old) {
                this.$dispatch('getSingleSelection', this.valName, val);
            }
        }
    }
</script>