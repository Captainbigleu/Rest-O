import express =  require('express');
import { CommandesController} from '../controllers/commandeController';

export const commandeRouter = express.Router();
const commandeController = new CommandesController();

commandeRouter.get('/:id', commandeController.getCommande);