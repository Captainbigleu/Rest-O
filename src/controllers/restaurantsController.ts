import { Request, Response } from 'express';
import { RestaurantService } from '../services/restaurantService';
import { EStatus, TApiResponse } from '../types/TStatus';

const restaurantService = new RestaurantService();

export class RestaurantController {
    async getAllRestaurant(req: Request, res: Response) {
        try {
            const restaurant = await restaurantService.getAllRestaurant();
            if (restaurant === undefined) {
                return res.status(404).json({
                    status: EStatus.FAILED,
                    message: 'Aucun restaurant trouvé',
                    data: null,
                } as TApiResponse);
            }
            res.status(200).json({
                status: EStatus.OK,
                message: 'Voici tous les restaurants disponible',
                data: restaurant,
            } as TApiResponse);
        } catch (err) {
            console.log(err);

            return res.status(500).json({
                status: EStatus.FAILED,
                message: 'erreur serveur',
                data: null,
            } as TApiResponse);
        }
    }

    async getRestaurantByVille(req: Request, res: Response) {
        const ville = req.body.ville;
        if (ville === undefined) {
            return res.status(400).json({
                status: EStatus.FAILED,
                message: 'Donnée manquante',
                data: null,
            } as TApiResponse);
        }
        try {
            const villeExist: string[] | undefined =
                await restaurantService.getAllVille();

            if (!villeExist.includes(ville)) {
                res.status(400).json({
                    status: EStatus.FAILED,
                    message: `Aucun restaurant dans la ville ${ville} !`,
                } as TApiResponse);
                return;
            }
            const restaurant = await restaurantService.getRestaurantByVille(
                ville
            );
            res.status(200).json({
                status: EStatus.OK,
                message: 'Voici les restaurants de votre ville',
                data: restaurant,
            } as TApiResponse);
        } catch (err) {
            console.log(err);

            return res.status(500).json({
                status: EStatus.FAILED,
                message: 'erreur serveur',
                data: null,
            } as TApiResponse);
        }
    }

    async createNewRest(req: Request, res: Response) {
        const ville = req.body.ville;
        const admin = req.body.admin;

        if (ville === undefined) {
            return res.status(400).json({
                status: EStatus.FAILED,
                message: 'Donnée manquante',
                data: null,
            } as TApiResponse);
        }

        if (!admin === true) {
            return res.status(403).json({
                status: EStatus.FAILED,
                message: 'Vous ne pouvez pas créer de restaurant !',
                data: null,
            } as TApiResponse);
        }

        try {
            const newVille = await restaurantService.createRestaurant(ville);

            if (newVille) {
                res.status(201).json({
                    status: EStatus.OK,
                    message: 'Nouveau restaurant ajouté !',
                    data: newVille,
                } as TApiResponse);
            }
        } catch (err) {
            console.log(err);

            return res.status(500).json({
                status: EStatus.FAILED,
                message: 'erreur serveur',
                data: null,
            } as TApiResponse);
        }
    }

    async putVille(req: Request, res: Response) {
        const ville = req.body.ville;
        const restauId = parseInt(req.params.id);
        const admin = req.body.admin;

        if (Number.isNaN(restauId)) {
            return res.status(404).json({
                status: EStatus.FAILED,
                message:
                    'Type de donnée attendu incorrect, type attendu Number',
                data: null,
            } as TApiResponse);
        }

        if (ville === undefined) {
            return res.status(400).json({
                status: EStatus.FAILED,
                message: 'Donnée manquante',
                data: null,
            } as TApiResponse);
        }

        if (!admin === true) {
            return res.status(403).json({
                status: EStatus.FAILED,
                message: 'Vous ne pouvez pas modifier ce restaurant !',
                data: null,
            } as TApiResponse);
        }

        try {
            const getList = await restaurantService.getRestauById(restauId);
            if (!getList) {
                return res.status(404).json({
                    status: EStatus.FAILED,
                    message: 'Aucun restaurant trouvé, check ID',
                    data: null,
                } as TApiResponse);
            }
            const newVille = await restaurantService.updateVille(
                ville,
                restauId
            );
            if (newVille) {
                res.status(201).json({
                    status: EStatus.OK,
                    message: 'Changement de ville effectué !',
                    data: newVille,
                } as TApiResponse);
            }
        } catch (err) {
            console.log(err);

            return res.status(500).json({
                status: EStatus.FAILED,
                message: 'erreur serveur',
                data: null,
            } as TApiResponse);
        }
    }

    async delRestaurant(req: Request, res: Response) {
        const restauId: number = parseInt(req.params.id);
        const admin = req.body.admin;

        if (Number.isNaN(restauId)) {
            return res.status(404).json({
                status: EStatus.FAILED,
                message:
                    'Type de donnée attendu incorrect, type attendu Number',
                data: null,
            } as TApiResponse);
        }
        if (!admin === true) {
            return res.status(403).json({
                status: EStatus.FAILED,
                message: 'Vous ne pouvez pas modifier ce restaurant !',
                data: null,
            } as TApiResponse);
        }

        try {
            const getList = await restaurantService.getRestauById(restauId);
            if (!getList) {
                return res.status(404).json({
                    status: EStatus.FAILED,
                    message: 'Aucun restaurant trouvé, check ID',
                    data: null,
                } as TApiResponse);
            }

            const newVille = await restaurantService.deleteRestaurant(restauId);
            if (newVille) {
                res.status(201).json({
                    status: EStatus.OK,
                    message: 'Restaurant supprimé !',
                    data: newVille,
                } as TApiResponse);
            }
        } catch (err) {
            console.log(err);

            return res.status(500).json({
                status: EStatus.FAILED,
                message: 'erreur serveur',
                data: null,
            } as TApiResponse);
        }
    }
}
