<template>
<el-container>
  <el-header>
    <!-- 顶部 -->
<img src="../assets/image/logo.png" alt="">
    <h1>【渔歌】后台管理系统</h1>
    <div class="header_right">
    
    <div class="current-time">{{nowTime}}</div>
    </div>
  </el-header>
  <el-container>
    <el-aside width="200px">
      <!-- 侧边栏 -->
      <wsmnav></wsmnav>
    </el-aside>
    <el-container>
      <el-main>
        <!-- 内容路由 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</el-container>
</template>

<script>
import wsmnav from "@/components/nav"
export default {
  name: 'home',
  components: {
      wsmnav,
  },
  data(){
        return{  
            nowTime:"",
        }
    },
    created(){
        this.currentTime();
    },
    methods:{
      // 刷新时间
        currentTime(){
            setInterval(() => {
                this.nowTime = new Date().format("yyyy/MM/dd HH:mm:ss")
            }, 1000)
        }
    }
}
</script>
<style lang="less" scoped>
.el-header{
    display: flex;
    background-color: #333;
    color: #fff;
    img{
      display: block;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-top: 5px;
    }
    h1{
      line-height: 60px;
      padding-left: 20px;
    }
    .header_right{
      flex: 1;
      padding-left: 100px;
      line-height: 60px;
      font-size: 25px;
    }
  }
  .el-aside{
    background-color: #545C64 !important;
    height: 100%;
  }
  .el-container{
    height: 100%;
  }
  .el-main{
    background-color: #eee;
  }

</style>
