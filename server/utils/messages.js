var moment=require('moment');
var generateMessage=(from,text)=>{
   return {
       from,
       text,
       createdAt:moment().valueOf()
   }
};

var generateLocationMessage=(from,lat,lan)=>{

    return {
      from,
      url:`https://www.google.com/maps?q=${lat},${lan}`,
      createdAt:moment().valueOf()
    };
}
module.exports={generateMessage,generateLocationMessage}