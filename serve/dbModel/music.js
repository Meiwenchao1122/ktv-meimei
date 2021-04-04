
/**
 *    歌曲名, 歌手, 歌曲封面, 歌曲地址, 语种, 风格, 播放次数, 最新更新时间,  
 */
const mongoose = require("mongoose");

const musicModel = mongoose.Schema({
    songName:{
        require:true,
        type:String
    },
    artist:{
        require:true,
        type:String
    },
    poster:{
        require:true,
        type:String
    },
    src:{
        require:true,
        type:String
    },
    language:{
        type:String
    },
    style:{
        type:String
    },
    playcount:{
        type:String
    },
    date:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model("Music", musicModel)