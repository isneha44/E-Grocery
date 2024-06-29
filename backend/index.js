import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors())

import productRouter from './routes/productRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRouter.js';



const port = 3000;

// server running status 
app.get('/api' , (req, res) => {res.send('Server is up and running')});

// Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);



// not found handler
app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    error.status = 404;
    next(error);
});

// error handler
app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data ,status: false});
});


app.listen(port, () => {console.log(`Listening on port ${port}`)});


mongoose.connect('mongodb+srv://root:1234@cluster0.jqx7t93.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => console.log('DB Connected'))