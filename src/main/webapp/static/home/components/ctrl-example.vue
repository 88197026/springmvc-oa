<!-- example页面的control部分 -->
<template>
    <div>
        {{hello}}
    </div>
</template>
<style lang='sass' scoped>
    
</style>
<script>
    export default{
        props:{

        },
        data(){
            return{
                "hello":""
            }
        },
        components:{
            
        },
        ready() {
            var com = this;
            com.$on('PAGE_DATA_GET', function(data) {
                com.hello = data.hello;
            });
        },
        methods:{
        }
    }
</script>