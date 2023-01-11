require('dotenv/config');
module.exports = {
  development: {
    databases: {
      rest: {
        database: process.env.POSTGRES_DB,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASS,
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        dialect: 'postgres',
      },
    },
  },
  production: {
    databases: {
      rest: {
        database: process.env.POSTGRES_PROD_DB,
        username: process.env.POSTGRES_PROD_USER,
        password: process.env.POSTGRES_PROD_PASS,
        host: process.env.POSTGRES_PROD_HOST,
        port: process.env.POSTGRES_PROD_PORT,
        dialect: 'postgres',
      },
    },
  },
};
