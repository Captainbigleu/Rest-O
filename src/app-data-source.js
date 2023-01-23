"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDataSource = void 0;
var dotenv = require("dotenv");
dotenv.config({ path: '.env' });
var typeorm_1 = require("typeorm");
exports.myDataSource = new typeorm_1.DataSource({
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
