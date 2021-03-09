const {Model,DataTypes,Sequelize}=require("sequelize")
const sequelize=require("../db")

class ProductOrder extends Model{

}

ProductOrder.init({  
      quality:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
      } 

},{
    sequelize,
    tableName:"ProductOrder"
})

module.exports=ProductOrder