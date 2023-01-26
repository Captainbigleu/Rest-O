import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Commande } from './Commande';

@Entity()
export class Menus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'character varying' })
    nom: string;

    @Column({ type: 'numeric' })
    prix: number;

    @ManyToOne(() => Commande, (commande) => commande.id)
    commande: Commande;
}
