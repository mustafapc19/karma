const Promise = require('bluebird');
const models = require('../../models');

const attendanceDataMethods = {};

attendanceDataMethods
  .addAttendance = info => new Promise((resolve, reject) => {
    models.student.student_attendance_data.create(info)
      .then((created) => {
        resolve(created);
      }).catch((err) => {
        reject(err);
      });
  });

attendanceDataMethods
  .getAttendance = data => new Promise((resolve, reject) => {
    console.log(data);
    models.student.student_attendance_data.findAll({
      where: {
        faculty_id: data.faculty_id,
        course_id: data.course_id,
      },
    }).then((people) => {
      resolve(people);
    })
      .catch((err) => {
        reject(err);
      });
  });

attendanceDataMethods
  .getAttendanceSingle = data => new Promise((resolve, reject) => {
    console.log(data);
    // models.student.student_attendance_data.findAll({
    //   where: {
    //     people_id: data.people_id,
    //   },
    // })
    // FIXME: Change this to sequelize
    models.sequelize.query(`SELECT * FROM student_attendance_data, people, courses_offered where courses_offered.id=student_attendance_data.course_id AND people.id=student_attendance_data.faculty_id AND student_attendance_data.people_id=${data.people_id}`)
  .then((courses) => {
      resolve(courses);
    })
      .catch((err) => {
        reject(err);
      });
  });

attendanceDataMethods
  .updateAttendance = (info, data) => new Promise((resolve, reject) => {
    console.log(data, info);

    models.student.student_attendance_data.findOne({
      where: {
        student_id: data.student_id,
        course_id: data.course_id,
        faculty_id: data.faculty_id
      },
    }).then((doc) => {
      switch(info.value){
        case 0: {
          // console.log("DOC.value",doc.value," ",doc.max_value);
          info.value = doc.value;
          
          if(info.value > info.max_value + doc.max_value){
            info.max_value = doc.max_value;
            reject(0);
          } else {
            info.max_value = doc.max_value + info.max_value;
          }
          break;
        }
        default: {
          info.max_value = doc.max_value + info.value;
          info.value = doc.value + info.value;
          break; 
        }
      }
      models.student.student_attendance_data.update(info, {
        where: {
          student_id: data.student_id,
          course_id: data.course_id,
          faculty_id: data.faculty_id
        },
      }).then((updated) => {
        if(updated > 0){
          resolve(updated);
        } else {
          reject(updated);
        }
      })
        .catch((err) => {
          reject(err);
        })
    }).catch((err) => {
      reject(err);
    })
  })

/*    models.student.student_attendance_data.update(info, {
      where: {
        student_id: data.student_id,
        course_id: data.course_id,
        faculty_id: data.faculty_id
      },
    }).then((updated) => {
      if (updated > 0) {
        resolve(updated);
      } else {
        reject(updated);
      }
    }).catch((err) => {
      reject(err);
    });
  });
*/
attendanceDataMethods
  .deleteAttendance = info => new Promise((resolve, reject) => {
    models.student.student_attendance_data.destroy({
      where: info,
    }).then((deleted) => {
      if (deleted > 0) {
        resolve(deleted);
      } else {
        reject(deleted);
      }
    }).catch((err) => {
      reject(err);
    });
  });

module.exports = attendanceDataMethods;
