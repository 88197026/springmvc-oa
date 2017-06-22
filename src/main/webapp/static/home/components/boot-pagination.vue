<style lang="sass">
    .pointer-cursor {
        cursor: pointer;
    }
    .go-warp{
        width: 80px;
        display: -webkit-box;
        -webkit-box-pack: center;
        --webkit-box-align: center;
        line-height: 34px;
    }
    
</style>

<template>
    <ul v-bind:id= 'paginationid'>
    </ul>
</template>

<script>
    import dispatch from "../common/js/dispatch";
    module.exports = {
        props: {
            page:{},
            totalpages:{
            },
            paginationid:{
                type: String,
                default:"boot-pagination"
            },
            type:{type: String,
                default:"default"}

        },

        watch:{
            totalpages:function(){
                this.setOp();
            }
        },
        methods: {
            setOp:function(){
                var self = this;
                var options = {
                    currentPage: this.page||1,
                    totalPages: this.totalpages||10,
                    bootstrapMajorVersion:3,
                    itemTexts: function (type, page, current) {
                        switch (type) {
                            case "first":
                                return "第一页";
                            case "prev":
                                return "前页";
                            case "next":
                                return "后页";
                            case "last":
                                return "最后一页";
                            case "page":
                                return page;
                        }
                    },
                    alignment:"center",
                    itemContainerClass: function (type, page, current) {
                    return (page === current) ? "active" : "pointer-cursor";
                    },
                     onPageChanged: function(e,oldPage,newPage){
                          dispatch.fire('changepag-page', {
                            page:newPage,
                            eletype:self.type
                            });
                     }
                }
                var sq = this.paginationid||"boot-pagination";
/*
                $('#'+sq).data('bootstrapPaginator', "");
*/
                $('#'+sq).bootstrapPaginator(options);
                }

        }, 
        events: {
            toggleTab: function() {
            }
        },
        ready:function(){
            //this.setOp();
        
        }
    }
</script>