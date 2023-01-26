import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity }
    from "typeorm"
import { Menus } from "./Menus";
import { Restaurant } from "./Restaurant";
import { Users } from "./User";

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
            .getMany()
    }
    static readCommandesByRestaurantId(restaurantId: number) {
        return this.createQueryBuilder('commande')
            .where('commande.restaurantId = :restaurantId', { restaurantId })
            .getMany()
    }
    static createCommande(prix: number, userId: number, restaurantId: number, menuId: number) {
        return this.createQueryBuilder()
            .insert()
            .into(Commande)
            .values([
                { prix: prix, user: { id: userId }, restaurant: { id: restaurantId }, menu: { id: menuId } }
            ])
            .returning('*')
            .execute()
    }
    static updateCommande(prix: number, menuId: number, commandeId: number) {
        const result = this.createQueryBuilder()
            .update(Commande)
            .set({ prix: prix, menu: { id: menuId } })
            .where("id = :id", { id: commandeId })
            .returning('*')
            .execute() 
            console.log(result);
            return result
    }
}