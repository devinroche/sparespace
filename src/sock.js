import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3001');

function testCall () {
    socket.emit('join')
}

function newPost(storageObj){
    socket.emit('new space', storageObj)
}

//***on refresh listings update all listings page for everyone connected
socket.on('refresh listings', () => {
    
})

export {
    testCall,
    newPost
}