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

    static getUser(id: number) {
        return this.createQueryBuilder()
            .select('users.id')
            .from(Users, 'users')
            .where('users.id = :id', { id: id })
            .getOne();
}
}