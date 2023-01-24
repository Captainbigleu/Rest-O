"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantRouter = void 0;
var express = require("express");
var restaurantController_1 = require("../controllers/restaurantController");
exports.restaurantRouter = express.Router();
var restaurantController = new restaurantController_1.RestaurantController();
exports.restaurantRouter.get('/', restaurantController.getRestaurant);
