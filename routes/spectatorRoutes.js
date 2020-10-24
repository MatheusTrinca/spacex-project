const express = require('express');
const router = express.Router();
const spectatorController = require('../controllers/spectatorController');

router.get('/', spectatorController.showIndexPage);

router.get('/login', spectatorController.showLoginPage);
router.post('/login', spectatorController.userLogin);

router.post('/signup' , spectatorController.userSignup)

router.get('/launches', spectatorController.showLaunches);


router.get('/favorites', spectatorController.showFavorites);
router.post('/favorites', spectatorController.addToFavorites);

router.post('/remove-favorited', spectatorController.removeFromFavorites);

module.exports = router