<template>
  <div id="app">
      <router-view/>
  </div>
</template>
<script>
import hasLogin from "@/config/isLogin"
//是否时间到了 要下机
import hasBad from "@/config/isBadAccount"
import jwt_decode from "jwt-decode";
export default {
  name:"App",
  components:{
    // Home
  },
  data(){
    return{
      
    }
  },
  created(){
      this.isLogin();
  },
  methods:{
    isLogin(){
        //初始化登陆后的状态
        if(hasLogin()){
            const decode = jwt_decode(localStorage.userToken);
            this.$store.dispatch("setAuthorizated", true);
            this.$store.dispatch("setUser", decode);

            if(localStorage.songList){
                const list = JSON.parse(localStorage.songList);
                this.$store.dispatch("setAllSong", list);
            }else{
                //将所有歌曲 存在数据当中
                localStorage.setItem("songList", JSON.stringify([]));
            }
            if(!localStorage.playModle){
                //播放1  暂停-1
                localStorage.setItem("playModle", 1);
            }
            if(!localStorage.currentSong){
                //当前播放
                localStorage.setItem("currentSong", JSON.stringify([]));
            }
            if(!localStorage.play){
                localStorage.setItem("play", 0);
            }
            console.log("已登录")
        }
        // 定时检测是否到下机时间
        setInterval(() => {
            if(hasLogin()){
                hasBad();
            }else{
                this.$store.dispatch("clearState");
            }
        }, 2000)
    }
  }

}
</script>
<style lang="less" scoped>
#app{
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100vw;
  height: 100vh;
}


/* 滚动槽 */
  // 谷歌
  ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
  }
  ::-webkit-scrollbar-track {
      border-radius: 3px;
      background: rgba(0,0,0,0.06);
      -webkit-box-shadow: inset 0 0 3px rgba(0,0,0,0.08);
  }
  /* 滚动条滑块 */
  ::-webkit-scrollbar-thumb {
      border-radius: 3px;
      background: rgba(236, 233, 233, 0.1);
      -webkit-box-shadow: inset 0 0 10px rgba(0,0,0,0.2);
  }

</style>
