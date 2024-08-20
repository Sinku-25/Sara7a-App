import express from 'express';
import * as userController from './controller/user.controller.js'
const router = express.Router();

router.get('/',userController.getAllUsers);
router.post('/signup',userController.signUp);
router.post('/signin',userController.signIn);
router.get('/verify/:token',userController.verifyEmail);
router.put('/',userController.updateUser);
router.delete('/:_id',userController.deleteUser);


export default router;