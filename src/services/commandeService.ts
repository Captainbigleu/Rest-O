import { Commande } from '../entity/Commande';
import { TCommande } from '../types/TCommande';

export class CommandesService {
    async getCommandeByUserId(
        userId: number
    ): Promise<TCommande[] | undefined> {
        const commande = await Commande.readCommande(userId);

        if (commande) {
            return commande;
        }
        return undefined;
    }
}
