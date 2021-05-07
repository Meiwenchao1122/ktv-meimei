
import store from "@/store"
function nextSong() {
    //下一曲
    if (store.getters.currentSong) {
        // 先看播放状态 -1为 没有播放
        if (localStorage.playModle == -1) {
            return store.getters.currentSong;
        } else {
            //查看播放列表是否有歌曲
            const songList = store.getters.songList;
            // 当前播放
            const currentSong = store.getters.currentSong;
            var songIndex = 0;
            songList.forEach((item, index) => {
                if (item._id == currentSong._id) {
                    songIndex = index;
                }
            })
            // 要是到了最后一首
            if (songIndex == songList.length - 1) {
                return songList[0]
            } else {
                return songList[songIndex + 1]
            }
        }
    } else {
        return { _id: 0 }
    }
}

export default nextSong