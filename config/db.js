import mongoose from 'mongoose';
import colors from 'colors';

import dotenv from 'dotenv';


//dotenv config
dotenv.config();

const connectDB = async () => {

    try {

        const conn = await mongoose.connect(process.env.MONGO_URL);
        // const conn = await mongoose.connect('mongodb+srv://admin-mission:passmission-MONGODB123@cluster0-missionshresth.tcwumzp.mongodb.net/pashupati-market');
        console.log(`Connected To Mongodb Databsase ${conn.connection.host}`.bgMagenta .white)
    } catch (error) {
        console.log(`Error in MongoDB ${error}`.bgRed.white);
    }
}

export default connectDB;