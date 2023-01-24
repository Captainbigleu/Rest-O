import express = require('express');
import { RestaurantController } from '../controllers/restaurantController';

export const restaurantRouter = express.Router();
const restaurantController = new RestaurantController();

restaurantRouter.get('/', restaurantController.getRestaurant);
