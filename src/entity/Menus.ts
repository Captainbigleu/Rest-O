import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
    ManyToOne,
} from 'typeorm';
import { Commande } from './Commande';
import { Restaurant } from './Restaurant';

@Entity()
export class Menus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'character varying' })
    nom: string;

    @Column({ type: 'money' })
    prix: string;

    @ManyToOne(() => Commande, (commande) => commande.id)
    commande: Commande;
}
