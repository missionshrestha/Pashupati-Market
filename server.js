import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan'
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'


//database config
connectDB();

//dotenv config
dotenv.config();

//rest object
const app = express();


//middlewares
app.use(express.json())
app.use(morgan('dev'))


//routes  server.js

app.use('/api/v1/auth',authRoutes)

//rest api

app.get('/', (req, res) => {
    res.send("<h1>Hello</h1>");
})

//port 
const PORT = process.env.PORT || 8080;



app.listen(PORT, () => {
    console.log(`Sever running at ${process.env.DEV_MODE} on port ${PORT}`.bgCyan.white);
})
