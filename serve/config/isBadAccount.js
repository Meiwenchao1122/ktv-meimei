// 超市下机拦截
const UserOrOrders = require("../dbModel/user");
module.exports = async params => {
    let flag = false;
    try {
        const account = params.account;
        const user = await UserOrOrders.findOne({account})
        if(user){
            // 现在时间 超过了 订单下机的时间 那么强制下机
            if(new Date().getTime() > new Date(user.endTime).getTime()){
                console.log("过期用户");
                // 处理
                return flag;
            }else{
                console.log("合法用户");
                return !flag;
            }
        }else{
            console.log("不合法用户");
            return flag;
        }
    } catch (error) {
        console.error(error)
        return flag;
    }
    
}
