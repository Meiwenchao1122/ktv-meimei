<template>
    <div class="bottom_btn">
        <div class="container"></div>
        <div class="inner-box">
            <div class="left">
                <!-- 选个首页 -->
                <div class="selectd_home" @click="toHome_page">
                    <Icon type="ios-home" />
                </div>
                <!-- 播放列表 -->
                <div class="selected" @click="selected_list">
                    <Icon type="ios-musical-notes" />
                </div>
                <!-- 减少音量 -->
                <div class="reducevolume" @click="reduce_v">
                    <Icon type="ios-volume-mute" />
                </div>
                <!-- 增加音量 -->
                <div class="addvolume" @click="add_v">
                    <Icon type="ios-volume-up" />
                </div>
            </div>
            <!-- 歌曲调节 -->
            <div class="middle">
                <img class="an" :src="currentPoster" alt="">
                <div class="control-btn">
                    <!-- 上一曲 -->
                    <div class="prev-btn" @click="playPrev">
                        <Icon type="ios-rewind" />
                    </div>
                    <!-- 暂停播放 -->
                    <div class="play" @click="play_pause">
                        <Icon type="ios-play" id="ios-play" />
                        <Icon type="ios-pause" id="ios-pause" />
                    </div>
                    <!-- 下一曲 -->
                    <div class="next-btn" @click="playNext">
                        <Icon type="ios-fastforward" />
                    </div>
                </div>
            </div>
            <div class="right">
                <!-- 静音 -->
                <div class="minormax" @click="min_max">
                    <Icon type="md-volume-off" />
                </div>
                <!-- 单曲循环 -->
                <div class="single-cycle" @click="singleCycle">
                    <Icon type="md-sync" />
                </div>
                <!-- 列表循环 -->
                <div class="order-cycle" @click="orderCycle">
                    <Icon type="md-swap" />
                </div>
                <!-- 登录退出 -->
                <div class="login">
                    <span v-if="!isLogin" @click="loginModal = true">
                        <Icon type="md-log-in" />
                    </span>
                    <span v-if="isLogin" @click="logout">
                        <Icon type="md-log-out" />
                    </span>
                </div>
            </div>
        </div>
        <!-- 登录弹窗 -->
        <Modal v-model="loginModal" width="450">
            <div v-if="loginModal">
                <div class="login_box">
                    <!-- 头像区域 -->
                    <div class="avatar_box">
                        <img src="../assets/image/logo.png" alt="">
                    </div>
                    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="55px" class="login_form">
                        <el-form-item label="账号:" prop="account" >
                            <el-input type="account" v-model="ruleForm.account"></el-input>
                        </el-form-item>
                        <el-form-item label="密码:" prop="password">
                            <el-input type="password" @keypress.enter.native="submit('ruleForm')" v-model="ruleForm.password"></el-input>
                        </el-form-item>
                         <!-- 按钮区域 -->
                        <el-form-item class="btns">
                            <el-button type="primary" @click="submit('ruleForm')">登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </Modal>

        <audio autoplay id="musicPlayer" ref="musicPlayer" @ended="end" :src="'http://localhost:8633/api/music/nowmusic?id=' + currentSong._id" preload="auto"></audio>
    </div>
