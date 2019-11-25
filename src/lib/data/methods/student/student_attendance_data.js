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
    models.student.student_attendance_data.findAll({
      where: {
        people_id: data.people_id,
      },
    }).then((courses) => {
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
          info.value = doc.value;
          info.max_value = doc.max_value + 1;
          break;
        }
        default: {
          info.value = doc.value + info.value;
          info.max_value = doc.max_value + info.value;
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
