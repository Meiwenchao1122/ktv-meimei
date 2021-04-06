<template>
<!-- 数据统计 -->
 <div class="data">
     <div class="top">
         <div class="top_left" >
            <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
         </div>
         <div class="top_right">2</div>
     </div>
     <div class="bottom">
         <div class="bottom_left">3</div>
         <div class="bottom_right">4</div>
     </div>
 </div>
</template>
<script>
import * as echarts from 'echarts' 
export default {
    name:"dataStatistics",
    data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
    this.drawLine();
  },
  created(){
   
  },
  methods: {
    //   图1 数据渲染
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
         let myChart = echarts.init(document.getElementById('myChart')); ;
        // 绘制图表
        myChart.setOption({
            title: { text: '在Vue中使用echarts' },
            tooltip: {},
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    },
     // 获取所有歌手
        // getAllArtist(){
        //     this.$axios.post("http://localhost:8633/api/music/all")
        //             .then(res => {
        //                 this.artistSongs = res.data;
        //                 this.allTableData = res.data;
        //                 this.setPaginations();
        //                 let result = [res.data[0].artist];
        //                 res.data.forEach(item => {
        //                     let flag = true;
        //                     result.forEach(artist => {
        //                         if(artist == item.artist){
        //                             flag = false;
        //                         }
        //                     })
        //                     if(flag){
        //                         result.push(item.artist)
        //                     }
        //                 })
        //                 this.artistList = result;
        //             })
        // },
    // 获取所有歌曲信息
    // 获取订单信息
    // 获取收藏歌曲
  }
}
</script>

<style lang='less'>
.data{
    // background: url('../assets/image/bg3.jpg') no-repeat fixed;
    // background-size: cover;
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
        height: 270px;
        .bottom_left{
            flex: 1;
        }
        .bottom_right{
            flex: 1;
        }
    }
}
</style>
