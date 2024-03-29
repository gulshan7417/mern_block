import User from '../models/user.modal.js';
import bcrypt from 'bcryptjs'
export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if(!username || !email || !password){
    res.json("All field are required");
  }

       const hashPassword= bcrypt.hashSync(password,10);

      const newUser=new User({
        username,
        email,
        password:hashPassword
      })

      try {
        await newUser.save();

      } catch (error) {
          res.status(500).json({message:error.message})
      }

    res.json({message:'Signup successful'});
  
};
