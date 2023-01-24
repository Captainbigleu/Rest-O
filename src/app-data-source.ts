import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Commande } from './entity/Commande';
import { Menus } from './entity/Menus';
import { Restaurant } from './entity/Restaurant';
import { Users } from './entity/User';
dotenv.config({ path: '.env' });

export const myDataSource = new DataSource({
    type: 'postgres',
    host: process.env.TYPEORM_HOST,
    port: 5432,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [Commande, Menus, Restaurant, Users],
    logging: true,
    synchronize: true,
});
