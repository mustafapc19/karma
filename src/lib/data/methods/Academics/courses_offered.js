var Promise = require('bluebird')

var models = require('_/data/models')
var coursesOfferedMethods = {}
coursesOfferedMethods.addCoursesOffered = (info) => {
  return new Promise((resolve, reject) => {
    models.Academics.courses_offered.create(info)
      .then((newCourseOffered) => {
        console.log('inside then')
        resolve(newCourseOffered)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}
coursesOfferedMethods.updateCourses = (info) => {
  return new Promise((resolve, reject) => {
    models.Academics.courses_offered.update(info,
      {where: {department_id: info.department_id}})
      .then((updated) => {
        if (updated > 0) {
          resolve(updated)
          console.log('updated')
        } else {
          reject('error')
          console.log('not updated')
        }
      }).catch((error) => {
        reject(error)
      })
  })
}

module.exports = coursesOfferedMethods
