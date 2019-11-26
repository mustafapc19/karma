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


classEnrollmentActivity.getActivity = info => new Promise((resolve,reject) => {
  models.student.student_course_enrolment_activity.findAll({
    where: {
        people_id: info.id,
    },
    include: [
      {
        model: models.academics.courses_offered
        // include: [
        //   {
        //     model: models.faculty.faculty_academic_enrolment_activity,
        //     include: [
        //       {
        //         model: models.people.people
        //       }
        //     ]
        //   }
        // ]
      }
    ]
  })
  .then((studentceas) => {
    let resObj = {};
    studentceas.map(studentcea => {
          resObj.activity = studentcea.activity;
          console.log("!!!!!!!!!!!!!!)))))))))))))",studentcea.courses_offered)
          // studentcea.courses_offered.map(cour => {
          //   resObj.na = cour.name;
          // })
          resObj.official_courses_id = studentcea.courses_offered.official_course_id;
          resObj.name = studentcea.courses_offered.name;
          })
        
    // console.log("!!!!",resObj);
    resolve(resObj);
  })
  .catch((err) => {
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
