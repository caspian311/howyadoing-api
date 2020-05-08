const express = require('express');
const router = express.Router();

const data = require('./data');

router.get('/data', data.get);
router.post('/data', data.post);

module.exports = router;