</template>
<script>
import nextSong from "@/config/nextSong"
import prevSong from "@/config/prevSong"
import hasLogin from '@/config/isLogin'
import jwt_decode from "jwt-decode"
import wsmLoading from "@/plugins/wsmLoading"
export default {
    name:"bottomNav",
    data(){
        return{
            loginModal:false,
            ruleForm:{
                account:"",
                password:""
            },
            rules:{
                account:[
                    {required:true, message:"账号不能为空", trigger:"change"}
                ],
                password:[
                    {required:true, message:"密码不能为空", trigger:"change"}
                ]
            },
        }
    },
    mounted(){
        setTimeout(() => {
            // 用定时器 检测当前播放的歌曲, 要是有改变,那么浏览器的播放器 就会立马改变音乐
            this.currentSong = JSON.parse(localStorage.currentSong)[0] ? JSON.parse(localStorage.currentSong)[0] : {_id:0};
            if(localStorage.play == "0"){
                this.$refs.musicPlayer.pause();
                $("#ios-play").fadeIn();
                $("#ios-pause").fadeOut();
                
            }else{
                $("#ios-play").fadeOut();
                $("#ios-pause").fadeIn();
                this.$refs.musicPlayer.play();
            }
        }, 200)
    },
    created(){
        // this.currentSong = JSON.parse(localStorage.currentSong)[0] ? JSON.parse(localStorage.currentSong)[0] : {_id:0};
    },
    methods:{
        end(){
            //播放状态 localStorage.playModle == 1
            if(localStorage.playModle == 1){
                const song = nextSong();
                this.$refs.musicPlayer.src = "http://localhost:8633/api/music/nowmusic?id=" + song._id
                const obj = [song];
                localStorage.setItem("currentSong", JSON.stringify(obj))
                this.currentSong = song;
            }else{
                this.$refs.musicPlayer.play();
            }
        },
        // 播放上一首
        playPrev(){
            if(hasLogin()){
                if(localStorage.play == "0"){
                    if(this.$refs.musicPlayer.src.split("?")[1] == "id=0"){
                        this.$confirm("请先添加歌曲", "提示", {
                            confirmButtonText:"确定",
                            cancelButtonText:"取消",
                            type:"warning"
                        }).then(() => {}).catch(() => {})
                        
                    }else{
                        const song = prevSong();
                        this.$refs.musicPlayer.src = "http://localhost:8633/api/music/nowmusic?id=" + song._id
                        const obj = [song];
                        // 设置 当前播放的歌曲
                        localStorage.setItem("currentSong", JSON.stringify(obj))
                        this.currentSong = song;
                        this.$Message.success("上一曲")
                        setTimeout(() => {
                            $("#ios-play").fadeIn();
                            $("#ios-pause").fadeOut();
                            this.$refs.musicPlayer.pause();
                            
                        }, 10)
                    }
                }else{
                    if(this.$refs.musicPlayer.src.split("?")[1] == "id=0"){
                        this.$confirm("请先添加歌曲", "提示", {
                            confirmButtonText:"确定",
                            cancelButtonText:"取消",
                            type:"warning"
                        }).then(() => {}).catch(() => {})
                        
                    }else{
                        const song = prevSong();
                        this.$refs.musicPlayer.src = "http://localhost:8633/api/music/nowmusic?id=" + song._id
                        const obj = [song];
                        localStorage.setItem("currentSong", JSON.stringify(obj))
                        this.currentSong = song;
                        this.$Message.success("上一曲")
                        setTimeout(() => {
                            $("#ios-play").fadeOut();
                            $("#ios-pause").fadeIn();
                            this.$refs.musicPlayer.play();
                        }, 10)
                    }
                }
            }else{
                this.loginModal = true;
            }
        },
        // 播放或暂停
        play_pause(){
            if(hasLogin()){
                if(this.$refs.musicPlayer.src.split("?")[1] == "id=0"){
                    this.$confirm("请先添加歌曲", "提示", {
                        confirmButtonText:"确定",
                        cancelButtonText:"取消",
                        type:"warning"
                    }).then(() => {}).catch(() => {})
                }else if(this.$store.getters.songList.length == 1){
                    console.log(111)
                    const song = nextSong();
                    this.$refs.musicPlayer.src = "http://localhost:8633/api/music/nowmusic?id=" + song._id
                    const obj = [song];
                    localStorage.setItem("currentSong", JSON.stringify(obj))
                    this.currentSong = song;
                    if(localStorage.play == "0"){
                        this.$Message.success("播放")
                        this.$refs.musicPlayer.play();
                        $("#ios-play").fadeOut();
                        $("#ios-pause").fadeIn();
                        localStorage.play = 1;
                    }else{
                        this.$refs.musicPlayer.pause();
                        this.$Message.success("暂停")
                        $("#ios-play").fadeIn();
                        $("#ios-pause").fadeOut();
                        localStorage.play = 0;
                    }
                }else{
                    if(this.$refs.musicPlayer.paused){
                        this.$Message.success("播放")
                        this.$refs.musicPlayer.play();
                        $("#ios-play").fadeOut();
                        $("#ios-pause").fadeIn();
                        localStorage.play = 1;
                    }else{
                        this.$refs.musicPlayer.pause();
                        this.$Message.success("暂停")
                        $("#ios-play").fadeIn();
                        $("#ios-pause").fadeOut();
                        localStorage.play = 0;
                    }
                }
            }else{
                this.loginModal = true;
            }
        },
        // 播放下一首
        playNext(){
            if(hasLogin()){
                if(localStorage.play == '0'){
                    console.log(11)
                    if(this.$refs.musicPlayer.src.split("?")[1] == "id=0"){
                        this.$confirm("请先添加歌曲", "提示", {
                            confirmButtonText:"确定",
                            cancelButtonText:"取消",
                            type:"warning"
                        }).then(() => {}).catch(() => {})
                        
                    }else{
                        const song = nextSong();
                        //取 数据库中 通过歌曲id找到该歌曲
                        this.$refs.musicPlayer.src = "http://localhost:8633/api/music/nowmusic?id=" + song._id
                        const obj = [song];
                        localStorage.setItem("currentSong", JSON.stringify(obj))
                        this.currentSong = song;
                        this.$Message.success("下一曲")
                        setTimeout(() => {
                            $("#ios-play").fadeIn();
                            $("#ios-pause").fadeOut();
                            this.$refs.musicPlayer.pause();
                        }, 10)
                    }
                }else{
                    if(this.$refs.musicPlayer.src.split("?")[1] == "id=0"){
                        this.$confirm("请先添加歌曲", "提示", {
                            confirmButtonText:"确定",
                            cancelButtonText:"取消",
                            type:"warning"
                        }).then(() => {}).catch(() => {})
                        
                    }else{
                        const song = nextSong();
                        this.$refs.musicPlayer.src = "http://localhost:8633/api/music/nowmusic?id=" + song._id
                        const obj = [song];
                        localStorage.setItem("currentSong", JSON.stringify(obj))
                        this.currentSong = song;
                        this.$Message.success("下一曲")
                        setTimeout(() => {
                            $("#ios-play").fadeOut();
                            $("#ios-pause").fadeIn();
                            this.$refs.musicPlayer.play();
                        }, 10)
                    }
                }
            }else{
                this.loginModal = true;
            }
        },
        // 顺序播放
        orderCycle(){
            if(hasLogin()){
                $(".order-cycle").css("color","rgb(196, 196, 26)");
                $(".single-cycle").css("color","rgb(219, 217, 217)");
                this.$store.setPlayModle = 1;
                nextSong();
                this.$Message.success("顺序播放")
                localStorage.setItem("playModle", 1);

            }else{
                this.loginModal = true;
            }
        },
        // 单曲循环
        singleCycle(){
            if(hasLogin()){
                $(".single-cycle").css("color","rgb(196, 196, 26)");
                $(".order-cycle").css("color","rgb(219, 217, 217)");
                this.$store.setPlayModle = -1;
                nextSong();
                this.$Message.success("单曲循环")
                localStorage.setItem("playModle", -1);
            }else{
                this.loginModal = true;
            }
        },
        // 静音或最大
        min_max(){
            if(hasLogin()){
                if(this.$refs.musicPlayer.volume == 0){
                    this.$refs.musicPlayer.volume = 1;
                    $(".minormax").css("color","rgb(219, 217, 217)")
                    this.$Message.success("取消静音")
                }else{
                    this.$refs.musicPlayer.volume = 0
                    $(".minormax").css("color","rgb(196, 196, 26)")
                    this.$Message.success("静音")
                }
            }else{
                this.loginModal = true;
            }
        },
        // 减小音量
        reduce_v(){
            if(hasLogin()){
                $(".minormax").css("color","rgb(219, 217, 217)")
                this.$Message.success("音量-")
                if(this.$refs.musicPlayer.volume > 0.05){
                    this.$refs.musicPlayer.volume -= 0.05;
                }else{
                    this.$refs.musicPlayer.volume = 0;
                }
            }else{
                this.loginModal = true;
            }
        },
        // 增加音量
        add_v(){
            if(hasLogin()){
                $(".minormax").css("color","rgb(219, 217, 217)")
                this.$Message.success("音量+")
                if(this.$refs.musicPlayer.volume < 0.95){
                    this.$refs.musicPlayer.volume += 0.05;
                }else{
                    this.$refs.musicPlayer.volume = 1;
                }
            }else{
                this.loginModal = true;
            }
        },
        // 回首页
        toHome_page(){
            this.$route.path == "/home/index" ? console.log("不能前进了") : this.$router.push("/")
        },
        // 去已选界面
        selected_list(){
            if(hasLogin()){
                this.$Message.success("已选歌曲")
                this.$router.push("/home/selected");
            }else{
                this.loginModal = true;
            }
        },
        // 登录
        submit(formName){
            this.$refs[formName].validate(valid => {
                if(valid){
                    wsmLoading.start();
                    this.loginModal = false;
                    setTimeout(() => {
                        this.$axios.post("http://localhost:8633/api/user/login", this.ruleForm)
                            .then(res => {
                                this.$nextTick(() => {
                                    console.log(res);
                                    this.$Message.success(res.data.result);
                                    localStorage.setItem("userToken", res.data.token);
                                    const decoded = jwt_decode(res.data.token);
                                    this.$store.dispatch("setAuthorizated", true);
                                    this.$store.dispatch("setUser", decoded);
                                    wsmLoading.end();
                                    this.ruleForm.account = "";
                                    this.ruleForm.password = "";
                                })
                            }).catch(err => {
                                this.loginModal = true;
                                console.error(err.response)
                            })
                    }, 300)
                }else{
                    console.log(111)
                }
            })
        },
        // 下机
        logout(){
            this.$confirm("你确定要提前下机吗", "提示", {
                confirmButtonText:"确定",
                cancleButtonText:"取消",
                type:"warning"
            }).then(() => {
                wsmLoading.start("正在处理...");
                setTimeout(() => {
                    this.$nextTick(() => {
                        this.$store.dispatch("clearState");
                        this.$store.dispatch("setCurrentSong", {id:0});
                        this.$store.dispatch("songList", []);
                        this.$store.dispatch("playModle", 1);
                        this.$route.path == "/home/index" ? null : this.$router.push("/home/index")
                        this.$router.go(0);
                        wsmLoading.end();
                    })
                }, 1000)
            }).catch(() => {})
        }
    },
    computed:{
        isLogin(){
            return this.$store.getters.isAuthorizated;
        },
        currentPoster(){
            if(this.$store.getters.currentSong.poster){
                return "http://localhost:8633/api/music/poster?img=" + this.$store.getters.currentSong.poster;
            }else{
                return  require("../assets/image/default-song-bg.jpg");
            }
        },
        currentSong:{
            get(){
                if(this.$store.getters.songList.length == 1){
                    console.log("一首歌")
                    
                    if(localStorage.play == "0"){
                        $("#ios-play").fadeIn();
                        $("#ios-pause").fadeOut();
                    }else{
                        $("#ios-play").fadeOut();
                        $("#ios-pause").fadeIn();
                    }
                }else{
                    if(localStorage.play == "0"){
                        setTimeout(() => {
                            document.getElementById("musicPlayer").pause();
                        }, 10)
                        $("#ios-play").fadeIn();
                        $("#ios-pause").fadeOut();
                    }else{
                        setTimeout(() => {
                            document.getElementById("musicPlayer").play();
                        }, 10)
                        $("#ios-play").fadeOut();
                        $("#ios-pause").fadeIn();
                    }
                }
                this.nextSong = nextSong();
                return this.$store.getters.currentSong;
            },
            set(val){
                this.$store.dispatch("setCurrentSong", val);
            }
        }
    }
}
</script>
<style lang="less" scoped>
.bottom_btn{
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    perspective:1200px;
    position: relative;
    .container{
        width: 80%;
        height: 100%;
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
        padding: 0px 40px;
        background-color: rgba(0, 0, 0, .3);
        transform: rotateX(30deg);
        perspective:1200px;
        z-index: 2;
    }
    .inner-box{
        height: 70%;
        width: 75%;
        position: absolute;
        z-index: 4;
        background-color: transparent;
        display: flex;

        .left{
            flex: 1;
            height: 100%;
            width: 100%;
            display: flex;

            .selectd_home,.selected,.addvolume,.reducevolume{
                height: 100%;
                flex: 1;
                font-size: 30px;
                text-align: center;
                color: rgb(189, 226, 247);
                div{
                    font-size: 10px;
                }
                cursor: pointer;
            }

            .selected,.selected,.addvolume,.reducevolume{
                color: yellow;
                &:hover{
                    color:rgb(0, 132, 255);
                }
            }
        }
        .middle{
            flex: 1;
            width: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
       
            img{
                width: 65px;
                height: 65px;
                border-radius: 50%;
                filter: blur(1px);
                z-index: 2;
                position: relative;
                top: -20px;

            }
            &:hover{
                .control-btn{
                    display: flex;
                    // background-color: #eee;
                    height: 55px;
                  
                }
            }

            .control-btn{
                position: absolute;
                width: 50%;
                height: 50px;
                z-index: 20;
                background-color: rgba(0, 0, 0, .3);
                display: none;

                .prev-btn, .play, .next-btn{
                    flex: 1;
                    text-align: center;
        
                    font-size: 20px;
                    color: rgb(220, 225, 228);
                    cursor: pointer;

                    &:hover{
                        transform: scale(1.02);
                        color: rgb(120, 129, 138);
                    }
                }
                .prev-btn{
                    text-align: left;
                    padding-left: 10px;
                }
                .next-btn{
                    text-align: right;
                    padding-right: 10px;
                }
            }
        }
        .right{
            flex: 1;
            height: 100%;
            width: 100%;
            display: flex;

            .minormax,.single-cycle, .order-cycle, .login{
                height: 100%;
                flex: 1;
                font-size: 30px;
                text-align: center;
                color: rgb(153, 14, 14);
                div{
                    font-size: 10px;
                }
                cursor: pointer;
            }
            .single-cycle, .order-cycle, .minormax{
                color: yellow;
                &:hover{
                    color:rgb(0, 132, 255);
                }
            }
        }

    }
    //图片不停旋转
    @-webkit-keyframes rotation{
        from {-webkit-transform: rotate(0deg);}
        to {-webkit-transform: rotate(360deg);}
    }
    .an{
        -webkit-transform: rotate(360deg);
        animation: rotation 3s linear infinite;
        -moz-animation: rotation 3s linear infinite;
        -webkit-animation: rotation 3s linear infinite;
        -o-animation: rotation 3s linear infinite;
    }
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 200%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
