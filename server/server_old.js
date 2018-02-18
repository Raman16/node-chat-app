const path=require('path');
const publicPath=path.join(__dirname,'../public');
const port=process.env.PORT || 7020;

const express=require('express');
const http=require('http');
const socketIO=require('socket.io');
const {generateMessage,generateLocationMessage}=require('./utils/messages');
const {isRealString}=require('./utils/validate');

var app=express();
var server=http.createServer(app);
var io=socketIO(server);
//using io now we can communicate between client and server
app.use(express.static(publicPath));


//io.on:  lets us register an event listenner

io.on('connection',(socket)=>{  //this socket argument is similar to we acces in index.html
    //connection->makes a new connection.
    console.log('New User Connected...');


    //socket.emit('newMessage',generateMessage('Admin','Welcome to chat app'));//from server to client who just joined//new connection
    //socket.broadcast.emit('newMessage',generateMessage('Admin','New User Joined'));/// from server to all client except who joined
    

    socket.on('join',(params,callback)=>{
     
        if(!isRealString(params.name) ||  !isRealString(params.room)){
           callback('Peru unnu group peru iyyi ra mentaloda');
       }
        
       console.log(params.room);

       socket.join(params.room);


       socket.emit('newMessage',generateMessage('Admin','Welcome to chat app'));//from server to client who just joined//new connection
       socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} User Joined`));/// from server to all client except who joined
       callback();



    });

    socket.on('createMessage',(message,callback)=>{ //custom event from client to server
     
        console.log(message);
      io.emit('newMessage',generateMessage(message.from,message.text));//to every one  //a new mesage comes and we emits to everyone
      callback();

    //Below code sends to everybody except to the one who sent's(i.e except to this socket)
    // socket.broadcast.emit('newMessage',{ //custom event from client to server
    //     from: message.from,
    //     text: message.text,
    //     createdAt:new Date().getTime()
    // });



   });

   socket.on('createLocationMessage',(coords)=>{
       console.log(coords);
       io.emit('newLocationMessage',generateLocationMessage('Admin',coords.lat,coords.lan));
   })

  


    socket.on('disconnect',(socket)=>{
        console.log('User was disconnected....');
    })
});
server.listen(port,()=>{
    console.log(`server is up on ${port}`);
})