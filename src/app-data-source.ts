import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
dotenv.config({ path: '.env' });

export const myDataSource = new DataSource({
    type: 'postgres',
    host: process.env.TYPEORM_HOST,
    port: 5432,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: ['src/entity/*.js'],
    logging: true,
    synchronize: true,
});
