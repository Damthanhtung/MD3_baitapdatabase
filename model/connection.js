const mysql = require('mysql');
class Connection {
    static configToMysql = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'demo_database1',
        charset: 'utf8_general_ci'
    }
    static getConnection(){
        return mysql.createConnection(Connection.configToMysql);
    }
    static connected() {
        Connection.getConnection().connect(err =>{
            if (err) {
                console.log(err)
            } else {
                console.log('Connection success!!!');
            }
        })
    }
}
module.exports = Connection;