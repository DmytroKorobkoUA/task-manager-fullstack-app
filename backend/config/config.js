require('dotenv').config();

const config = {
  development: {
    username: process.env.DB_USER || 'default_user',
    password: process.env.DB_PASSWORD || 'default_password',
    database: process.env.DB_NAME || 'default_database',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432
  },
  test: {
    username: process.env.DB_USER || 'default_user',
    password: process.env.DB_PASSWORD || 'default_password',
    database: 'express_api_test',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432
  },
  production: {
    username: process.env.DB_USER || 'default_user',
    password: process.env.DB_PASSWORD || 'default_password',
    database: process.env.DB_NAME || 'default_database_prod',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432
  }
};

module.exports = config;
