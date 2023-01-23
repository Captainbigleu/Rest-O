import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Restaurant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'character varying' })
    ville: string;
}