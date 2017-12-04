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

function isVerified(){
    return Cookies.get('v')
}

function isExpress(){
    return Boolean(Cookies.get('id')) && Boolean(Cookies.get('v'))
}

function removeCookie(){
    Cookies.remove('id', { path: '/'})
    Cookies.remove('v', { path: '/'})
}

export default {
    loginUser,
    isLoggedIn,
    getId,
    isVerified,
    removeCookie,
    isExpress
};