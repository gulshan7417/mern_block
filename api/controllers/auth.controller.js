import User from '../models/user.modal.js';
import bcrypt from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
export const signup = async (req, res,next) => {
  const { username, email, password } = req.body;

  if(!username || !email || !password){
    next(errorHandler(400,'All fields are required'));
  }

       const hashPassword=await bcrypt.hash(password,10);

      const newUser=new User({
        username,
        email,
        password:hashPassword
      })

      try {
        await newUser.save();

      } catch (error) {
          next(error)
      }

    res.json({message:'Signup successful'});
  
};


