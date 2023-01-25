import { Users } from '../entity/User';
import { TUser } from '../types/TUser';

export class UserService{

    async getOneUser(userId: number): Promise<TUser | undefined> {
        const user = await Users.getUser(userId);

        if (user) {
            return user;
        }
        return undefined;
    }
}
