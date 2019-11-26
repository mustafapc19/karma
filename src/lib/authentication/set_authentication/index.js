const bcrypt = require('bcrypt');

const saltRound = 10;
const models = require('../../data/models');

const today = new Date();
const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
const dateTime = `${date} ${time}`;
// let id = 0;



const setAuthentication = (userID, password, firstname, middlename, lastname, gender, nationality, dob) => {
  return new Promise((resolve,reject) => {
    bcrypt.hash(password,saltRound).then((hash) => {
      models.people.people.create({
        first_name : firstname,
        middle_name: middlename,
        last_name: lastname,
        gender: gender,
        nationality: nationality,
        date_of_birth: dob
      }).then((peopleDoc) => {
        if(peopleDoc){
          models.people.people_information.create({
            people_id : peopleDoc.id,
            slug_id: 1,
            data: userID,
            created_at: dateTime,
            updated_at: dateTime
          }).then((people_informationDoc) => {
          if(people_informationDoc){ 
             models.authentication.authentication_information_local.create({
              people_id: people_informationDoc.people_id,
              password_hash : hash,
              created_at: dateTime,
              updated_at: dateTime
            }).then((authentication_information_localDoc) => {
              if(authentication_information_localDoc){
                resolve(authentication_information_localDoc);
              } else {
                reject("Couldnt Insert");
              }
            })
            .catch((err) => {
              reject(err);
            })
            } else {
              reject("Couldnt insert");
            }
          })
          .catch((err) => {
            reject(err);
          });
        } else {
          reject("Couldnt Insert");
        }
      }).catch((err) => {
        reject(err);
      })
    })
    .catch((err) => {
      resolve(err);
    })
  })
} 

module.exports = setAuthentication;

/*
const setAuthentication = function (userID, password, firstname, middlename, lastname, gender, nationality, dob) {
  // parameters to argon2 hashing function (strictly for password.length >= 12)
  // added safety factor 256
  return new Promise(((resolve, reject) => {
    bcrypt.hash(password, saltRound).then((hash) => {
      models.sequelize.query(`INSERT INTO people (first_name, middle_name, last_name, gender, date_of_birth, nationality, created_at, updated_at) VALUES ("${firstname}","${middlename}","${lastname}","${gender}","${dob}","${nationality}","${dateTime}","${dateTime}")`,
      // eslint-disable-next-line max-len
      // models.sequelize.query('SELECT JSON_CONTAINS((SELECT data FROM people_informations WHERE people_id = 1 AND slug_id = 1), \'["' + email + '"]\') as check_flag;',
        { type: models.sequelize.QueryTypes.INSERT })
        .then((result) => {
          id = result[0];
          console.log(result);
          return new Promise(((resolve, reject) => {
            models.sequelize.query(`INSERT INTO people_information (people_id, slug_id, data, created_at, updated_at) VALUES (${id},1,'"${userID}"',"${dateTime}","${dateTime}")`,
              // eslint-disable-next-line max-len
              // models.sequelize.query('SELECT JSON_CONTAINS((SELECT data FROM people_informations WHERE people_id = 1 AND slug_id = 1), \'["' + email + '"]\') as check_flag;',
              { type: models.sequelize.QueryTypes.INSERT })
              .then((result) => {
                console.log(result);
                return new Promise(((resolve, reject) => {
                  models.sequelize.query(`INSERT INTO authentication_information_local (people_id, password_hash, created_at, updated_at) VALUES (${id},"${hash}","${dateTime}","${dateTime}")`,
                    // eslint-disable-next-line max-len
                    // models.sequelize.query('SELECT JSON_CONTAINS((SELECT data FROM people_informations WHERE people_id = 1 AND slug_id = 1), \'["' + email + '"]\') as check_flag;',
                    { type: models.sequelize.QueryTypes.INSERT })
                    .then((result) => {
                      console.log(result);
                      resolve(result);
                    }).catch((err) => {
                      console.log(err);
                      reject(err);
                    });
                }));
                resolve(result);
              }).catch((err) => {
                console.log(err);
                reject(err);
              });
          }));
        }).catch((err) => {
          console.log(err);
          reject(err);
        });
      console.log(hash);
      resolve(hash);
    }).catch((err) => {
      console.log(err);
    });
  }));
};*/
// const Promise = require('bluebird');
// const argon2 = require('argon2');

// const passwordVerifier = function (password, passwordHash) {
//   return new Promise(((resolve, reject) => {
//     const options = {
//       timeCost: 30, memoryCost: 2 ** 19, parallelism: 16, type: argon2.argon2i,
//     };
//     argon2.hash(password, options).then((hash) => {
//       console.log(hash);

//   })
// }
// ));
// };

// module.exports = passwordVerifier;GET
