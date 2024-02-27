import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan'
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import cors from 'cors';

//database config
connectDB();

//dotenv config
dotenv.config();

//rest object
const app = express();


//middlewares
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))


//routes  server.js

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', categoryRoutes)

//rest api

app.get('/', (req, res) => {
    res.send("<h1>Hello</h1>");
})

//port 
const PORT = process.env.PORT || 8080;



app.listen(PORT, () => {
    console.log(`Sever running at ${process.env.DEV_MODE} on port ${PORT}`.bgCyan.white);
})

