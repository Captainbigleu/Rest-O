import express = require('express');
import { RestaurantController } from '../controllers/restaurantsController';
import { verifyToken } from '../middleware/auth';

export const restaurantRouter = express.Router();
const restaurantController = new RestaurantController();

restaurantRouter.get('/search', restaurantController.getRestaurant);

restaurantRouter.get('/', restaurantController.getAllRestaurant);

restaurantRouter.post('/', verifyToken, restaurantController.createNewRest);

restaurantRouter.put('/:id', verifyToken, restaurantController.putVille);

restaurantRouter.delete(
    '/:id',
    verifyToken,
    restaurantController.delRestaurant
);
