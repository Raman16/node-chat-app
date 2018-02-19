[{
    id:'/#332323',
    name:'Andrew',
    room:'The Office Fans'
}]


class Users {
    constructor(){
        this.users=[];
    }
    addUser(id,name,room){
      var user={id,name,room}//es6 syntax
      this.users.push(user);
      return user;
    }
    removeUser(id){
       //user=this.users.filter((user)=>user.id===id)[0];
       var user=this.getUser(id);
       if(user){
           this.users=this.users.filter((user)=>user.id!==id);
       }
       return user;
    }
    getUser(id){
       return this.users.filter((user)=>user.id===id)[0];
    }
    getUserList(room){
          var users=this.users.filter((user)=>user.room===room);
          var namesArray=users.map((user)=>user.name);
          return namesArray;
    }

}
module.exports={Users};

//ES6 class
// class Person {
//   constructor(name,age){
//      this.name=name;
//      this.age=age;
//   }
//   getUserDescription(){
//       return `${this.name} Jen is 1 year(s) old`;
//   }
// }

// var me=new Person('Raman',27);
// var description=me.getUserDescription();
// console.log(description);