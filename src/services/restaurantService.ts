import { Restaurant } from '../entity/Restaurant';
import { TRestaurant } from '../types/TRestaurant';

export class RestaurantService {
    async getRestaurantByVille(
        ville: string
    ): Promise<TRestaurant[] | undefined> {
        const restaurant = await Restaurant.findByVille(ville);

        if (restaurant) {
            return restaurant;
        }

        return undefined;
    }
}
