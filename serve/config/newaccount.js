//产生随机账户
module.exports = time => {   // 添加time参数来模仿时间戳,  防止缓存, 多次账号密码一致
    //  xxxx @ yyy .com
    const pwdList = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let name = '',
        pwd = '';

    for (let j = 0; j < 9; j++) {
        name += pwdList[Math.floor(Math.random() * 9)];
    }
    for (let k = 0; k < 6; k++) {
        pwd += pwdList[Math.floor(Math.random() * 9)];
    }
    const account = name + '@qq.com';
    const password = pwd;

    return { account, password }
}