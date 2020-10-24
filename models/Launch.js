const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const Favorite = require('./Favorite');

const p = path.join(path.dirname(process.mainModule.filename), 'fake-data', 'launchesData.json');

const getLaunchesFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if(err){
      cb([])
    }
    cb(JSON.parse(fileContent));
  })
}  

module.exports = class Launch{
  constructor(id, mission, date, description, duration, astronaut1, astronaut2){
    this.id = id;
    this.mission = mission;
    this.date = date;
    this.description = description;
    this.duration = duration;
    this.astronaut1 = astronaut1;
    this.astronaut2 = astronaut2;
    this.image = '/images/pngegg.png';
  }

    save(){
     getLaunchesFromFile(launches => {
      if(this.id){
        const existingLaunchIndex = launches.findIndex(launch => launch.id === this.id);
        const launchesUpdated = [...launches] // tira todos os elementos do array e salva em outro
        launchesUpdated[existingLaunchIndex] = this;
        fs.writeFile(p, JSON.stringify(launchesUpdated), err => console.log(err));
      }else{
        this.id = uuid.v4();
        launches.push(this);
        fs.writeFile(p, JSON.stringify(launches), err => console.log(err));
      }
    })
  }
  
  static fetchAll(cb){
    getLaunchesFromFile(cb);
  }

  static findById(id, cb){
    getLaunchesFromFile(launches => {
      const launch = launches.find(p => p.id == id);
      cb(launch);
    });
  }

  static delete(id) {
    getLaunchesFromFile(launches => {
      const updatedLaunch = launches.filter(launch => launch.id !== id);
      fs.writeFile(p, JSON.stringify(updatedLaunch), err => {
        if(!err){
          Favorite.delete(id);
        }
      });
    })
  }

}