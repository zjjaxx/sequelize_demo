const {Model,DataTypes,Sequelize}=require("sequelize")
const sequelize=require("../db")

class Product extends Model{

}

Product.init({
    productName:{
        type:DataTypes.STRING(255),
        allowNull:false
    },
    price:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    img:{
        type:DataTypes.STRING(255),
        allowNull:false
    },
    stock:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    productId:{
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:Sequelize.UUIDV4 
    }

},{
    sequelize,  
    tableName:"Product"
})
 
module.exports=Product