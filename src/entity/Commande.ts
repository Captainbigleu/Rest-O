import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Menus } from './Menus';
import { Restaurant } from './Restaurant';
import { Users } from './User';

@Entity()
export class Commande {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'money' })
    prix: string;

    @ManyToOne(() => Users, (user) => user.id)
    user: Users;

    @ManyToOne(() => Restaurant, (restaurant) => restaurant.id)
    restaurant: Restaurant;

    @ManyToOne(() => Menus, (menu) => menu.id)
    menu: Menus;
}
