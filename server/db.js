import pkg from 'pg';
import { config } from 'dotenv';

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.USERNAME,
  password: '',
  host: process.env.HOST,
  port: process.env.DBPORT,
  database: 'todoapp',
});

export default pool;
