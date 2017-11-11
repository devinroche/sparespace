import Cookies from 'js-cookie';

function loginUser(uid){
    Cookies.set('id', uid, {maxAge: 86400});
}

function isLoggedIn(){
    return Boolean(Cookies.get("id"))
}
export default {
    loginUser,
    isLoggedIn 
};