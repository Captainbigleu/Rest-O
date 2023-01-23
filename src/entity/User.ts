import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Commande } from "./Commande"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'character varying' })
    name: string;

    @Column({ type: 'character varying' })
    password: string;

    @Column({ type: 'boolean', default: false })
    admin: boolean;

    @OneToMany(() => Commande, (commande) => commande.id)
    commandes: Commande[]
}
