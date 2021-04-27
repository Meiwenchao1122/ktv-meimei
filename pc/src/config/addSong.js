import store from "@/store";
import { MessageBox } from 'element-ui';
//添加歌曲到播放列表
function isExit(songInfo) {
    //在vuex中获取 播放列表
    const songList = store.getters.songList;
    //列表为空
    if (songList.length == 0) {
        //直接添加并播放
        localStorage.setItem("play", 1);
        localStorage.setItem("currentSong", JSON.stringify(songInfo));
        store.dispatch("setCurrentSong", songInfo)
    }
    let isexit = false;
    songList.forEach(item => {
        //遍历 播放列表,切换歌曲时有用
        item._id == songInfo._id ? isexit = true : "";
    })
    if (isexit) {
        //列表中已存在此歌曲
        MessageBox.confirm("请勿重复添加", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        }).then(() => { }).catch(() => { })
        return false;
    } else {
        //修改vuex中的数据, 也就是播放列表
        store.dispatch("setSongList", songInfo);
        const list = store.getters.songList;
        localStorage.setItem("songList", JSON.stringify(list));
        //提示已经添加
        console.log("已添加");
        return true;
    }
}

export default isExit
