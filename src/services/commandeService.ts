import { InsertResult, UpdateResult } from 'typeorm';
import { Commande } from '../entity/Commande';
import { TCommande } from '../types/TCommande';

export class CommandesService {
    async getCommandesByRestaurantId(
        restaurantId: number
    ): Promise<TCommande[] | undefined> {
        const commande = await Commande.readCommandesByRestaurantId(
            restaurantId
        );

        if (commande) {
            return commande;
        }
        return undefined;
    }

    async createOneCommande(
        userId: number,
        menuId: number
    ): Promise<InsertResult | undefined> {
        const commande = await Commande.createCommande(userId, menuId);

        if (commande) {
            return commande;
        }
        return undefined;
    }
    async updateOneCommande(
        menuId: number,
        commandeId: number
    ): Promise<UpdateResult | undefined> {
        const commande = await Commande.updateCommande(menuId, commandeId);
        console.log(commande);

        if (commande) {
            return commande;
        }
        return undefined;
    }

    async getCommandeById(commandeId: number): Promise<TCommande | undefined> {
        const commande = await Commande.findOneBy({
            id: commandeId,
            deleted_at: false,
        });

        if (commande) {
            return commande;
        }
        return undefined;
    }

    async deleteCommande(commandeId: number): Promise<any | undefined> {
        const commande = await Commande.deleteCommande(commandeId);
        console.log(commande);

        if (commande) {
            return commande;
        }
        return undefined;
    }
}
