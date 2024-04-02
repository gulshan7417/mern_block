import User from '../models/user.modal.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(errorHandler(400, 'All fields are required'));
  }

  try {
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    await newUser.save();

    res.json({ message: 'Signup successful' });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === '' || password === '') {
    return next(errorHandler(400, 'All fields are required'));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }

    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }

    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      'gulshan' 
    );

    const { password: pass, ...rest } = validUser._doc;
    return res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json(rest); 
  } catch (error) {
    next(error);
  }
};

export const google=async (req,res,next)=>{
  try {
        const user=await User.findOne({email:req.body.email})

       if(user){
          const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},'gulshan')
          const {password:pass,...rest}=user._doc;
          res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);
       }else{
         
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
         const hashPassword=await bcrypt.hash(generatedPassword,12);
         
         const newUser = new User({
           username:
             req.body.name.split(' ').join('').toLowerCase() +
             Math.random().toString(36).slice(-4),
           email: req.body.email,
           password: hashPassword,
           avatar:req.body.photo
         });
         await newUser.save();
         const token=jwt.sign({id:newUser._id,isAdmin:newUser.isAdmin},'gulshan');
         const {password:pass,...rest}=newUser._doc;
         res.cookie('access_token',token,{httpOnly:true}),status(200).json(rest)

       }

  } catch (error) {
    next(error)
  }
}
