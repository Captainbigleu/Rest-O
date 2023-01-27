import express = require('express');
import { MenuController } from '../controllers/menuController';
import { verifyToken } from '../middleware/auth';

export const menuRouter = express.Router();
const menuController = new MenuController();

menuRouter.get('/', menuController.allMenu);
menuRouter.get('/:id', menuController.menuById);
menuRouter.post('/', verifyToken, menuController.newMenu);
menuRouter.put('/:id', verifyToken, menuController.changeMenu);
menuRouter.delete('/:id', verifyToken, menuController.delMenu);
