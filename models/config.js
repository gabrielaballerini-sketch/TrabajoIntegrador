import 'dotenv/config';
import { Sequelize } from 'sequelize';
import pg from 'pg';

const sequelize = process.env.POSTGRES_URL
  ? new Sequelize(process.env.POSTGRES_URL, {
      dialect: 'postgres',
      dialectModule: pg,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        }
      }
    })
  : new Sequelize({
      dialect: 'postgres',
      dialectModule: pg,
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });

export default sequelize;