const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  "development": {
    "username": process.env.USER_NAME,
    "password": process.env.PASS_WORD,
    "database": process.env.DATA_BASE,
    "host": process.env.HOST,
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.USER_NAME,
    "password": process.env.PASS_WORD,
    "database": process.env.DATA_BASE,
    "host": process.env.HOST,
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.USER_NAME,
    "password": process.env.PASS_WORD,
    "database": process.env.DATA_BASE,
    "host": process.env.HOST,
    "dialect": "postgres"
  }
}
