//! register

// const userDB = {
//     users: require('../model/users.json'),
//     setUsers: function (data) {
//         this.users = data
//     }
// }


const User = require('../model/User');

//! impotent 
// const fsPromises = require('fs').promises; // for I/O operation  //! we don`t need these cuz we are switched to mongoDB 
// const path = require('path'); //! we don`t need these cuz we are switched to mongoDB 



const bcrypt = require('bcrypt');
const { Module } = require('module');

//TODO: defined handler for new user
// first we need async function for writing the data

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) { return res.status(400).json({ "message": "Username and Password required" }) }

    // check duplicate
    // const duplicate = userDB.users.find(person => { return person.username === user }) //! this line work with json file

    //mongodb for finding a duplicates
    const duplicate = await User.findOne({username:user}).exec();  // because we used async await we put  .exec() but if we have callback fun we don`t need it
    //! for exec() https://prnt.sc/1S5RTw4oK_rl
    console.log(duplicate);
    if (duplicate) {
        return res.sendStatus(409);// conflict
    }

    try {

        //TODO: encrypt the password and  create new user 

        //TODO: encrypt
        const hashedPwd = await bcrypt.hash(pwd, 10); //! await

       

        //TODO: pars the data to DB
        // userDB.setUsers([...userDB.users, newUser]);//! this line work with json file

        // //! write the username and password in users.js file (I/O operation)
        // await fsPromises.writeFile(//! this line work with json file
        //     path.join(__dirname, '..', 'model', 'users.json'),//! this line work with json file
        //     JSON.stringify(userDB.users))//! this line work with json file


 //TODO: In mongo we can create and  store the new user
    const result = await  User.create({
    "username": user,
    // "roles": { "User": 2001 }, // for user Roles && Authorization //! removed because we put default value in mongodb
    "password": hashedPwd

    })

        console.log('result:  ', result);
        res.status(201).json({ 'success': 'new user created', user, pwd })
    } catch (error) {
        res.status(500).json({ 'message': error.message })
    }

}
module.exports = { handleNewUser }