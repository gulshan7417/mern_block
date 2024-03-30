import User from '../models/user.modal.js';
import bcrypt from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'


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


export const signin=async (req,res,next)=>{
  const {email,password}=req.body;
  try {
      if (!email || !password) {
        next(errorHandler(400, 'please provide email and password both'));
      }

      const validUser = await User.findOne({ email });
    if(!validUser){
      return next(errorHandler(404,'User not found'));
    }

      const validPassword=bcrypt.compareSync(password,validUser.password);
      if(!validPassword){
      return next(errorHandler(401,'Wrong credential!'))
      }

      const token=jwt.sign({id:validUser._id},'gulshan');
      const {password:Pass,...rest}=validUser._doc;
      res.cookie('access_token',token,{httpOnly:true,expires:new Date(Date.now()+24*60*60*1000000)}).status(200).json(rest)


  } catch (error) {
    next(error)
  }
}
