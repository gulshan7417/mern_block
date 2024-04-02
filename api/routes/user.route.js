import express from 'express';
const router = express.Router();
import {deleteUser, signout, test, updateUser} from '../controllers/user.controller.js'
import { verifyToken } from '../utils/varifyUser.js';
import User from '../models/user.modal.js';


router.get('/test', test);
router.post
('/update/:id',verifyToken,updateUser)
router.delete('/delete/:userId',verifyToken,deleteUser);
router.post('/signout',signout)
export default router;
