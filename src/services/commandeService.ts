import { InsertResult } from 'typeorm';
import { Commande } from '../entity/Commande';
import { TCommande } from '../types/TCommande';

export class CommandesService {

    async getCommandeByUserId(userId: number): Promise<TCommande[] | undefined> {
        const commande = await Commande.readCommande(userId);

        if (commande) {
            return commande;
        }
        return undefined;
    }

    async getCommandesByRestaurantId(restaurantId: number): Promise<TCommande[] | undefined> {
        const commande = await Commande.readCommandesByRestaurantId(restaurantId);

        if (commande) {
            return commande;
        }
        return undefined;
    }

    async createOneCommande(prix: number, userId: number, restaurantId: number, menuId: number): Promise<InsertResult | undefined> {
        const commande = await Commande.createCommande(prix, userId, restaurantId, menuId);

        if (commande) {
            return commande;
        }
        return undefined;
    }
    async updateOneCommande(prix: number, menuId: number, commandeId: number): Promise<Commande | undefined> {
        const commande = await Commande.updateCommande(prix, menuId, commandeId);
        console.log(commande);
        

        if (commande) {
            //return commande;
        }
        return undefined;
    }

    async getCommandeById(commandeId: number): Promise<TCommande | undefined> {
        const commande = await Commande.findOneBy({id: commandeId});

        if (commande) {
            return commande;
        }
        return undefined;


    }

}