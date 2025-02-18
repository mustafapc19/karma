const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  console.log(req.body);
  
  res.json({
    status: 200,
  });
});

router.use('/login', require('./login'));
router.use('/register', require('./register'));

module.exports = router;
