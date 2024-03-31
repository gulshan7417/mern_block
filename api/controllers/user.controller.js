import User from '../models/user.modal.js';
import { errorHandler } from '../utils/error.js';
import bcrypt from 'bcryptjs';

export const test = (req, res) => {
  res.json({ message: 'API is working' });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only update your own account'));

  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 12);
    }

    // Fix the undefined variable `email`
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email, // Use req.body.email instead of email variable
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    // Fix the variable name to `updatedUser`
    const { password, ...rest } = updatedUser._doc;

    // Send the response after the database update operation
    res.status(200).json(rest);
  } catch (error) {
    // Handle errors
    next(error);
  }
};
