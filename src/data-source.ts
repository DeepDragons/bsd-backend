import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
    database: 'dragons.sqlite3',
    type: 'sqlite',
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: []
});
