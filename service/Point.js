const Connection = require('../model/connection');
Connection.connected();

class Point {
    static getPointStudent(){
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query('select * from pointstudent',(err,points)=>{
                if (err) {
                    reject(err);
                } else {
                    resolve(points);
                }
            });
        })
    }
}
module.exports = Point;