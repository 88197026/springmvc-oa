<style lang="sass">
    .add-item-modal .nav-tabs {
        display: flex;
        justify-content: center;
    }
</style>
<template>
    <div v-if="type == 1" class="add-item-modal mt20">
        <div class="bs-docs-section" id="tabs">
            <div class="bs-example">
                <tabs  v-ref:mytabs >
                    <tab header="从招商导入">
                        <t-businesspool :category="category"></t-businesspool>
                    </tab>
                    <tab header="从业务池里导入">
                        <t-propool :category="category"></t-propool>
                    </tab>
                    <tab header="从公共池里选">
                        <t-pubpool :category="category"></t-pubpool>
                    </tab>
                    <tab v-ref:mytab  :header= htext>
                        <t-poolmanage   :category="category"></t-poolmanage>
                    </tab>

                </tabs>
            </div>
        </div>
    </div>
</template>
<script>

    import pubPool from './pub-pool.vue';
    import businessPool from './business-pool.vue';
    import proPool from './pro-pool.vue';
    import tPoolmanage from '../components/pool-manage.vue';
    module.exports = {
        props: ['type', 'category','itemnum'],
        data: function() {
            return {
                htext:"已导入商品"
            }
        },
        watch:{
            itemnum:function(){
                this.htext = "已导入商品("+this.itemnum +")"

            }
        },
        components: {
            tab: VueStrap.tab,
            tabs: VueStrap.tabset,
            tPubpool: pubPool,
            tBusinesspool: businessPool,
            tPoolmanage: tPoolmanage,
            tPropool: proPool
        },
        watch:{


        },
        methods:{
            changeItemNum:function(){
                //this.htext = "已导入商品("+this.itemnum +")";

            },
            changeTabIndex:function(index){
                this.$refs.mytabs.activeIndex = index;
            }

        },
        ready:function(){


        }
    }
</script>