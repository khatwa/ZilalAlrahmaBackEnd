var express = require('express');
var router = express.Router();

router.get('/', (req, response) => {
  response.status(200).send('Welcome to Zilal Alrahma');
});

module.exports = router;
