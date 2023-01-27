import { Request, Response } from 'express';
import { MenuService } from '../services/menuService';
import { EStatus, TApiResponse } from '../types/TStatus';

const menuService = new MenuService();

export class MenuController {
    async newMenu(req: Request, res: Response) {
        const name: string = req.body.nom;
        const prix: number = req.body.prix;
        const admin: boolean = req.body.admin;

        if (!name || !prix) {
            return res.status(400).json({
                status: EStatus.FAILED,
                message: 'Donnée manquante',
                data: null,
            } as TApiResponse);
        }
        if (!admin === true) {
            return res.status(403).json({
                status: EStatus.FAILED,
                message: 'Vous ne pouvez pas créer de menu !',
                data: null,
            } as TApiResponse);
        }

        try {
            const menu = await menuService.createMenu(name, prix);

            if (menu) {
                res.status(201).json({
                    status: EStatus.OK,
                    message: 'Nouveau Menu ajouté !',
                    data: menu,
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

    async changeMenu(req: Request, res: Response) {
        const prix: number = req.body.prix;
        const menuId: number = parseInt(req.params.id);
        const admin: boolean = req.body.admin;

        if (Number.isNaN(menuId)) {
            return res.status(400).json({
                status: EStatus.FAILED,
                message:
                    'Type de donnée attendu incorrect, type attendu Number',
                data: null,
            } as TApiResponse);
        }

        if (!prix) {
            return res.status(400).json({
                status: EStatus.FAILED,
                message: 'Donnée manquante/incorrecte',
                data: null,
            } as TApiResponse);
        }

        if (!admin === true) {
            return res.status(403).json({
                status: EStatus.FAILED,
                message: 'Vous ne pouvez pas modifier le menu !',
                data: null,
            } as TApiResponse);
        }

        try {
            const getMenu = await menuService.getOneMenu(menuId);

            if (!getMenu) {
                return res.status(404).json({
                    status: EStatus.FAILED,
                    message: 'Aucun menu ne correspond à cet ID',
                } as TApiResponse);
            }

            const putPrice = await menuService.changeMenu(prix, menuId);

            if (putPrice) {
                res.status(201).json({
                    status: EStatus.OK,
                    message: 'Modification effectuée',
                    data: putPrice,
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

    async delMenu(req: Request, res: Response) {
        const menuId: number = parseInt(req.params.id);
        const admin: boolean = req.body.admin;

        if (Number.isNaN(menuId)) {
            return res.status(400).json({
                status: EStatus.FAILED,
                message:
                    'Type de donnée attendu incorrect, type attendu Number',
                data: null,
            } as TApiResponse);
        }

        if (!admin === true) {
            return res.status(403).json({
                status: EStatus.FAILED,
                message: 'Vous ne pouvez pas supprimer le menu !',
                data: null,
            } as TApiResponse);
        }

        try {
            const getMenu = await menuService.getOneMenu(menuId);

            if (!getMenu) {
                return res.status(404).json({
                    status: EStatus.FAILED,
                    message: 'Aucun menu ne correspond à cet ID',
                } as TApiResponse);
            }
            const deleteMenu = await menuService.deleteMenu(menuId);

            if (deleteMenu) {
                res.status(201).json({
                    status: EStatus.OK,
                    message: 'Menu supprimé avec succès',
                    data: deleteMenu,
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

    async allMenu(req: Request, res: Response) {
        try {
            const menus = await menuService.gettAllMenu();

            if (menus) {
                res.status(200).json({
                    status: EStatus.OK,
                    message: 'Voici tout les menus à la carte ! Bon appétit',
                    data: menus,
                } as TApiResponse);
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                status: EStatus.FAILED,
                message: 'Erreur serveur',
                data: null,
            } as TApiResponse);
        }
    }

    async menuById(req: Request, res: Response) {
        const menuId: number = parseInt(req.params.id);

        if (Number.isNaN(menuId)) {
            return res.status(400).json({
                status: EStatus.FAILED,
                message:
                    'Type de donnée attendu incorrect, type attendu Number',
                data: null,
            } as TApiResponse);
        }

        try {
            const oneMenu = await menuService.getOneMenu(menuId);

            if (!oneMenu) {
                return res.status(404).json({
                    status: EStatus.FAILED,
                    message: 'Aucun menu trouvé, check ID',
                    data: null,
                } as TApiResponse);
            }

            res.status(200).json({
                status: EStatus.OK,
                message: 'Voici le menu demandé.',
                data: oneMenu,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                status: EStatus.FAILED,
                message: 'Erreur serveur',
                data: null,
            });
        }
    }
}
