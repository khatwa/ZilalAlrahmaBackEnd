var express = require('express');
var router = express.Router();

router.get('/', (req, response) => {
  response.status(200).send({ phone: '0123456789' });
});

module.exports = router;
