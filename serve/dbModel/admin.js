const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const adminModel = mongoose.Schema({
    email:{
        require:true,
        type:String
    },
    username:{
        require:true,
        type:String
    },
    password:{
        require:true,
        type:String,
        set(val){
            return bcrypt.hashSync(val, 10)
        }
    },
    // 身份 角色
    identity:{
        // require:true,
        type:String
    },
    // 创建日期
    date:{
        require:true,
        type:String
    }
})

module.exports = mongoose.model("Admin", adminModel)