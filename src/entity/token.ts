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

    @Column({
      default: Buffer.alloc(16).toString('hex')
    })
    wounds: string = Buffer.alloc(16).toString('hex');

    @Column({
      default: 0
    })
    won: number = 0;

    @Column({
      default: 0
    })
    lost: number = 0;

    @Column({
      default: false
    })
    burnt: boolean = false;

    @Column({
      nullable: true
    })
    name?: string;
}
