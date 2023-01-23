import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { Commande } from './Commande';
import { Menus } from './Menus';

@Entity()
export class Restaurant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'character varying' })
    ville: string;

    @OneToMany(() => Commande, (commande) => commande.id)
    commandes: Commande[];
}
