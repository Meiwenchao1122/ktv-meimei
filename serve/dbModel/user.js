
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const userModel = mongoose.Schema({
    // 订单ID
    order_id:{
        require:true,
        type:String
    },
    // 开始时间
    startTime:{
        require:true,
        type:String
    },
    // 结束时间
    endTime:{
        require:true,
        type:String
    },
    // 金额
    money:{
        require:true,
        type:String
    },
    // 随机账号
    account:{
        require:true,
        type:String
    },
    // 加密后的密码
    password:{
        require:true,
        type:String,
        set(val){
            return bcrypt.hashSync(val, 10)
        }
    },
    publicpwd:{  // 明文, 防止忘记密码
        require:true,
        type:String
    }
})

module.exports = mongoose.model("user_and_orders", userModel);