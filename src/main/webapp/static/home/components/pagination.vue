<style lang="sass">
    .pagination {
        display: flex;
        justify-content: center;
        text-align: center;
    }
    .pagination-btn {
        width: 50px;
        height: 50px;
        background-size: 40px;
        border-radius: 100px;
        margin: 0px 20px;
    }
    .prev {
        background: url(../images/iconfont-arrowleft.png) no-repeat center center #49B7FB;
    }
    .next {
        background: url(../images/iconfont-arrowright.png) no-repeat center center #49B7FB;
    }
    .text-num{
        line-height: 50px;

    }
    .disable {
        background-color: #ccc;
    }
</style>

<template>
    <div class="pagination">
        <div class="pagination-btn prev" :class="{'disable': (page <= 1)}" @click="prevPage"></div>
        <div class="text-num">{{page}}</div>
        <div class="pagination-btn next" :class="{'disable': reachend}" @click="nextPage"></div>
    </div>



</template>
<script>
    module.exports = {
        props: {
            page: {
                type: Number,
                default: 1
            },
            tab: {
                type: Number
            },
            reachend:Boolean,
            errajax:Boolean

        },
        methods: {
            prevPage: function() {
                if (this.page <= 1||this.errajax) {
                    return
                }

                this.page--;
                this.$dispatch('prevPage', this.page, this.tab)

            },
            nextPage: function() {

                if(!this.reachend&&!this.errajax){
                    this.page++;
                }
                this.$dispatch('nextPage', this.page, this.tab)
            }
        }, 
        events: {
            toggleTab: function() {
                console.log(2)
            }
        }
    }
</script>