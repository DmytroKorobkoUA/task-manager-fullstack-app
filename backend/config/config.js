require('dotenv').config();

const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: parseInt(process.env.DB_PORT, 10)
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'express_api_test',
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: parseInt(process.env.DB_PORT, 10)
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: parseInt(process.env.DB_PORT, 10)
  }
};

module.exports = config;
