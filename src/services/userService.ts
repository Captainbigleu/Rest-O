import { InsertResult } from 'typeorm';
import { Users } from '../entity/User';
import { TUser } from '../types/TUser';

export class UserService {
    async register(
        name: string,
        password: string
    ): Promise<InsertResult | undefined> {
        const newUser = await Users.registerUser(name, password);

        if (newUser) {
            return newUser;
        }
        return undefined;
    }

    async getDataUserByName(name: string): Promise<TUser | undefined> {
        const data = await Users.logUser(name);

        if (data) {
            return data;
        }
        return undefined;
    }
}
