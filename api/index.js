import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

  mongoose.connect('mongodb+srv://gulshan74:gulshan7417@nodejs.496dqfq.mongodb.net/mern-blog/?retryWrites=true&w=majority&appName=Nodejs').then(()=>{
    console.log("MongoDb is Connected")
  }).catch((err)=>{
    console.log(err)
  })



const app = express();
app.get('/', (req, res) => {
  res.send('Server is running ');
});
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
