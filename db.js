const { Sequelize} = require('sequelize');
// 方法 2: 分别传递参数 (其它数据库)
const sequelize = new Sequelize('test', 'root', '123456jia', {
    host: 'localhost',
    timezone: "+08:00",//设置时区
    dialect: 'mysql'/* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
});
sequelize.sync({ force: false })
module.exports=sequelize
