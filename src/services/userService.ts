import { InsertResult } from 'typeorm';
import { Users } from '../entity/User';
import { TUser } from '../types/TUser';

export class UserService {
    async register(
        name: string,
        password: string,
        admin: boolean
    ): Promise<InsertResult | undefined> {
        const newUser = await Users.registerUser(name, password, admin);

        if (newUser) {
            return newUser;
        }
        return undefined;
    }

    async getDataUserByName(name: string): Promise<TUser | undefined> {
        const data = await Users.logUser(name);
        console.log(data);

        if (data) {
            return data;
        }
        return undefined;
    }

    async getOneUser(userId: number): Promise<TUser | undefined> {
        const user = await Users.getUser(userId);

        if (user) {
            return user;
        }
        return undefined;
    }

    /* async updateAdmin(
        before: boolean,
        after: boolean
    ): Promise<TUser | undefined> {
        const putAdmin = await Users.findOneBy({
            admin: before,
        });
        putAdmin.admin = after;
        const dataUpdated = await Users.save(putAdmin);

        if (dataUpdated) {
            return dataUpdated;
        }
        return undefined;
    } */
}
