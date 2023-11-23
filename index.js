
const express = require('express')
const app = express();
const http = require('http');
const path = require('path');
const server = http.createServer(app);  // request listner
const socketio = require('socket.io')
const io = socketio(server) // object

  const users = {}


app.use('/', express.static(path.join(__dirname, 'public')))

io.on('connection', (socket)=>{
    console.log(`connection establish at ${socket.id}`)

    socket.on('send-msg', (data)=>{  // to received the msg from user
        //  console.log(data)
        // socket.emit('received-msg', {
            io.emit('received-msg', {
            msg: data.msg,
            // id : socket.id,
            username: users[socket.id]
        })
    })
     
    socket.on('login', (data)=>{
        //   console.log(data)
        users[socket.id]= data.username; // mapping the socket id with usersname
    })


})





const port = process.env.PORT || 3000;
server.listen(port, ()=>{
    console.log(`server connected at port ${port}`)
})