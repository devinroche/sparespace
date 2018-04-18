import openSocket from 'socket.io-client';

const socket = openSocket('https://testfart420.herokuapp.com');

function testCall () {
    socket.emit('join')
}

function postSpace(storageData){
    socket.emit('new space', storageData)
}
function postMsg(msg){
    socket.emit('peer-msg', msg)
}
export {
    testCall,
    postSpace,
    postMsg
}