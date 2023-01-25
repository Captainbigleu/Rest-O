import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

const userService = new UserService();

const secreToken = process.env.secreToken!;

export class UserController {
    async register(req: Request, res: Response) {
        const name: string = req.body.name;
        const password: string = req.body.password;

        try {
            bcrypt.hash(password, 10, async function (err, hash) {
                const registerOk = await userService.register(name, hash);

                res.status(200).json({
                    status: 'success',
                    message: 'Utilisateur enregistré',
                    data: registerOk.raw,
                });
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                status: 'Erreur',
                message: 'erreur serveur',
            });
        }
    }

    async login(req: Request, res: Response) {
        const name: string = req.body.name;
        const password: string = req.body.password;
        try {
            const user = await userService.getDataUserByName(name);

            if (!name || !password) {
                return res.status(400).json({
                    status: 'FAIL',
                    message: `Données manquantes !`,
                });
            }
            console.log(user);

            if (user) {
                const hash = user.password;

                bcrypt.compare(password, hash, async (err, result) => {
                    const id = user.id;
                    const token = jwt.sign({ id }, secreToken);

                    if (result) {
                        res.status(200).json({
                            status: 'OK',
                            message: `Vous êtes bien connecté.e !!`,
                            token: token,
                        });
                    } else {
                        res.status(401).json({
                            status: 'FAIL',
                            message: 'Le mot de passe incorrect !',
                        });
                    }
                });
            } else {
                res.status(400).json({
                    status: 'FAIL',
                    message: `${name} n'a pas de compte !!`,
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: 'ERROR',
                message: `!!! ERREUR !!!`,
            });
        }
    }
}
