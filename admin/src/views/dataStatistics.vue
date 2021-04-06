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
  methods: {
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
    }
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
