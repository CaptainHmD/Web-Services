const express = require('express');
const router = express.Router();
const loginControllers = require('../controllers/loginControllers');

router.post('/', loginControllers.handleLogin);

module.exports = router;