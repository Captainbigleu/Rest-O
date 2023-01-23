import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Commande {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'integer' })
    id_restaurant: number;

    @Column({ type: 'character varying' })
    menu: string;

    @Column({ type: 'integer'})
    user_id: number;
}