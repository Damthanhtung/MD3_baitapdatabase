const fs = require('fs');
const qs = require('qs');
const StudentService = require('../../service/studentService');
const Point = require('D:\\Codegym\\tháng 3\\demoDatabase1\\src\\service\\Point.js');
class StudentRouting {
    static getHtmlStudents(students, point, indexHtml) {
        console.log(point)
        let tbody = '';
        students.map((student, index) => {
            tbody += `<tr style="text-align: center"><td>${index}</td>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.address}</td>
            <td><img src="${student.image}"alt="Không có" style="width: 50px;height: 50px"></td>
            <td>${point[student.idPoint].point}</td>
            <td><a href="student/edit/${student.id}" class="btn btn-danger">Edit</a></td>
            <td><a href="student/delete/${student.id}" class="btn btn-danger">Delete</a></td>
        </tr>`
        })
        indexHtml = indexHtml.replace('{students}', tbody);
        return indexHtml;
    }

    static showHome(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./views/index.html', 'utf-8', async (err, indexHtml) => {
                if (err) {
                    console.log(err)
                } else {
                    let point = await Point.getPointStudent();
                    let students = await StudentService.getStudents();
                    indexHtml = StudentRouting.getHtmlStudents(students,point, indexHtml);
                    res.writeHead(200, 'text/html');
                    res.write(indexHtml);
                    res.end();
                }
            })
        } else {
            let data = '';
            console.log(1)
            req.on('data', chuck => {
                data += chuck;
            })
            req.on('end',async (err) => {
                if (err) {
                    console.log(err)
                } else {
                    let search = qs.parse(data)
                    console.log(search.search)
                    fs.readFile('./views/index.html', 'utf-8', async (err, indexHtml) => {
                        if (err) {
                            console.log(err)
                        } else {
                            let students = await StudentService.searchStudent(search.search);
                            indexHtml = StudentRouting.getHtmlStudents(students, indexHtml);
                            res.writeHead(200, 'text/html');
                            res.write(indexHtml);
                            res.end();
                        }
                    })
                }
            })
        }
    }

    static showFormCreate(req, res) {
        if (req.method === "GET") {
            fs.readFile('./views/student/create.html', 'utf-8', async (err, indexHtml) => {
                if (err) {
                    console.log(err.message);
                } else {
                    let points =await Point.getPointStudent()
                    let optionHtml = ``;
                    for (let i=0;i<points.length; i++) {
                        optionHtml += `<option value="${points[i].id}">${points[i].point}>${points[i].type}</option>`
                    }
                    indexHtml = indexHtml.replace('{points}',optionHtml);
                    res.writeHead(200, 'text/html');
                    res.write(indexHtml);
                    res.end();
                }
            })
        } else {
            let studentChunk = '';
            req.on('data', chunk => {
                studentChunk += chunk
            });
            req.on('end', async (err) => {
                if (err) {
                    console.log(err);
                } else {
                    let student = qs.parse(studentChunk);
                    await StudentService.saveStudent(student)
                    res.writeHead(301, {'location': '/home'});
                    res.end();
                }
            });

        }
    }

    static showFormEdit(req, res, id) {
        if (req.method === "GET") {
            fs.readFile('./views/student/edit.html', 'utf-8', async (err, editHtml) => {
                if (err) {
                    console.log(err.message);
                } else {
                    let student = await StudentService.findById(id);
                    editHtml = editHtml.replace('{name}', student[0].name);
                    editHtml = editHtml.replace('{age}', student[0].age);
                    editHtml = editHtml.replace('{address}', student[0].address);
                    editHtml = editHtml.replace('{image}', student[0].image);
                    res.writeHead(200, 'text/html');
                    res.write(editHtml);
                    res.end();
                }
            })
        } else {

        }

    }

    static async deleteStudent(req, res, id) {
        if (req.method === 'GET') {
            fs.readFile('./views/student/delete.html', 'utf8', async (err, deleteHtml) => {
                if (err) {
                    console.log(err.message);
                } else {
                    res.writeHead(200, 'text/html');
                    deleteHtml = deleteHtml.replace('{id}', id);
                    res.write(deleteHtml);
                    res.end();
                }
            });
        } else {
            let mess = await StudentService.remove(id);
            res.writeHead(301, {'location': '/home'});
            res.end();
        }
    }
}

module.exports =StudentRouting;