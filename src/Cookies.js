import Cookies from 'js-cookie';

function loginUser(uid, v){
    Cookies.set('id', uid, {maxAge: 86400});
    Cookies.set('v', v, {maxAge: 86400})
}

function isLoggedIn(){
    return Boolean(Cookies.get('id'))
}

function getId(){
    return Cookies.get('id')
}

function removeCookie(){
    Cookies.remove('id', { path: '/'})
}

export default {
    loginUser,
    isLoggedIn,
    getId,
    removeCookie,
};