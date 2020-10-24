const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');


router.get('/admin-launch/:id', adminController.showAdminLaunch);

router.get('/admin-launch', adminController.showAdminLaunch);

router.get('/launches-edit', adminController.launchesEdit);

router.post('/add-launch', adminController.addLaunch);

router.post('/launches-edit', adminController.editedLaunch);

router.post('/delete-launch', adminController.deleteLaunch);


module.exports = router;