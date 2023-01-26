import express =  require('express');
import { CommandesController} from '../controllers/commandeController';

export const commandeRouter = express.Router();
const commandeController = new CommandesController();

commandeRouter.get('/:id', commandeController.getCommande);
commandeRouter.get('/restaurant/:id', commandeController.getCommandeByRestaurantId);
commandeRouter.post('/', commandeController.createNewCommande);
commandeRouter.put('/:id', commandeController.updateNewCommande);