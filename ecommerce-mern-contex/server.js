import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRout from "./routes/authRoute.js"
// config env
 dotenv.config();

 //  rest object
const app = express();

 // database config
 connectDB()
//  middleware
 app.use(express.json());
 app.use(morgan('dev'))

 // route
 app.use('/api/v1/auth', authRout);


//  rest api
app.get("/",(req,res)=>{
    res.send("<h1>Welcome to ecommerce web</h1>")
})

// port
const port = process.env.PORT || 8000 ;

// run listen
app.listen(port, ()=>{
    console.log(`server running on ${process.env.DEV_MODE} and port is ${port}`.green)
})