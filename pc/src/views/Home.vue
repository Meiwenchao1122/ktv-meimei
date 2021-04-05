<template>
  <el-container class="home">
  <el-header>
    <img src="../assets/image/logo.png" alt="">
    <h1>【渔歌】 MUSIC SYSTEM</h1>
    <div class="header_right">
      <topNav></topNav>   
    </div>
  </el-header>
      <el-main>
          <router-view></router-view>
      </el-main>
      <el-footer shyle="height: 80px;">
        <bottomNav></bottomNav>
      </el-footer>
  
</el-container>

</template>

<script>
import topNav from "@/components/topNav";
import bottomNav from "@/components/bottomNav";
export default {
  name: 'home',
  components:{
    topNav,
    bottomNav
  }
}
</script>
<style lang="less" scoped>

.home{
  background-color: #111;
  height: 100%;
  .el-header{
    display: flex;
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
      color: #fff;
    }
    .header_right{
      flex: 1;
      padding-left: 100px;
    }
  }
  .el-main{
     margin: 0;
                background: url('../assets/image/home_bg.jpg') no-repeat fixed;
                background-size: cover;
  }
  .el-menu{
    border-right: none;
  }
  .el-footer{
    background-color: #000;
  }
}

</style>
