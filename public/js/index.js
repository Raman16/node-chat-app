var socket =io();//initiating a create from client to the server to open a 
//websocket and keep that connection open.


socket.on('connect',function(){  //event fired  //if we use arrow funtion it will crash on mobile/in other device...
    console.log('connected to server');

    socket.emit('createMessage',{
        To:'Raman',
        Text:'Hello winslet.How are you...?'
    });

});

socket.on('newMessage',function(message){  //event lintener
   console.log(message);
})

socket.on('disconnect',function(){
    console.log('disconnecte server.......');
})