import { Buffer } from "buffer";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";


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

    @CreateDateColumn({
      nullable: false
    })
    createdDate: Date = new Date();

    @UpdateDateColumn({
      nullable: false
    })
    updatedDate: Date = new Date();

    @Column({
      default: Buffer.alloc(32).toString('hex'),
      nullable: false
    })
    wounds: string = Buffer.alloc(32).toString('hex');

    @Column({
      default: 0,
      nullable: false
    })
    won: number = 0;

    @Column({
      default: 0,
      nullable: false
    })
    lost: number = 0;

    @Column({
      default: false,
      nullable: false
    })
    burnt: boolean = false;

    @Column({
      nullable: true
    })
    name?: string;


    constructor(
      id: number,
      visual: string,
      combat: string,
      owner: string,
      rarity: number,
      strong: number
    ) {
      this.id = id;
      this.visual = visual;
      this.combat = combat;
      this.owner = owner;
      this.rarity = rarity;
      this.strong = strong;
    }
}
