const dotenv = require('dotenv')
dotenv.config()

const { Sequelize, DataTypes, Model } = require('sequelize');

export const sequelize = new Sequelize({
    username: process.env.USER_NAME,
    password: process.env.PASS_WORD,
    database: process.env.DATA_BASE,
    host: "emp_api_db", //process.env.HOST || to change back to localhost
    dialect: "postgres"
})
export class departments extends Model { 
    // declare id: string ;
    declare department: string ;
}

departments.init({
  department: {
    type: DataTypes.ENUM('HR', 'PS', 'ADMIN'),
    allowNull: false
  }
},{
  sequelize
})

