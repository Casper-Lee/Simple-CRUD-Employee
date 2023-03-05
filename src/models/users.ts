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
export class users extends Model { 
    // declare id: string ;
    declare name: string;
    declare salary: number;
    declare department_id: number ;
    static associate(models:any) {
      // define association here
      users.belongsTo(models.Department, { foreignKey: 'department_id' });
    }
}

users.init({
  username:{
    type: DataTypes.STRING,
    allowNull: false
  },
  password:{
    type: DataTypes.STRING,
    allowNull: false
  },
  department_id: {
    type: DataTypes.ENUM(1, 2, 3),
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE(),
    allowNull:false
  },
  updated_at: {
    type:DataTypes.DATE(),
    allowNull:false
  }
},{
  timestamps:false,
  sequelize
})

