//TODO: login 
const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) {
        this.users=data
    }
}

const bcrypt = require('bcrypt');

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
        res.json({"success":`user: ${user} is log in`})
        
    }else{
        res.sendStatus(401)// 401 Unauthorized
    }
}

module.exports={handleLogin}