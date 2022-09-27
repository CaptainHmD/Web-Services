const express = require('express');
const route = express.Router();
const userDB = {
    users: require('../model/users.json'),
    setUsers: function (data) {
        this.users = data
    }
}
const path = require('path')
const root = path.join(__dirname, '../')
//! JWT
// const verifyJWT =require('../middleware/verifyJWT');

route.get('/', (req, res) => {
    res.sendFile(path.join('public', 'views', 'index.html'), { root: root })
})


route.get('/allusers', (req, res) => {
    res.sendFile(path.join('public', 'views', 'index.html'), { root: root })

})
route.get('/usersData', (req, res) => {
    res.send(userDB.users.username)

})
route.get('/userData', (req, res) => {
    console.log(req.headers);
    console.log(userDB.users.filter(user => user.username === req.user));
    // res.json(userDB.users.filter(user => user.username===req.user)[0].username)
    res.json(userDB.users.filter(user => user.username === req.user))

    // res.send(userDB.users.filter(user => user.username===req.username))

})
route.post('/allusers', (req, res) => {
    users.push({ name: req.body.name, num: users.length })

    res.redirect('/users/allusers');
})
route.get('/test', (req, res) => {
    res.sendFile(path.join('views', 'test.html'), { root: root })
})

module.exports = route;
