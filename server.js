const express = require('express')
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;

// !important 
app.use(express.static('public'));

app.use(express.urlencoded({extended:true}))
app.use(express.json());


app.get('/', (req,res)=>{
res.send('Test')
})

console.log(process.env.PORT);
//! routes
app.use('/users',require('./routes/users'));
app.use('/register',require("./routes/register"));
app.use('/login',require("./routes/login"));

app.listen(PORT ,()=>{
    console.log('Server is Listing to Port: ',PORT);
})