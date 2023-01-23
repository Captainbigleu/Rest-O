import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Commande {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'money' })
    prix: string;
}
