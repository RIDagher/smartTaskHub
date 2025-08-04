const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  // Database configuration
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres',
  },
  // Test and production configurations can be added similarly
  test: {
    username: process.env.DB_TEST_USERNAME || 'postgres',
    password: process.env.DB_TEST_PASSWORD || null,
    database: process.env.DB_TEST_NAME || 'test_db',
    host: process.env.DB_TEST_HOST || '127.0.0.1',
    dialect: 'postgres',
  },
  // Production configuration
  production: {
    username: process.env.DB_PROD_USERNAME || 'postgres',
    password: process.env.DB_PROD_PASSWORD || null,
    database: process.env.DB_PROD_NAME || 'prod_db',
    host: process.env.DB_PROD_HOST || '127.0.0.1',
    dialect: 'postgres',
  }
};