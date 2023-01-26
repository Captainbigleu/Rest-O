import express = require('express');
import { UserController } from '../controllers/userController';

export const userRouter = express.Router();

const userController = new UserController();

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
