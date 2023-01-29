import { Request, Response } from 'express';
import { CommandesService } from '../services/commandeService';
import { EStatus, TApiResponse } from '../types/TStatus';
import { RestaurantService } from '../services/restaurantService';
import { MenuService } from '../services/menuService';

const commandeService = new CommandesService();
const restaurantService = new RestaurantService();
const menuService = new MenuService();

export class CommandesController {
    async getOneCommande(req: Request, res: Response) {
        const commandeId = parseInt(req.params.id);
        const userId = req.body.user_id;
        const admin = req.body.admin;

        if (Number.isNaN(Number(commandeId))) {
            return res.status(400).json({
                status: EStatus.FAILED,
                message:
                    'Syntaxe incorrecte, veuillez vérifier que vous avez bien rentré un nombre.',
                data: undefined,
            } as TApiResponse);
        }

        try {
            const commande = await commandeService.getCommandeById(commandeId);
            console.log(commande.user.id);
            console.log(userId);

            if (!commande) {
                return res.status(404).json({
                    status: EStatus.FAILED,
                    message: "La commande demandée n'existe pas.",
                    data: undefined,
                } as TApiResponse);
            }
            if (userId === commande.user.id || admin) {
                return res.status(200).json({
                    status: EStatus.OK,
                    message: 'Voici la commande recherchée.',
                    data: commande,
                } as TApiResponse);
            }
            return res.status(403).json({
                status: EStatus.FAILED,
                message: 'Accès à cetre commande refusée',
                data: null,
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

    async getCommandeByRestaurantId(req: Request, res: Response) {
        const restaurantId = parseInt(req.params.id);
        const admin = req.body.admin;

        if (Number.isNaN(restaurantId)) {
            return res.status(400).json({
                status: EStatus.FAILED,
                message:
                    'Syntaxe incorrecte, veuillez vérifier que vous avez bien rentré un nombre.',
                data: null,
            } as TApiResponse);
        }
        if (!admin) {
            return res.status(403).json({
                status: EStatus.FAILED,
                message: 'Accès refusé',
                data: null,
            } as TApiResponse);
        }
        try {
            const restaurant = await restaurantService.getRestauById(
                restaurantId
            );

            if (!restaurant) {
                return res.status(404).json({
                    status: EStatus.FAILED,
                    message: 'Aucun restaurant n existe pour cet id.',
                    data: null,
                } as TApiResponse);
            }

            const commandesResto =
                await commandeService.getCommandesByRestaurantId(restaurantId);

            res.status(200).json({
                status: EStatus.OK,
                message:
                    'Voici la (les) commande(s) recherchée(s) pour ce restaurant.',
                data: commandesResto,
            } as TApiResponse);
        } catch (err) {
            console.log(err);

            return res.status(500).json({
                status: 'FAILED.',
                message: 'Erreur serveur.',
                data: null,
            });
        }
    }
    async createNewCommande(req: Request, res: Response) {
        const menuId: number = req.body.menuId;
        const userId: number = req.body.user_id;
        console.log(req.body);

        if (!menuId) {
            return res.status(400).json({
                status: EStatus.FAILED,
                message:
                    'Une des données est manquante, veuillez corriger svp.',
                data: null,
            } as TApiResponse);
        }

        try {
            const menu = await menuService.getOneMenu(menuId);

            if (!menu) {
                return res.status(404).json({
                    status: EStatus.FAILED,
                    message:
                        'Le menu que vous avez choisi n existe pas, veuillez changer svp.',
                    data: null,
                } as TApiResponse);
            }

            const commande = await commandeService.createOneCommande(
                userId,
                menuId
            );
            res.status(200).json({
                status: EStatus.OK,
                message: 'Votre commande a bien été créée.',
                data: commande.raw,
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

    async updateNewCommande(req: Request, res: Response) {
        const menuId: number = req.body.menuId;
        const commandeId: number = parseInt(req.params.id);
        const admin: boolean = req.body.admin;
        const userId = req.body.user_id;

        if (Number.isNaN(commandeId)) {
            return res.status(400).json({
                status: EStatus.FAILED,
                message:
                    'Syntaxe incorrecte, veuillez vérifier que vous avez bien rentré un nombre.',
                data: undefined,
            } as TApiResponse);
        }

        if (!menuId) {
            return res.status(400).json({
                status: EStatus.FAILED,
                message:
                    'Une ou des données sont manquantes, veuillez corriger svp.',
                data: null,
            } as TApiResponse);
        }

        try {
            const getCommandeId = await commandeService.getCommandeById(
                commandeId
            );

            if (!getCommandeId) {
                return res.status(404).json({
                    status: EStatus.FAILED,
                    message: 'Cette commande n existe pas.',
                    data: null,
                } as TApiResponse);
            }

            const getMenu = await menuService.getOneMenu(menuId);

            if (!getMenu) {
                return res.status(404).json({
                    status: EStatus.FAILED,
                    message: 'Ce menu n existe pas.',
                    data: null,
                } as TApiResponse);
            }

            const updatecommande = await commandeService.updateOneCommande(
                menuId,
                commandeId
            );
            console.log(userId);
            console.log(getCommandeId.user.id);

            if (userId === getCommandeId.user.id || admin) {
                return res.status(200).json({
                    status: EStatus.OK,
                    message: 'Votre commande a bien été modifiée.',
                    data: updatecommande.raw,
                } as TApiResponse);
            }
            return res.status(403).json({
                status: EStatus.FAILED,
                message: 'Accès à cette commande refusée',
                data: null,
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

    async deleteCommandeById(req: Request, res: Response) {
        const commandeId: number = parseInt(req.params.id);
        const admin: boolean = req.body.admin;
        const userId = req.body.user_id;

        if (Number.isNaN(commandeId)) {
            return res.status(400).json({
                status: EStatus.FAILED,
                message:
                    'Syntaxe incorrecte, veuillez vérifier que vous avez bien rentré un nombre.',
                data: undefined,
            } as TApiResponse);
        }

        try {
            const getCommandeId = await commandeService.getCommandeById(
                commandeId
            );

            if (!getCommandeId) {
                return res.status(404).json({
                    status: EStatus.FAILED,
                    message: 'Cette commande n existe pas.',
                    data: null,
                } as TApiResponse);
            }
            if (userId === getCommandeId.user.id || admin) {
                const deleteCommande = await commandeService.deleteCommande(
                    commandeId
                );

                return res.status(200).json({
                    status: EStatus.OK,
                    message: 'Votre commande a bien été annulée.',
                    data: deleteCommande.raw,
                } as TApiResponse);
            } else {
                return res.status(403).json({
                    status: EStatus.FAILED,
                    message: 'Accès à cette commande refusée',
                    data: null,
                } as TApiResponse);
            }
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
