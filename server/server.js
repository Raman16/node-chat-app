const path=require('path');
const publicPath=path.join(__dirname,'../public');
const port=process.env.PORT || 4050;

const express=require('express');
const http=require('http');
const socketIO=require('socket.io');


var app=express();
var server=http.createServer(app);
var io=socketIO(server);
//using io now we can communicate between client and server
app.use(express.static(publicPath));


//io.on:  lets us register an event listenner

io.on('connection',(socket)=>{  //this socket argument is similar to we acces in index.html
    //connection->makes a new connection.
    console.log('New User Connected...');

   socket.emit('newMessage',{  //custom event  //event emitter  //from server to client
       From:'Raman',
       Text:"Hello Winslet"
   });

   socket.on('createMessage',(message)=>{ //custom event from client to server
      console.log(message);
   });

    socket.on('disconnect',(socket)=>{
        console.log('User was disconnected....');
    })
});
server.listen(port,()=>{
    console.log(`server is up on ${port}`);
})