<template>
    <div class="wsmnav">
            <el-menu
      default-active="1"
         background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1" @click.native="goUser_service">
        <i class="el-icon-setting"></i>
        <span slot="title">分配账号密码</span>
      </el-menu-item>
      
      <el-menu-item index="2" @click.native="goAdminLikes">
        <i class="el-icon-star-off"></i>
        <span slot="title">系统推荐歌曲</span>
      </el-menu-item>
      <el-menu-item index="3" @click.native="goManageMusic">
        <i class="el-icon-menu "></i>
        <span slot="title">歌曲管理</span>
      </el-menu-item>
        <el-menu-item index="4"  @click.native="allorders">
        <i class="el-icon-tickets"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>
      <el-menu-item index="5" @click.native="logout" >
        <i class="el-icon-sort"></i>
        <span slot="title">退出登陆</span>
      </el-menu-item>
    </el-menu>
      
    </div>
</template>
<script>
// import "@/plugins/Date"
export default {
    name:"wsmnav",
    data(){
        return{
            theme:"dark",
            avatar:require("../assets/avatar/admin.jpg"),
            adminInfo:"",
            nowTime:"",
        }
    },
    created(){
        this.getAdminInfo();
     
    },
    methods:{
        goIndex(){
            this.$router.push("/admin/index");
        },
        allorders(){
            this.$router.push("/admin/allorders");
        },
        goUser_service(){
            this.$router.push("/admin/user_service");
        },
        goManageMusic(){
            this.$router.push("/admin/manage/music");
        },
        goAdminLikes(){
            this.$router.push("/admin/music/likes");
        },
        
        // 退出
        logout(){
            this.$confirm('确定退出吗？', '退出提示', {
                confirmButtonText: '退出',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store.dispatch("clearAdminAuthorization");
                this.$router.push("/login");
            }).catch(() => {})
            
        },
        // 获取管理员信息
        getAdminInfo(){
            this.adminInfo = this.$store.getters.adminInfo;
        }
    }
}
</script>
<style lang="less" scoped>
.wsmnav{
    width: 100%;
    height: 100%;
    background-color: #545C64;
    .el-menu{
        background-color: #545C64 !important;
        birder-right:none;
    }
}
</style>