const express = require('express');
const mongoose = require('mongoose');

const authRouter = require('./routes/authRouter');
const trainsRouter = require('./routes/trainsRouter');
const myTrainsRouter = require('./routes/myTrainsRouter');
const userRouter = require('./routes/userRouter');

const authMiddleware = require('./middleware/authMiddleware');
const PORT = process.env.PORT || 5000;
const app =  express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next();
})
app.use(express.json());
app.use('/auth', authRouter);
app.use('/user', authMiddleware, userRouter);
app.use('/trains',authMiddleware, trainsRouter)
app.use('/my-trains',authMiddleware, myTrainsRouter);
const  start = async () => {
    try{
        await mongoose.connect('mongodb+srv://ushidze:ushiMaster@cluster0.ogzmf.mongodb.net/users?retryWrites=true&w=majority', {
            autoIndex: true
        })
        app.listen(PORT, () => console.log('server start'));
    } catch(e){
        console.log(e)
    }
}

start();