import express from 'express';
const router = express.Router();
import {deleteUser, getUser, getUsers, signout, test, updateUser} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/varifyUser.js';



router.get('/test', test);
router.post
('/update/:id',verifyToken,updateUser)
router.delete('/delete/:userId',verifyToken,deleteUser);
router.post('/signout',signout)
router.delete('/delete/:userId', verifyToken, deleteUser);
router.get('/getusers',verifyToken,getUsers)
router.get('/:userId',getUser)
export default router;
