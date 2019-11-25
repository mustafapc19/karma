const express = require('express');

const jwt = require('jsonwebtoken');

const router = express.Router();

const secret = require('../../lib/authentication/access_token/secrets.json');
const methodsPeople = require('../../lib/data/methods/people').peopleMethods;
require('data/methods');

/**
 * @api {get} /public Public Entry Gate
 * @apiVersion 1.0.0-alpha-1
 * @apiName EntryGatePublic
 * @apiGroup EntryGates
 *
 * @apiSuccess {Number} status 200
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       'status': 200
 *     }
 */

router.get('/', (req, res) => {
  console.log(req.body)
  res.send({ status: 200 });
});



router.use((req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    next();
  }
  jwt.verify(token, secret.secretKey, (err, decoded) => {
    if (err ) {
      next();
    } else { 
    methodsPeople.userIdExists(decoded.id).then((flag) => {
      if (flag) {
        req.body.id = decoded.id ;
        next();
      } else {
        next();
      }
    })
      .catch((err) => {
        next();
      });
    }
  });
  
});


router.use('/academics', require('./academics'));
router.use('/information', require('./information'));
router.use('/menu', require('./menu'));
router.use('/news', require('./news'));

module.exports = router;
