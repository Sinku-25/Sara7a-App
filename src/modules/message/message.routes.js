import express from 'express';
import * as messageController from './controller/message.controller.js'
import { auth } from '../../middleware/auth.js';
const messageRouter = express.Router();

messageRouter.post('/',messageController.addMessage);
messageRouter.get('/',auth,messageController.getMessages);
export default messageRouter;