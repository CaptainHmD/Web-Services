//TODO: login 
const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) {
        this.users=data
    }
}

const bcrypt = require('bcrypt');
const { json } = require('express');

//! JWT requirement
const jwt = require ('jsonwebtoken')
require('dotenv').config();
const fsPromises = require('fs').promises
const path = require('path')

//! end

const  handleLogin = async(req,res)=>{
    const {user,pwd}=req.body;
    if(!user || !pwd){return res.status(404).json({"message": "Username and Password required"})}

    // find the user that sent in 
    const foundUser = usersDB.users.find(person => person.username === user);
    if(!foundUser)return res.sendStatus(401); // 401 Unauthorized
    //evaluate password
    const math = await bcrypt.compare(pwd,foundUser.password) // compare for  encrypted password
    if (math) {
        //TODO: here  we will create JWTs 
        const accessToken = jwt.sign(
            {'username':foundUser.username},
            process.env.ACCESS_TOKEN_SECRET,{expiresIn:'30s'}
        );
        const refreshToken = jwt.sign(
            {'username':foundUser.username},
            process.env.refresh,{expiresIn:'1d'}
        );

        //! saving refresh token with current user
        const otherUsers = usersDB.users.filter(person=> person.username !== foundUser.username);
            const currentUser = {...foundUser,refreshToken};
            usersDB.setUsers([...otherUsers,currentUser]);
            await fsPromises.writeFile(
                path.join(__dirname,'..','model','users.json'),
                JSON.stringify(usersDB.users)
            )


        // res.json({"success":`user: ${user} is log in`})
        res.json({accessToken});
        
    }else{
        res.sendStatus(401)// 401 Unauthorized
    }
}

module.exports={handleLogin}