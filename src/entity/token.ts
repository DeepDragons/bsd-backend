import { Buffer } from "buffer";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Token {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
      nullable: false
    })
    visual!: string;

    @Column({
      nullable: false
    })
    combat!: string;

    @Column({
      nullable: false
    })
    owner!: string;

    @Column({
      nullable: false
    })
    rarity!: number;

    @Column({
      nullable: false
    })
    strong!: number;

    @Column()
    wounds = Buffer.alloc(32).toString('hex');

    @Column()
    won = 0;

    @Column()
    lost = 0;

    @Column()
    burnt = false;

    @Column({
      nullable: true
    })
    name?: string;
}
