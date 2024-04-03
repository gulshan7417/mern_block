import express from 'express';
const router = express.Router();
import {deleteUser, getUsers, signout, test, updateUser} from '../controllers/user.controller.js'
import { verifyToken } from '../utils/varifyUser.js';



router.get('/test', test);
router.post
('/update/:id',verifyToken,updateUser)
router.delete('/delete/:userId',verifyToken,deleteUser);
router.post('/signout',signout)
router.get('/getusers',verifyToken,getUsers)
router.delete('/delete/:userId', verifyToken, deleteUser);
export default router;
