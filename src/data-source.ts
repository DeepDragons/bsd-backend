import "reflect-metadata";
import { DataSource } from "typeorm";
import { Token } from "./entity/Token";

export const AppDataSource = new DataSource({
    database: 'dragons.sqlite3',
    type: 'sqlite',
    synchronize: true,
    logging: false,
    entities: [Token],
    migrations: [],
    subscribers: []
});
