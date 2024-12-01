'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Customer}) {
      // define association here
      this.belongsTo(Customer,{foreignKey:"userId",as : 'customer'}) //as:'customer' is used as allias for Customer model i.e instead of having namw with Caps Customer we get customer
    }
    toJSON(){
      return { ...this.get(),userId:undefined,id:undefined,uuid:undefined}
    }
  }
  cart.init({
    uuid:{
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    tableName:'cart',
    modelName: 'cart',
  });
  return cart;
};