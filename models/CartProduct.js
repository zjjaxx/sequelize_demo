const {Model,DataTypes,Sequelize}=require("sequelize")
const sequelize=require("../db")

class CartProduct extends Model{

}

CartProduct.init({  
      quality:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
      } 

},{
    sequelize,
    tableName:"CartProduct"
})

module.exports=CartProduct