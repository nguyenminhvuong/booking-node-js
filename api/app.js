const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const hotelRoute = require('./routes/hotels');
const roomRoute = require('./routes/rooms');

const app = express();

dotenv.config();

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to MongoDB');
    } catch(error){
        throw error;
    }
}

mongoose.connection.on('disconnected', () => {
    console.log('mongoDB disconnected!');
});

mongoose.connection.on('connected', () => {
    console.log('mongoDB connected!');
});

//middleware
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/hotels', hotelRoute);
app.use('/api/rooms', roomRoute);

app.listen(8800, () => {
    connect();
    console.log('Connected to backend');
})