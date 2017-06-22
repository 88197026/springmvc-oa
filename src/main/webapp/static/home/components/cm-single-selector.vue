<style lang="sass" scoped>

</style>

<template>
    <v-select  :placeholder="initplaceholder" :value.sync="value" :options="options" :close-on-select="true"></v-select>
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
            },
            initplaceholder:{
                type: String,
                default:"请选择"

            }

        },
        data: function() {
            return {
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