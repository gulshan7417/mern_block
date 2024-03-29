import express from 'express';
const app = express();
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
app.use(express.json());
dotenv.config();
mongoose
  .connect(
    'mongodb+srv://gulshan74:gulshan7417@nodejs.496dqfq.mongodb.net/?retryWrites=true&w=majority&appName=Nodejs'
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
app.use('/api/auth', authRoutes);
