const Promise = require('bluebird');
const models = require('../../models');

const classEnrollmentActivity = {};

classEnrollmentActivity
  .createActivity = info => new Promise((resolve, reject) => {
    models.student.student_course_enrolment_activity.create(info)
      .then((created) => {
        resolve(created);
      }).catch((err) => {
        reject(err);
      });
  });


// classEnrollmentActivity.getActivity = info => new Promise((resolve,reject) => {
//   models.student.student_course_enrolment_activity.findAll({
//     where: {
//         people_id: info.id,
//     }
//   }).then((courses) => {
//     models.facuSELECT * FROM student_attendance_data, people, courses_offered where courses_offered.id=student_attendance_data.course_id AND people.id=student_attendance_data.faculty_idlty.faculty_academic_enrolment_activity
//     resolve(courses);
//   }).catch((err) => {
//     reject(err);
//   })
// }) 

classEnrollmentActivity.getActivity = info => new Promise((resolve,reject) => {
    // FIXME: Change this to sequelize
  models.sequelize.query(`SELECT * FROM courses_offered, student_course_enrolment_activity WHERE student_course_enrolment_activity.people_id=${info.id} AND courses_offered.id=student_course_enrolment_activity.course_id;`)
  .then((courses) => {
    models.faculty.faculty_academic_enrolment_activity
    resolve(courses);
  }).catch((err) => {
    console.log(err);
    reject(err);
  })
}) 
  
classEnrollmentActivity.getAllActivity = () => new Promise((resolve,reject) => {
  models.student.student_course_enrolment_activity.findAll()
  .then((courses) => {
    resolve(courses);
  }).catch((err) => {
    reject(err);
  })
}) 

classEnrollmentActivity
  .updateActivity = (info, data) => new Promise((resolve, reject) => {
    models.student.student_course_enrolment_activity.update(info, {
      where: {
        people_id: data.people_id,
        course_id: data.course_id,
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

classEnrollmentActivity
  .deleteActivity = info => new Promise((resolve, reject) => {
    models.student.student_course_enrolment_activity.destroy({
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

module.exports = classEnrollmentActivity;
