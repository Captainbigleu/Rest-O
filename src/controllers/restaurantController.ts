import { Request, Response } from 'express';
import { RestaurantService } from '../services/restaurantService';

const restaurantService = new RestaurantService();

export class RestaurantController {
    async getRestaurant(req: Request, res: Response) {
        const ville = req.body.ville;

        try {
            const restaurant = await restaurantService.getRestaurantByVille(
                ville
            );

            res.status(200).json({
                status: 'Success',
                message: 'Voici les restaurants de votre ville',
                data: restaurant,
            });
        } catch (err) {
            console.log(err);

            return res.status(500).json({
                status: 'Fail',
                message: 'erreur serveur',
                data: null,
            });
        }
    }
}
