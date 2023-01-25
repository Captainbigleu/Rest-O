import express = require('express');
import { RestaurantController } from '../controllers/restaurantsController';

export const restaurantRouter = express.Router();
const restaurantController = new RestaurantController();

restaurantRouter.get('/search', restaurantController.getRestaurant);
restaurantRouter.get('/', restaurantController.getAllRestaurant);
restaurantRouter.post('/', restaurantController.createNewRest);
restaurantRouter.put('/:id', restaurantController.putVille);
restaurantRouter.delete('/:id', restaurantController.delRestaurant);
