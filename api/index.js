import express from 'express';
const app = express();
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoute from './routes/comment.route.js'
import cookieParser from 'cookie-parser';
import path from 'path'
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

   const __dirname=path.resolve();


app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRoutes);
app.use('/api/post',postRoutes)

app.use('/api/comment',commentRoute)

app.use(express.static(path.join(__dirname,'/client/dist')))
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'client','dist','index.html'))
})

app.use( (err,req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({ success: false, statusCode, message: message });
});
