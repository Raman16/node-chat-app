var socket =io();//initiating a create from client to the server to open a 
//websocket and keep that connection open.

function scrollToBottom(){
  //selectors 
  var messages=$('#messages');
  var newMessage=messages.children('li:last-child');
  //heights
  var clientHeight=messages.prop('clientHeight');//what user has height
  var scrollTop=messages.prop('scrollTop');
  var scrollHeight=messages.prop('scrollHeight');
  var newMessageHeight=newMessage.innerHeight();//last message
  var lastMessageHeight=newMessage.prev().innerHeight();//last but one message
  
  if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight>=scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect',function(){  //event fired  //if we use arrow funtion it will crash on mobile/in other device...
 
    var param=jQuery.deparam(window.location.search);
    socket.emit('join',param,function(err){
      if(err){
          alert(err);
          window.location.href="/";

      }
      else{
         console.log('No Error...');
      }
    });
    // console.log('connected to server');
    // socket.emit('newUser',{
    //     user:'Raman',
    //     message:'Hello Kate'
    // });


});

socket.on('newMessage',function(message){  //event lintener

//    var formattedTime=moment(message.createdAt).format('h:mm a');
//    var li=jQuery('<li></li>');
//    li.text(`${message.from} ${formattedTime}:${message.text}`);
//    jQuery('#messages').append(li);


   var template=$('#message-template').html();
   var html=Mustache.render(template,{
       text:message.text,
       from:message.from,
       createdAt:moment(message.createdAt).format('h:mm a')
   });
  
   $('#messages').append(html);

   scrollToBottom();

});

// socket.emit('createMessage',{
//     from:'Frank',
//     text:'Hi'
// },function(data){
//     console.log('got it',data);
// });

socket.on('disconnect',function(){
    console.log('disconnecte server.......');
})

socket.on('newLocationMessage',function(message){
  
    // var formattedTime=moment(message.createdAt).format('h:mm a');
    // var li=jQuery('<li></li>');
    // var a=jQuery('<a target="_bank">My current location</a>');
    // li.text(`${message.from} ${formattedTime}:`);
    // a.attr('href',message.url);
    // li.append(a);
    // jQuery('#messages').append(li);

    var template=$('#location-message-template').html();
    var html=Mustache.render(template,{
        from:message.from,
        url:message.url,
        createdAt:moment(message.createdAt).format('h:mm a')
    })
    $('#messages').append(html);
    scrollToBottom();   

})


$(document).on('submit','#message-form',function(e){
  e.preventDefault();
  
  var messageTextbox=$('#message');
  socket.emit('createMessage',{
      from:'User',
      text:messageTextbox.val()
  },function(data){
      messageTextbox.val('');
  });


});


var locationButton=jQuery('#send-location');
locationButton.on('click',function(){

    
    if(!navigator.geolocation){
        return alert("arey o howle geolocation not supported...");
    };

    locationButton.attr('disabled','disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position){
      //console.log(position);
  
      locationButton.removeAttr('disabled').text('Send');

      socket.emit('createLocationMessage',{
          lat:position.coords.latitude,
          lan:position.coords.longitude,
      });


    },function(){
            locationButton.removeAttr('disabled');
            alert("location evu ra iyya...");
    });




})