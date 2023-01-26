import { Request, Response } from 'express';
import { RestaurantService } from '../services/restaurantService';

const restaurantService = new RestaurantService();

export class RestaurantController {
    async getAllRestaurant(req: Request, res: Response) {
        try {
            const restaurant = await restaurantService.getAllRestaurant();
            if (restaurant === undefined) {
                return res.status(404).json({
                    status: 'FAIL',
                    message: 'Aucun restaurant trouvé',
                    data: null,
                });
            }
            res.status(200).json({
                status: 'Success',
                message: 'Voici tous les restaurants disponible',
                data: restaurant,
            });
        } catch (err) {
            console.log(err);

            return res.status(500).json({
                status: 'Error',
                message: 'erreur serveur',
                data: null,
            });
        }
    }

    async getRestaurant(req: Request, res: Response) {
        const ville = req.body.ville;
        if (ville === undefined) {
            return res.status(400).json({
                status: 'Fail',
                message: 'Donnée manquante',
                data: null,
            });
        }
        try {
            const villeExist: string[] | undefined =
                await restaurantService.getAllVille();

            if (!villeExist.includes(ville)) {
                res.status(400).json({
                    status: 'FAIL',
                    message: `Aucun restaurant dans la ville ${ville} !`,
                });
                return;
            }
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
                status: 'Error',
                message: 'erreur serveur',
                data: null,
            });
        }
    }

    async createNewRest(req: Request, res: Response) {
        const ville = req.body.ville;

        if (ville === undefined) {
            return res.status(400).json({
                status: 'Fail',
                message: 'Donnée manquante',
                data: null,
            });
        }

        try {
            const newVille = await restaurantService.createRestaurant(ville);

            if (newVille) {
                res.status(201).json({
                    status: 'success',
                    message: 'Nouveau restaurant ajouté !',
                    data: newVille,
                });
            }
        } catch (err) {
            console.log(err);

            return res.status(500).json({
                status: 'Error',
                message: 'erreur serveur',
                data: null,
            });
        }
    }

    async putVille(req: Request, res: Response) {
        const ville = req.body.ville;
        const restauId = req.params.id;
        console.log(restauId);

        if (Number.isNaN(Number(restauId))) {
            return res.status(404).json({
                status: 'FAIL',
                message:
                    'Type de donnée attendu incorrect, type attendu Number',
                data: null,
            });
        }

        if (ville === undefined) {
            return res.status(400).json({
                status: 'Fail',
                message: 'Donnée manquante',
                data: null,
            });
        }

        try {
            const newVille = await restaurantService.updateVille(
                ville,
                restauId
            );
            if (newVille) {
                res.status(201).json({
                    status: 'success',
                    message: 'Changement de ville effectué !',
                    data: newVille,
                });
            }
        } catch (err) {
            console.log(err);

            return res.status(500).json({
                status: 'Error',
                message: 'erreur serveur',
                data: null,
            });
        }
    }

    async delRestaurant(req: Request, res: Response) {
        const restauId = parseInt(req.params.id);

        if (Number.isNaN(Number(restauId))) {
            return res.status(404).json({
                status: 'FAIL',
                message:
                    'Type de donnée attendu incorrect, type attendu Number',
                data: null,
            });
        }

        try {
            const getList = await restaurantService.getRestauById(restauId);
            if (!getList) {
                return res.status(404).json({
                    status: 'FAIL',
                    message: 'Aucun restaurant trouvé, check ID',
                    data: null,
                });
            }

            const newVille = await restaurantService.deleteRestaurant(restauId);
            if (newVille) {
                res.status(201).json({
                    status: 'success',
                    message: 'Restaurant supprimé !',
                    data: newVille,
                });
            }
        } catch (err) {
            console.log(err);

            return res.status(500).json({
                status: 'Error',
                message: 'erreur serveur',
                data: null,
            });
        }
    }
}
