
/**
 *    歌曲名, 歌手, 歌曲封面, 歌曲地址, 语种, 风格, 播放次数, 最新更新时间,  
 */
const mongoose = require("mongoose");

const musicModel = mongoose.Schema({
    //歌曲名
    songName:{
        require:true,
        type:String
    },
    //演唱歌手 
    artist:{
        require:true,
        type:String
    },
    //海报 - 歌曲头像
    poster:{
        require:true,
        type:String
    },
    // 歌曲路径
    src:{
        require:true,
        type:String
    },
    // 属于什么语种
    language:{
        type:String
    },
    // 属于什么风格
    style:{ type:String
    },
    // 播放次数
    playcount:{
        type:String
    },
    // 上传时间
    date:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model("Music", musicModel)