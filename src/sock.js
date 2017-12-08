import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3001');

function testCall () {
    socket.emit('join')
}

export {testCall}