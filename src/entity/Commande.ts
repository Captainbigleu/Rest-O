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

    @Column({ type: 'boolean', default: false })
    deleted_at: boolean;

    @ManyToOne(() => Users, (user) => user.id, { eager: true })
    user: Users;

    @ManyToOne(() => Restaurant, (restaurant) => restaurant.id)
    restaurant: Restaurant;

    @ManyToOne(() => Menus, (menu) => menu.id)
    menu: Menus;

    static readCommandesByRestaurantId(restaurantId: number) {
        return this.createQueryBuilder('commande')
            .where('commande.restaurantId = :restaurantId', { restaurantId })
            .andWhere('commande.deleted_at = false')
            .getMany();
    }
    static createCommande(userId: number, menuId: number) {
        return this.createQueryBuilder()
            .insert()
            .into(Commande)
            .values([{ user: { id: userId }, menu: { id: menuId } }])
            .returning('*')
            .execute();
    }
    static updateCommande(menuId: number, commandeId: number) {
        const result = this.createQueryBuilder()
            .update(Commande)
            .set({ menu: { id: menuId } })
            .where('id = :id', { id: commandeId })
            .andWhere('deleted_at = false')
            .returning('*')
            .execute();
        console.log(result);
        return result;
    }

    static deleteCommande(commandeId: number) {
        const result = this.createQueryBuilder()
            .update(Commande)
            .set({ deleted_at: true })
            .where('id = :id', { id: commandeId })
            .returning('*')
            .execute();
        console.log(result);
        return result;
    }
}
