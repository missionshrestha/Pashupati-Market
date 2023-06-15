import mongoose from 'mongoose';
import colors from 'colors';

import dotenv from 'dotenv';


//dotenv config
dotenv.config();

const connectDB = async () => {

    try {

        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected To Mongodb Databsase ${conn.connection.host}`.bgMagenta .white)
    } catch (error) {
        console.log(`Error in MongoDB ${error}`.bgRed.white);
    }
}

export default connectDB;