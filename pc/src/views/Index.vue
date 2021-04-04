<template>
    <div class="index-view">
        <!-- 首页内容 -->
        <!-- <div class="content">
            <div class="left-content">
                <div class="top1">
                    <div class="left1">
                        <div @click="goArtist"></div>
                    </div>
                    <div class="right1">
                        <div class="top2">  
                            <div class="left2"><div @click="goABC"></div></div>
                            <div class="right2"><div @click="goLanguage"></div></div>
                        </div>
                        <div class="bottom2"><div @click="goStyle"></div></div>
                    </div>
                </div>
                <div class="bottom1"><div @click="goKtvLikes"></div></div>
            </div>
            <div class="right-content" @click="goHot()"><div></div></div>
        </div> -->
        <div class="content">
            <div class="left_content">
                <img src="../assets/image/paihangbang.png" alt=""  @click="goHot()" >
            </div>
            <div class="right_content">
                <div class="r_top">
                    <div class="top">
                        <img src="../assets/image/fengge.png" alt=""  @click="goStyle">
                    </div>
                    <div class="top">
                        <img src="../assets/image/xitong.png" alt="" @click="goKtvLikes"  >
                    </div>
                    <div class="top">
                        <img src="../assets/image/pingying.png" alt=""  @click="goABC">
                    </div>
                </div>
                <div class="r_bottom">
                   <div class="rb_left">
                       <img src="../assets/image/yuzhong.png" alt="" @click="goLanguage" ></div> 
                   <div class="rb_right">
                       <img src="../assets/image/gexing.png" alt=""  @click="goArtist">
                       </div> 
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import hasLogin from "@/config/isLogin";
export default {
    name:"index-view",
    data(){
        return{

        }
    },
    methods:{
        goHot(){
            if(hasLogin()){
                this.$router.push('/home/hot');
            }
        },
        goArtist(){
            if(hasLogin()){
                this.$router.push('/home/artist');
            }
        },
        goABC(){
            if(hasLogin()){
                this.$router.push('/home/abc');
            }
        },
        goLanguage(){
            if(hasLogin()){
                this.$router.push('/home/language');
            }
        },
        goStyle(){
            if(hasLogin()){
                this.$router.push('/home/style');
            }
        },
        goKtvLikes(){
            if(hasLogin()){
                this.$router.push('/home/ktvlikes');
            }
        }
    }
}
</script>
<style lang="less" scoped>
.index-view{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .content{
        width: 1100px;
        height: 500px;
        // border: 1px solid #000;
        display: flex;
        .left_content{
            flex: 3;
 
                padding: 20px;
               img{
                   height: 100%;
                        width: 280px;
                        display: block;
                        border-radius: 20px;
                        transition: all 750ms;
                &:hover{
                    transform: scale(1.03);
                    cursor: pointer;
                    box-shadow: 1px 1px 1px rgba(0, 0, 0, .4);
                }
                    }
            
        }
        .right_content{
            flex: 7;
            .r_top{
                height: 250px;
                display: flex;
                .top{
                    flex: 1;
                    padding: 20px;
                    img{
                        width: 100%;
                        height: 100%;
                        display: block;
                        border-radius: 20px;
                        transition: all 750ms;
                &:hover{
                    transform: scale(1.03);
                    cursor: pointer;
                    box-shadow: 1px 1px 1px rgba(0, 0, 0, .4);
                }
                    }
                }
            }
            .r_bottom{
                height: 250px;
                display: flex;
                .rb_left{
                    flex: 1;
                    padding: 20px 20px;
                     img{
                        width: 100%;
                        height: 100%;
                        display: block;
                        border-radius: 20px;
                        transition: all 750ms;
                &:hover{
                    transform: scale(1.03);
                    cursor: pointer;
                    box-shadow: 1px 1px 1px rgba(0, 0, 0, .4);
                }
                    }
                }
                .rb_right{
                    flex: 2;
                    padding: 20px 20px;
                    box-sizing: border-box;
                     img{
                        width: 100%;
                        height: 100%;
                        display: block;
                        border-radius: 20px;
                        transition: all 750ms;
                &:hover{
                    transform: scale(1.03);
                    cursor: pointer;
                    box-shadow: 1px 1px 1px rgba(0, 0, 0, .4);
                }
                    }
                }
            }
        }


    }
}
</style>