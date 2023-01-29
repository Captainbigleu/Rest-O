import express = require('express');
import { CommandesController } from '../controllers/commandeController';
import { verifyToken } from '../middleware/auth';

export const commandeRouter = express.Router();
const commandeController = new CommandesController();

commandeRouter.get('/:id', verifyToken, commandeController.getOneCommande);
commandeRouter.get(
    '/restaurant/:id',
    verifyToken,
    commandeController.getCommandeByRestaurantId
);
commandeRouter.post('/', verifyToken, commandeController.createNewCommande);
commandeRouter.put('/:id', verifyToken, commandeController.updateNewCommande);
commandeRouter.put(
    '/delete/:id',
    verifyToken,
    commandeController.deleteCommandeById
);
