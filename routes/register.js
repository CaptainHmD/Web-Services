const express = require('express');
const router = express.Router();
const registerControllers = require('../controllers/registerControllers');

const path = require('path')
const root = path.join(__dirname,'../')

router.post('/', registerControllers.handleNewUser);
router.get('/', (req,res)=>{
    res.sendFile(path.join('public','views','register.html'), { root: root })

});


module.exports = router;