import { Buffer } from "buffer";
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


    constructor(blocknumber: number, blockHash: string) {
      this.blocknumber = blocknumber;
      this.blockHash = blockHash;
    }
}
