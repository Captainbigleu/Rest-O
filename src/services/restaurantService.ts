import { InsertResult } from 'typeorm';
import { Restaurant } from '../entity/Restaurant';
import { TRestaurant } from '../types/TRestaurant';

export class RestaurantService {
    async getAllRestaurant(): Promise<TRestaurant[] | undefined> {
        const restaurant = await Restaurant.findAllRestaurant();

        if (restaurant) {
            return restaurant;
        }
        return undefined;
    }

    async getAllVille(): Promise<string[] | undefined> {
        const ville = await Restaurant.findAllVille();

        if (ville) {
            const villes: string[] = ville.map((data) => data.ville);
            console.log(villes);
            return villes;
        }
        return undefined;
    }

    async getRestaurantByVille(
        ville: string
    ): Promise<TRestaurant[] | undefined> {
        const restaurant = await Restaurant.findByVille(ville);

        if (restaurant) {
            return restaurant;
        }

        return undefined;
    }

    async createRestaurant(ville: string): Promise<InsertResult | undefined> {
        const newVille = await Restaurant.createNewRestau(ville);

        if (newVille) {
            return newVille.raw;
        }

        return undefined;
    }

    async updateVille(
        ville: string,
        restauId: string
    ): Promise<TRestaurant | undefined> {
        const changeVille = await Restaurant.changeRestau(ville, restauId);

        if (changeVille) {
            return changeVille.raw;
        }
        return undefined;
    }

    async deleteRestaurant(restauId: string): Promise<TRestaurant | undefined> {
        const changeVille = await Restaurant.deleteRestau(restauId);

        if (changeVille) {
            return changeVille.raw;
        }
        return undefined;
    }

    async getRestauById(restauId: string): Promise<TRestaurant | undefined> {
        const getRestau = await Restaurant.getRestauById(restauId);

        if (getRestau) {
            return getRestau;
        }
        return undefined;
    }
}
