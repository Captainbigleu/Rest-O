import { Request, Response } from 'express';
import { CommandesService } from '../services/commandeService';
import { UserService } from '../services/userService';
import { EStatus, TApiResponse } from "../types/TStatus";
import { RestaurantService } from "../services/restaurantService"

const commandeService = new CommandesService();
const userService = new UserService()
const restaurantService = new RestaurantService()

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
    async getCommandeByRestaurantId(req: Request, res: Response) {

        const restaurantId = parseInt(req.params.id);

        if (Number.isNaN(restaurantId)) {
            return res.status(400).json({
                status: EStatus.FAILED,
                message: "Syntaxe incorrecte, veuillez vérifier que vous avez bien rentré un nombre.",
                data: undefined
            } as TApiResponse);
        };
        try {
            const restaurant = await restaurantService.getRestauById(restaurantId)

            if (!restaurant) {
                return res.status(404).json({
                    status: EStatus.FAILED,
                    message: 'Aucun restaurant n existe pour cet id.',
                    data: null,
                } as TApiResponse);
            }

            const commandesResto = await commandeService.getCommandesByRestaurantId(restaurantId)


            res.status(200).json({
                status: EStatus.OK,
                message: 'Voici la (les) commande(s) recherchée(s) pour ce restaurant.',
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
        const prix: number = req.body.prix
        const userId: number = req.body.userId
        const restaurantId: number = req.body.restaurantId
        const menuId: number = req.body.menuId

        if (!prix || !userId || !restaurantId || !menuId) {
            return res.status(400).json({
                status: EStatus.FAILED,
                message: 'Une des données est manquante, veuillez corriger svp.',
                data: null,
            } as TApiResponse);
        }

        try {

            const restaurant = await restaurantService.getRestauById(restaurantId)

            if (!restaurant) {
                return res.status(404).json({
                    status: EStatus.FAILED,
                    message: 'Il n y a pas de restaurant correspondant à votre requête.',
                    data: null,
                } as TApiResponse);
            }

            /* const menu = await menuService.getOneUser(menuId)

            if (!menu) {
                return res.status(404).json({
                    status: EStatus.FAILED,
                    message: 'Le menu que vous avez choisi n existe pas, veuillez changer svp.',
                    data: null,
                } as TApiResponse);
            } */

             
            const commande = await commandeService.createOneCommande(prix, userId,restaurantId, menuId)
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
            }as TApiResponse);
        }
    }

    async updateNewCommande(req: Request, res: Response) {
        const prix: number = req.body.prix
        const menuId: number = req.body.menuId
        const commandeId: number = parseInt(req.params.id)

        if (Number.isNaN(commandeId)) {
            return res.status(400).json({
                status: EStatus.FAILED,
                message: "Syntaxe incorrecte, veuillez vérifier que vous avez bien rentré un nombre.",
                data: undefined
            } as TApiResponse);
        };

        if (!prix || !menuId) {
            return res.status(400).json({
                status: EStatus.FAILED,
                message: 'Une ou des données sont manquantes, veuillez corriger svp.',
                data: null,
            } as TApiResponse);
        }

        try {

            const getCommandeId = await commandeService.getCommandeById(commandeId)

            if (!getCommandeId) {
                return res.status(404).json({
                    status: EStatus.FAILED,
                    message: 'Cette commande n existe pas.',
                    data: null,
                } as TApiResponse);
            }

            const updatecommande = await commandeService.updateOneCommande(prix, menuId, commandeId)
             
           /*  res.status(200).json({
                status: EStatus.OK,
                message: 'Votre commande a bien été créée.',
                data: commande.raw,
            } as TApiResponse);
 */
        } catch (err) {
            console.log(err);

            return res.status(500).json({
                status: EStatus.FAILED,
                message: 'Erreur serveur.',
                data: null,
            }as TApiResponse);
        }
    }
}
