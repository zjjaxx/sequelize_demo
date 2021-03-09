const { Sequelize} = require('sequelize');
// 方法 2: 分别传递参数 (其它数据库)
const sequelize = new Sequelize('test', 'root', '123456jia', {
    host: 'localhost',
    dialect: 'mysql'/* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
});
sequelize.sync({ force: true })
module.exports=sequelize
