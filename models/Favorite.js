const uuid = require('uuid');
const path = require('path');
const fs = require('fs');

const p = path.join(path.dirname(process.mainModule.filename), 'fake-data', 'favoritesData.json');

module.exports = class Favorite{

  static addToFavorite(id){
    let favorite = {}
    fs.readFile(p, (err, fileContent) =>{
      if(!err){
        favorite = JSON.parse(fileContent);
      }
      
      const findExisting = favorite.find(p => p.id === id);
      if(!findExisting){
        favorite.push({"id": id})
      }
      fs.writeFile(p, JSON.stringify(favorite), err => console.log(err))
    });
  }

  static delete(id) {
    fs.readFile(p, (err, fileContent) =>{
      if(err){
        return;
      }
      const favorite = JSON.parse(fileContent);
      let updatedFavorite = [...favorite];
      const filteredFavorites = updatedFavorite.filter(launch => launch.id !== id);
      fs.writeFile(p, JSON.stringify(filteredFavorites), err => console.log(err))
    });
  }

  static getFavorites(cb) {
    fs.readFile(p, (err, fileContent) =>{
      if(!err){
        cb(JSON.parse(fileContent));
      }else{
        cb(null);
      }
    });
  }
}
