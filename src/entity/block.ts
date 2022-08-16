import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Block {
    @PrimaryGeneratedColumn()
    blocknumber!: number;

    @CreateDateColumn({
      nullable: false
    })
    createdDate: Date = new Date();

    @UpdateDateColumn({
      nullable: false
    })
    updatedDate: Date = new Date();


    constructor(blocknumber: number) {
      this.blocknumber = blocknumber;
    }
}
