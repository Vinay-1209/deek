"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({cart}) {
      // define association here
      this.hasOne(cart,{foreignKey:"userId",as:"cart"})
    }

    toJSON(){
      return { ...this.get(), id:undefined} //it does not return id to the user(customer) but it exists in database
    }


  }
  Customer.init(
    {
      uuid:{
        type:DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        
      },


      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          notNull:{msg:"Customer must have a name"},
          notEmpty:{msg:"Name must not be empty"}
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          notNull:{msg:"Customer must have a name"},
          notEmpty:{msg:"Name must not be empty"},
          isEmail:{msg:"Email must be a valid email"}
        }
      },
      bill: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "customer",
      modelName: "Customer",
    }
  );
  return Customer;
};
