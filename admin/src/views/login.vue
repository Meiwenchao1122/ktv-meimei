<template>
    <!-- 登录 -->
    <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/image/logo.png" alt="">
      </div>
      <!-- 登录表单区域 -->
      <el-form label-position="top" size="small" :inline-message="inlinemessage" :model="loginForm" :rules="loginRule" ref="loginForm" label-width="100px" class="login_form">
        <!-- 用户名 -->
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="loginForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input type="password" @keypress.enter.native="submitForm('loginForm')" show-password v-model="loginForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item label="验证码" prop="inputCaptcha">
            <div class="yzm">
                <el-input style="width:150px;" v-model="inputCaptcha" placeholder="验证码"></el-input>
                <img width="80" style="background:#EEE9E9;margin-left:30px;" ref="captcha" height="32" src="http://localhost:8633/api/safecode" @click="refreshCaptcha">
            </div>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>
<script>
import wsmLoading from "@/plugins/wsmLoading"
//获取 token
import jwt_decode from 'jwt-decode';
export default {
    name:"login",
    data(){
        const validateCaptcha = (rule, value, callback) => {
            if(!this.inputCaptcha.trim().length){
                callback(new Error('请输入验证码~'));
            }else{
                callback();
            }
        }
        return{
            inline:true,
            inlinemessage:false,
            loginForm:{
                email:"",
                password:""
            },
            loginRule:{
                email:[
                    {required:true,message:"邮箱不能为空",trigger:"blur"},
                    {type:"email",message:"请输入正确的邮箱",trigger:"blur"},
                ],
                password:[
                    {required:true,message:"密码不能为空",trigger:"blur"},
                    {min:6,max:20,message:"密码长度在6-20之间",trigger:"blur"}
                ],
                inputCaptcha:[
                    {required:true, validator:validateCaptcha,trigger:"blur"}
                ]
            },
            inputCaptcha:""
        }
    },
    methods:{
        // 登录
        submitForm(formName){
            this.$refs[formName].validate(valid => {
                if(valid){
                    wsmLoading.start("正在登录,请稍候...")
                    setTimeout(() => {
                        if(this.inputCaptcha.toLowerCase() == this.getCookie("captcha")){
                            this.$axios.post("http://localhost:8633/api/admin/account/login", this.loginForm)
                                .then(res => {
                                    if(res){
                                        // 解析token
                                        const {token} = res.data;
                                        localStorage.setItem("adminToken", token);
                                        const decoded = jwt_decode(token);
                                        // 存储vuex中
                                        this.$store.dispatch("setAdminInfo", decoded);
                                        this.$store.dispatch("isAdminAuthorization", true);
                                        this.$Message.success(`${decoded.username}登录成功`)
                                        wsmLoading.end();
                                        this.$router.push("/");
                                    }
                                })
                                .catch(error => {
                                    console.error(error.response);
                                    this.refreshCaptcha();
                                })
                        }else{
                            wsmLoading.end();
                            this.$Modal.confirm({
                                title:"错误",
                                content:"你输入的验证码有误,请重新输入验证码~",
                                type:"error",
                                onOk:()=>{
                                    // this.refreshCaptcha();
                                }
                            })
                        }
                    }, 900)
                }
            })
        },
        // 获取验证码cookie
        getCookie(cname){
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++){
                var c = ca[i].trim();
                if (c.indexOf(name)==0) return c.substring(name.length,c.length);
            }
            return "";
        },
        // 刷新验证码
        refreshCaptcha(){
            //通过请求获取验证码
            this.$refs.captcha.src = "http://localhost:8633/api/safecode?d=" + Math.random();
        },
    }
}
</script>
<style lang="less" scoped>

.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 450px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}

// 验证码区域
.yzm{
    display:flex;
    align-content:center;
    input{
        width: 160px;
        height: 32px;
        outline: none;
        border: 1px solid #eee;
        padding: 2px 15px;
        border-radius: 5px;
        font-size: 13px;
    }
    ::-webkit-input-placeholder{
        color:#bbb;
    }
    img:hover{
        cursor: pointer;
    }
}

</style>
