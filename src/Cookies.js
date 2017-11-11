import Cookies from 'js-cookie';

function loginUser(uid){
    console.log(uid)
    Cookies.set('id', uid);
}

function isLoggedIn(){
    return Boolean(Cookies.get("id"))
}
export default {
    loginUser,
    isLoggedIn 
};