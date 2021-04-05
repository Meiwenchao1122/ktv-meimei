<template>
 <div class="data">
     <div class="top">
         <div class="top_left">1</div>
         <div class="top_right">2</div>
     </div>
     <div class="bottom">
         <div class="bottom_left">3</div>
         <div class="bottom_right">4</div>

     </div>
 </div>
</template>

<script>
export default {
    name:"dataStatistics",
 props: {

 },
 data() {
 return {

 };
 },
 computed: {

 },
 created() {

 },
 mounted() {

 },
 watch: {

 },
 methods: {

 },
 components: {

 },
};
</script>

<style lang='less'>
.data{
    .top{
        display: flex;
        height: 350px;
        .top_left{
            flex: 1;
        }
        .top_right{
            flex: 1;
        }
    }
    .bottom{
        display: flex;
        height: 200px;
        .bottom_left{
            flex: 1;
        }
        .bottom_right{
            flex: 1;
        }
    }
}
</style>
