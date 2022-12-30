const connection = require('../model/connection')
const Connection = require("../../../DemoDatabase/model/connection");
class StudentService {
    static getStudents(){
        let connect = connection.getConnection()
        return new Promise((resolve, reject) => {
            connect.query('select * from student;',(err,students)=>{
                if (err){
                    reject(err);
                }else {
                    resolve(students);
                }
            })
        })

    }
    static saveStudent(student) {
        let connect = connection.getConnection()
        return new Promise((resolve, reject) => {
            connect.query(`insert into student(name, age, address, image,idPoint) VALUES ('${student.name}',${student.age},'${student.address}','${student.image}'),'${+student.idPoint}'`,(err,students)=>{
                if (err){
                    reject(err);
                }else {
                    resolve(students);
                }
            })
        })
    }
    static findById(id) {
        let connect = connection.getConnection()
        return new Promise((resolve, reject) => {
            connect.query(`select * from student where id = ${id}`,(err,students)=>{
                if (err){
                    reject(err);
                }else {
                    resolve(students);
                }
            })
        })
    }
    static remove(id) {
        let sql = `delete from student where id = ${id}`
        let connect = connection.getConnection()
        return new Promise((resolve, reject) => {
            connect.query(sql,(err)=>{
                if (err){
                    reject(err);
                }else {
                    resolve('Xóa thành công!!!');
                }
            })
        })

    }
    static searchStudent(search) {
        let connection = Connection.getConnection();
        let sql = `select * from demo_database1.student where name like '%${search}%';`
        return new Promise((resolve, reject) => {
            connection.query(sql,(err, students) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(students);
                }
            })
        })
    }
}
module.exports = StudentService;