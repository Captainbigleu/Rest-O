import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    BaseEntity,
} from 'typeorm';
import { Commande } from './Commande';

@Entity()
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'character varying' })
    name: string;

    @Column({ type: 'character varying' })
    password: string;

    @Column({ type: 'boolean', default: false })
    admin: boolean;

    @OneToMany(() => Commande, (commande) => commande.id)
    commandes: Commande[];

    static registerUser(name: string, password: string, admin: boolean) {
        return this.createQueryBuilder()
            .insert()
            .into(Users)
            .values([{ name: name, password: password, admin: admin }])
            .returning('*')
            .execute();
    }
    static logUser(name: string) {
        return this.createQueryBuilder()
            .select('users')
            .from(Users, 'users')
            .where('users.name = :name', { name })
            .getOne();
    }
    static getUser(id: number) {
        return this.createQueryBuilder()
            .select('users.id')
            .from(Users, 'users')
            .where('users.id = :id', { id: id })
            .getOne();
    }
}
