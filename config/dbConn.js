const mongoose = require('mongoose');

const connectDB = async () =>{
    try { //* try to connect with DB

        await mongoose.connect(process.env.DATABASE_URI,{
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        
    } catch (error) {
        console.log(error);
        // console.log("error");
    }

}

module.exports = connectDB;