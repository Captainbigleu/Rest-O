import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    BaseEntity,
    IsNull,
} from 'typeorm';
import { Commande } from './Commande';

@Entity()
export class Restaurant extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'character varying' })
    ville: string;

    @Column({
        type: 'boolean',
        default: false,
    })
    deleted_at: boolean;

    @OneToMany(() => Commande, (commande) => commande.id)
    commandes: Commande[];

    static findAllRestaurant() {
        return this.createQueryBuilder('restaurant')
            .where('restaurant.deleted_at = :deleted_at', {
                deleted_at: false,
            })
            .getMany();
    }

    static findByVille(ville: string) {
        return this.createQueryBuilder('restaurant')
            .where('restaurant.ville = :ville', { ville })
            .andWhere('restaurant.deleted_at = :deleted_at', {
                deleted_at: false,
            })
            .getMany();
    }

    static findAllVille() {
        return this.createQueryBuilder()
            .select('restaurant.ville')
            .from(Restaurant, 'restaurant')
            .where('restaurant.deleted_at = :deleted_at', {
                deleted_at: false,
            })
            .getMany();
    }

    static createNewRestau(ville: string) {
        return this.createQueryBuilder()
            .insert()
            .into(Restaurant)
            .values([{ ville: ville }])
            .returning('*')
            .execute();
    }

    static changeRestau(ville: string, id: string) {
        return this.createQueryBuilder()
            .update(Restaurant)
            .set({ ville: ville })
            .where('id = :id', { id: id })
            .returning('*')
            .execute();
    }

    static deleteRestau(id: number) {
        return this.createQueryBuilder()
            .update(Restaurant)
            .set({ deleted_at: true })
            .where('id = :id', { id: id })
            .returning('*')
            .execute();
    }

    static getRestauById(id: number) {
        return this.createQueryBuilder()
            .select('restaurant.id')
            .from(Restaurant, 'restaurant')
            .where('restaurant.id = :id', { id: id })
            .getOne();
    }
}
