import "reflect-metadata";
import { DataSource } from "typeorm";
import { Token } from "./entity/Token";
import { Block } from "./entity/block";

export const orm = new DataSource({
    database: 'dragons.sqlite3',
    type: 'sqlite',
    synchronize: true,
    logging: false,
    entities: [Token, Block],
    migrations: [],
    subscribers: []
});
