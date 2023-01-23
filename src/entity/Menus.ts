import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { Commande } from './Commande';

@Entity()
export class Menus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'character varying' })
    nom: string;

    @Column({ type: 'money' })
    prix: string;

    @ManyToMany(() => Commande)
    @JoinTable()
    commandes: Commande[];
}
