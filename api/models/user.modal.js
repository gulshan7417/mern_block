import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        'https://static.vecteezy.com/system/resources/previews/007/319/933/original/black-avatar-person-icons-user-profile-icon-vector.jpg',
    },
    isAdmin:{
      type:Boolean,
      default:false
    }
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema); 

export default User;
