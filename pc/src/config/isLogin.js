 

function isLogin(){
    if(!localStorage.userToken){
        return false;
    }else{
        return true;
    }
}

export default isLogin