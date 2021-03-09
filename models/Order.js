const {Model,DataTypes,Sequelize}=require("sequelize")
const sequelize=require("../db")

class Order extends Model{

}

Order.init({
    orderId:{
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:Sequelize.UUIDV4 
    }

},{
    sequelize,
    tableName:"Order"
})

module.exports=Order