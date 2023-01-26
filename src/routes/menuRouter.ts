import express = require('express');
import { MenuController } from '../controllers/menuController';
import { verifyToken } from '../middleware/auth';

export const menuRouter = express.Router();
const menuController = new MenuController();

menuRouter.post('/', verifyToken, menuController.newMenu);
menuRouter.put('/:id', verifyToken, menuController.newPrice);
menuRouter.delete('/:id', verifyToken, menuController.delMenu);
menuRouter.get('/', menuController.allMenu);
