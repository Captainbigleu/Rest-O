import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    BaseEntity,
} from 'typeorm';
import { Menus } from './Menus';
import { Restaurant } from './Restaurant';
import { Users } from './User';

@Entity()
export class Commande extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'numeric' })
    prix: number;

    @ManyToOne(() => Users, (user) => user.id)
    user: Users;

    @ManyToOne(() => Restaurant, (restaurant) => restaurant.id)
    restaurant: Restaurant;

    @ManyToOne(() => Menus, (menu) => menu.id)
    menu: Menus;

    static readCommande(userId: number) {
        return this.createQueryBuilder('commande')
            .where('commande.userId = :userId', { userId })
            .getMany();
    }
}
