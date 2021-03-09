const {Model,DataTypes,Sequelize}=require("sequelize")
const sequelize=require("../db")

class Cart extends Model{

}

Cart.init({
    cartId:{
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:Sequelize.UUIDV4 
    }

},{
    sequelize,
    tableName:"Cart"
})

module.exports=Cart