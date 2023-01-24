import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    BaseEntity,
   
} from 'typeorm';
import { Commande } from './Commande';

@Entity()
export class Restaurant extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'character varying' })
    ville: string;

    @OneToMany(() => Commande, (commande) => commande.id)
    commandes: Commande[];

    static findByVille (ville: string) {
        return this. createQueryBuilder("restaurant")
        .where("restaurant.ville = :ville", {ville} )
        .getMany()
    }
}
