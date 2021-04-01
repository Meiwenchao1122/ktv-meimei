<template>
  <el-container class="home">
  <el-header>
    <img src="../assets/image/logo.png" alt="">
    <h1>渔之歌 MUSIC SYSTEM</h1>
  </el-header>
  <el-container>
    <el-aside width="200px">
      <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#1F2437"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
     <span slot="title">零食乐园</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <span slot="title">已点歌曲</span>
      </el-menu-item>
    </el-menu>
    </el-aside>
    <el-container>
      <el-main>
          <router-view></router-view>
      </el-main>
      <el-footer>
        <bottomNav></bottomNav>
      </el-footer>
    </el-container>
  </el-container>
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
  background-color: #1F2437;
  height: 100%;
  .el-header{
    display: flex;
    img{
      display: block;
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    h1{
      line-height: 60px;
      padding-left: 20px;
      color: #fff;
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
}

</style>
