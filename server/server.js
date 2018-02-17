const path=require('path');
const publicPath=path.join(__dirname,'../public');
const port=process.env.PORT || 4010;

const express=require('express');
const http=require('http');
const socketIO=require('socket.io');


var app=express();
// var server=http.createServer((req,res)=>{

// });

    

var server=http.createServer(app);
var io=socketIO(server);
//using io now we can communicate between client and server
app.use(express.static(publicPath));


//io.on:  lets us register an event listenner

io.on('connection',(socket)=>{  //this socket argument is similar to we acces in index.html
    //connection->makes a new connection.
    console.log('New User Connected...');
    socket.on('disconnect',(socket)=>{
        console.log('User was disconnected....');
    })
});


//websocket is a persistent technology...i.e client and server both keeps communication cahnnels open
//for as long as both of them want to, if the server shut down then client doent have choice
//but client try to connect to server, thinking conneciton lost.




//Basically Behind scene express uses 'http' server i.e http.createServer() whene we call app.listen
// app.listen(port,()=>{
//     console.log(`server is up on ${port}`);
// })

server.listen(port,()=>{
    console.log(`server is up on ${port}`);
})