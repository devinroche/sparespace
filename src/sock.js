import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3001');

function testCall () {
    socket.emit('join')
}

function newPost(storageObj){
    socket.emit('new space', storageObj)
}

socket.on('refresh listings')

export {
    testCall,
    newPost
}