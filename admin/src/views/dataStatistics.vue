<template>
<!-- 数据统计 -->
 <div class="data">
     <div class="top">
         <div class="top_left" >
             <h3>歌手拥有歌曲数量统计:</h3>
            <div id="myChart" :style="{width: '600px', height: '300px'}"></div>
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
    data(){
          return{
                //歌曲以及对应数量  
              labList:[]
          }
        },
        mounted() {
            this.initChart();
        },
        methods:{
            initChart() {
                this.char=echarts.init(document.getElementById("myChart"));
                this.$axios.get('http://localhost:8633/api/music/all')
                    .then((res)=>{
                        console.log('访问后台');
                        this.labList=res.data;
                        // 格式化数据为angle图标 需要的数据--此结构为固定结构
                        let list = [
                            {
                                "name":'邓紫棋',
                                "value":0,
                            },
                            {
                                "name":'Taylor Swift',
                                "value":0,
                            },
                            {
                                "name":'林俊杰',
                                "value":0,
                            },
                            {
                                "name":'刘德华',
                                "value":0,
                            },
                            {
                                "name":'毛不易',
                                "value":0,
                            },
                            {
                                "name":'周杰伦',
                                "value":0,
                            },
                            {
                                "name":'张学友',
                                "value":0,
                            },
                            {
                                "name":'王赫野',
                                "value":0,
                            },
                        ]
               
                        for (let i = 0; i < this.labList.length; i++) {
                            const elementI = this.labList[i].artist;
                        
                            for (let k = 0; k < list.length; k++) {
                                const elementK = list[k];
                                
                                if(elementK.name == elementI){
                                   list[k].value++
                                   
                                }
                            }
                        }
                        // 格式化数据为angle图标 需要的数据
                        this.char.setOption({
                        roseType: 'angle',
                        tooltip:{},
                        series:[
                                {
                                    name: '歌手歌曲量统计',
                                    type: 'pie',
                                    radius: '55%',
                                    data:list,
                                    
                                }
                            ]
                        })
                    });

            },
        }
} 
</script>

<style lang='less'>
.data{

    background-color: #fff;
    .top{
        display: flex;
        height: 350px;
        .top_left{
            flex: 1;
            padding: 10px;
        
        }
        .top_right{
            flex: 1;
             padding: 10px;
        }
    }
    .bottom{
        display: flex;
        height: 270px;
        .bottom_left{
            flex: 1;
             padding: 10px;
        }
        .bottom_right{
            flex: 1;
             padding: 10px;
        }
    }
}
</style>
