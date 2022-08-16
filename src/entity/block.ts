import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Block {
    @PrimaryGeneratedColumn()
    blocknumber!: number;

    @Column({
      nullable: false,
      unique: true
    })
    blockHash!: string;

    @CreateDateColumn({
      nullable: false
    })
    createdDate: Date = new Date();

    @UpdateDateColumn({
      nullable: false
    })
    updatedDate: Date = new Date();


    constructor(blocknumber: number, blockHash: string) {
      this.blocknumber = blocknumber;
      this.blockHash = blockHash;
    }
}
