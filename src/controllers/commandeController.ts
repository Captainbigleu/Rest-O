import { Request, Response } from 'express';
import { CommandesService } from '../services/commandeService';
import { UserService } from '../services/userService';
import { EStatus, TApiResponse } from '../types/TStatus';

const commandeService = new CommandesService();
const userService = new UserService();

export class CommandesController {
    async getCommande(req: Request, res: Response) {
        const userId = parseInt(req.params.id);

        if (Number.isNaN(Number(userId))) {
            return res.status(400).json({
                status: EStatus.FAILED,
                message:
                    'Syntaxe incorrecte, veuillez vérifier que vous avez bien rentré un nombre.',
                data: undefined,
            } as TApiResponse);
        }

        try {
            const user = await userService.getOneUser(userId);

            if (!user) {
                return res.status(404).json({
                    status: EStatus.FAILED,
                    message: 'Aucun utilisateur n existe pour cet id.',
                    data: null,
                } as TApiResponse);
            }

            const commande = await commandeService.getCommandeByUserId(userId);

            if (!commande) {
                return res.status(404).json({
                    status: EStatus.FAILED,
                    message: "La commande demandée n'existe pas.",
                    data: undefined,
                } as TApiResponse);
            }
            res.status(200).json({
                status: EStatus.OK,
                message: 'Voici la (les) commande(s) recherchée(s).',
                data: commande,
            } as TApiResponse);
        } catch (err) {
            console.log(err);

            return res.status(500).json({
                status: EStatus.FAILED,
                message: 'Erreur serveur.',
                data: null,
            } as TApiResponse);
        }
    }
}
