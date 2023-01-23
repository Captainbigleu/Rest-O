import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

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
}