'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employees extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // employees.belongsTo(models.Department, { foreignKey: 'department_id' });
    }
  }
  employees.init({
    name: DataTypes.STRING,
    salary: DataTypes.STRING,
    department: DataTypes.ENUM
  }, {
    sequelize,
    modelName: 'employee',
  });
  return employees;
};