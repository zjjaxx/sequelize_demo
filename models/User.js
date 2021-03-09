const {Model,DataTypes,Sequelize}=require("sequelize")
const sequelize=require("../db")

class User extends Model{

}

User.init({
    username:{
        type:DataTypes.STRING(255),
        allowNull:false
    },
    phone:{
        type:DataTypes.STRING(11),
        allowNull:false
    },
    password:{
        type:DataTypes.STRING(255),
        allowNull:false
    },
    uid:{
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:Sequelize.UUIDV4 
    }

},{
    sequelize,
    tableName:"User"
})

module.exports=User