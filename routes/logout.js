const express = require('express');
const router = express.Router();
const logoutController = require('../controllers/logoutController');

const path = require('path')
const root = path.join(__dirname, '../')

router.get('/', logoutController.handleLogout);

module.exports = router;