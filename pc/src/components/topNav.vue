<template>
    <div class="topNav">
        <Col :span="8">
            <div class="playing-name" v-if="currentSong._id != 0 && isLogin">正在播放:{{currentSong.songName}}</div>
        </Col>
        <Col :span="8">
            <div class="next-name" v-if="currentSong._id != 0 && isLogin">下一首:{{nextSong.songName}}</div>
        </Col>
        <Col :span="4" style="position:absolute;right:30px;">
            <div class="selected-sum" v-if="allSongList.length && isLogin">已选:{{allSongList.length}}首</div>
        </Col>
    </div>
</template>
<script>
import nextSong from "@/config/nextSong"
export default {
    name:"topNav",
    data(){
        return{
            nextSong:"",
        }
    },
    created(){
        
    },
    methods:{
        
    },
    computed:{
        allSongList(){
            return this.$store.getters.songList;
        },
        currentSong:{
            get(){
                this.nextSong = nextSong();
                return this.$store.getters.currentSong;
            },
            set(val){
                this.$store.dispatch("setCurrentSong", val);
            }
        },
        playModle(){
            this.nextSong = nextSong();
            return this.$store.getters.playModle;
        },
        isLogin(){
            return this.$store.getters.isAuthorizated;
        }
    },
    watch:{
        currentSong(){
            this.nextSong = nextSong();
        },
        playModle(){
            this.nextSong = nextSong();
            return this.$store.getters.playModle;
        }
    },
    mounted(){
        setTimeout(() => {this.currentSong = JSON.parse(localStorage.currentSong)[0] ? JSON.parse(localStorage.currentSong)[0] : {_id:0};}, 200)
        var that = this;
        var orignalSetItem = localStorage.setItem;
        localStorage.setItem = function(key,newValue){
            var setItemEvent = new Event("setItemEvent");
            setItemEvent.newValue = newValue;
            window.dispatchEvent(setItemEvent);
            orignalSetItem.apply(this,arguments);
        }
        window.addEventListener("setItemEvent", function (e) {
            setTimeout(() => {
                that.nextSong = nextSong();
            }, 10)
        });
    }
}
</script>
<style lang="less" scoped>
.topNav{
    width: 100%;
    height: 100%;
    line-height: 100%;
    padding-left: 20px;
    display: flex;
    background-image: linear-gradient(141deg,rgb(199, 56, 104) 20%,rgb(189, 67, 138) 50%, rgb(145, 42, 102) 75%);
    .selected-sum{
        height: 60px;
        line-height: 60px;
        text-align: left;
        font-size: 22px;
        color: aliceblue;
        font-weight: 700;
    }
    .next-name{
        height: 60px;
        line-height: 60px;
        text-align: center;
        font-size: 22px;
        color: aliceblue;
        font-weight: 700;
    }
    .playing-name{
        height: 60px;
        line-height: 60px;
        text-align: left;
        font-size: 22px;
        color: aliceblue;
        font-weight: 700;
    }


}
</style>