import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Menus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'character varying' })
    nom: string;

    @Column({ type: 'money' })
    prix: string;
}
