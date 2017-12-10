import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3001');

function testCall () {
    socket.emit('join')
}

function postSpace(storageData){
    socket.emit('new space', storageData)
}
export {
    testCall,
    postSpace
}