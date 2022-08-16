
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Token {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    visual!: string;

    @Column()
    combat!: string;

    @Column()
    name!: string;

    @Column()
    wounds!: string;

    @Column()
    won!: string;

    @Column()
    lost!: string;
}
