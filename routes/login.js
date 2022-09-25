const express = require('express');
const router = express.Router();
const loginControllers = require('../controllers/loginControllers');
const path = require('path')
const root = path.join(__dirname, '..')


router.post('/', loginControllers.handleLogin);
router.get('/', (req, res) => {
    console.log(req);
    res.sendFile(path.join('public', 'views', 'index.html'), { root: root })

})

module.exports = router;