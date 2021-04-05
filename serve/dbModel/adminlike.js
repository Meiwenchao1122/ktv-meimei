
const mongoose = require("mongoose");

const adminLikeModel = mongoose.Schema({
    // 系统推荐 - 只需要 歌曲id
    s_id:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model("AdminLike", adminLikeModel);