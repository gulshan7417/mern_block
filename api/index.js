import express from 'express';
const app = express();
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
dotenv.config();
mongoose
  .connect(
    'mongodb+srv://gulshan74:gulshan7417@nodejs.496dqfq.mongodb.net/mern-blog/?retryWrites=true&w=majority&appName=Nodejs'
  )
  .then(() => {
    console.log('MongoDb is Connected');
  })
  .catch((err) => {
    console.log(err);
  });

  
  
  
  app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
    
    app.use('/api/user', userRouter);
