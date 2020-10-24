const uuid = require('uuid');
const path = require('path');
const fs = require('fs');

const p = path.join(path.dirname(process.mainModule.filename), 'fake-data', 'usersData.json');

const getUsersFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if(err){
      cb([]);
    }
    cb(JSON.parse(fileContent));
  })
}

module.exports = class User{
  constructor(email, password){
    this.id = uuid.v4;
    this.email = email;
    this.password = password;
  }

  save(){
    getUsersFromFile(users => {
      users.push(this);
      fs.writeFile(p, JSON.stringify(users), err => console.log(err));
    })
  }

  static fetchAll(cb){
    getUsersFromFile(cb);
  }
}