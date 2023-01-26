import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    BaseEntity,
} from 'typeorm';
import { Commande } from './Commande';

@Entity()
export class Menus extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'character varying' })
    nom: string;

    @Column({ type: 'numeric' })
    prix: number;

    @Column({ type: 'boolean', default: false })
    deleted_at: boolean;

    @ManyToOne(() => Commande, (commande) => commande.id)
    commande: Commande;
}
