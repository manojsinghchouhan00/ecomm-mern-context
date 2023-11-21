import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';

// config env
 dotenv.config();
 

//  rest object
const app = express();

//  rest object
app.get("/",(req,res)=>{
    res.send("<h1>Welcome to ecommerce web</h1>")
})

// port
const port = process.env.PORT || 8000 ;

// run listen
app.listen(port, ()=>{
    console.log(`server running on ${process.env.DEV_MODE} and port is ${port}`.green)
})