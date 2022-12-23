const dotenv = require('dotenv')
dotenv.config()

const { Sequelize, DataTypes, Model } = require('sequelize');

export const sequelize = new Sequelize({
    username: process.env.USER_NAME,
    password: process.env.PASS_WORD,
    database: process.env.DATA_BASE,
    host: process.env.HOST,
    dialect: "postgres"
})
export class Employee extends Model { 
    // declare id: string ;
    declare name: string;
    declare salary: number;
    declare department: string ;
}

Employee.init({
  name:{
    type: DataTypes.STRING,
    allowNull: false
  },
  salary:{
    type: DataTypes.STRING,
    allowNull: false
  },
  department: {
    type: DataTypes.ENUM('HR', 'PS'),
    allowNull: false
  }
},{
  sequelize
})

