//! register

const userDB={
    users: require('../model/users.json'),
    setUsers: function (data){
        this.users=data
    }
}

//! impotent 
const fsPromises = require('fs').promises; // for I/O operation 
const path = require('path');
const bcrypt = require('bcrypt');
const {Module}=require('module');

//TODO: defined handler for new user
// first we need async function for writing the data

const handleNewUser = async (req,res)=>{
    const {user,pwd}=req.body;
    if(!user || !pwd){return res.status(404).json({"message": "Username and Password required"})}

    // check duplicate
    const duplicate = userDB.users.find(person =>{return person.username ===user})
    if(duplicate){
        return res.sendStatus(409);// conflict
    }

    try {
        
   //TODO: encrypt the password and  create new user 

        //TODO: encrypt
        const hashedPwd = await bcrypt.hash(pwd,10); //! await

        //TODO: store the new user
        const newUser={"username":user,"password":hashedPwd}

        //TODO: pars the data to DB
        userDB.setUsers([...userDB.users, newUser]);

        //! write the username and password in users.js file (I/O operation)
        await fsPromises.writeFile(
        path.join(__dirname,'..','model','users.json'),
        JSON.stringify(userDB.users))

        res.status(201).json({'success':'new user created'})
    } catch (error) {
        res.status(500).json({'message':error.message})
    }
    
}
module.exports={handleNewUser}