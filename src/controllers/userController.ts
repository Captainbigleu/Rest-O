import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { EStatus, TApiResponse } from '../types/TStatus';

const userService = new UserService();

const secreToken = process.env.secreToken!;

export class UserController {
    async register(req: Request, res: Response) {
        const name: string = req.body.name;
        const password: string = req.body.password;
        const admin: boolean = req.body.admin;

        try {
            bcrypt.hash(password, 10, async function (err, hash) {
                const registerOk = await userService.register(
                    name,
                    hash,
                    admin
                );

                res.status(200).json({
                    status: EStatus.OK,
                    message: 'Utilisateur enregistré',
                    data: registerOk.raw,
                } as TApiResponse);
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                status: EStatus.FAILED,
                message: 'erreur serveur',
            } as TApiResponse);
        }
    }

    async login(req: Request, res: Response) {
        const name: string = req.body.name;
        const password: string = req.body.password;
        try {
            const user = await userService.getDataUserByName(name);

            if (!name || !password) {
                return res.status(400).json({
                    status: EStatus.FAILED,
                    message: `Données manquantes !`,
                } as TApiResponse);
            }
            console.log(user);

            if (user) {
                const hash = user.password;

                bcrypt.compare(password, hash, async (err, result) => {
                    const id = user.id;
                    const admin = user.admin;
                    const token = jwt.sign({ id, admin }, secreToken);

                    if (result) {
                        res.status(200).json({
                            status: EStatus.OK,
                            message: `Vous êtes bien connecté.e !!`,
                            token: token,
                        });
                    } else {
                        res.status(401).json({
                            status: EStatus.FAILED,
                            message: 'Le mot de passe est incorrect !',
                        } as TApiResponse);
                    }
                });
            } else {
                res.status(400).json({
                    status: EStatus.FAILED,
                    message: `${name} n'a pas de compte !!`,
                } as TApiResponse);
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: EStatus.FAILED,
                message: `!!! ERREUR !!!`,
            } as TApiResponse);
        }
    }
}
