const Launch = require('../models/Launch');
const User = require('../models/User');
const Favorite = require('../models/Favorite');

exports.showIndexPage = (req, res) => {
  res.render('index', {
    title: 'Home',
    path: '/index'
  });
}

exports.showLoginPage = (req, res) => {
  const signup = req.query.signup;
  if(!signup){
    res.render('login',{
      title: 'Login',
      path: '/login',
      signup: false
    });
  }else{
    res.render('login',{
      title: 'Signup',
      path: '/signup',
      signup: true
    });

  }
}

exports.showLaunches = (req, res) => {
  Launch.fetchAll(launches => {
    res.render('launches',{
      title: 'Lançamentos',
      path: '/launches',
      favoritedMode: false,
      editMode: false,
      launches
    });
  })
}

exports.showFavorites = (req, res) => {
  Favorite.getFavorites(favorites => {
    Launch.fetchAll(launches => {
      const launchesData = []
      for(launch of launches) {
        if(favorites.find(favorite => favorite.id === launch.id)){
          launchesData.push(launch);
        }
      }
      res.render('favorites', {
        title: 'Favoritos',
        path: '/favorites',
        editMode: false,
        favoritedMode: true,
        launches: launchesData
      });
    });
  });
}

exports.addToFavorites = (req, res) => {
  const launchId = req.body.id;
  Favorite.addToFavorite(launchId);
  res.redirect('/favorites');
}

exports.removeFromFavorites = (req, res) => {
  const id = req.body.id;
  Favorite.delete(id);
  res.redirect('/favorites');
}

exports.userSignup = (req, res) => {
  const newUserData = req.body;
  if(newUserData.password !== newUserData.confirmPassword){
    res.redirect('signup')
  }else{
    User.fetchAll(users => {
      const found = users.some(user => user.email === newUserData.email);
      if(!found){
        const newUser = new User(newUserData.email, newUserData.password)
        newUser.save();
        res.redirect('launches');
      }else{
        res.redirect('login');  // Trocar o redirect para o render para mandar mensagens de erro {error: }
      }
    })
  }
}

exports.userLogin = (req, res) => {
  const userData = req.body;
  User.fetchAll(users => {
    const found = users.some(user => user.email === userData.email);
    if(found){
      const foundData = users.filter(user => user.email === userData.email);
      if(foundData[0].password !== userData.password){
        res.redirect('login');
      }else{
        res.redirect('launches')
      }
    }else{
      res.redirect('signup');
    }
  })
}
