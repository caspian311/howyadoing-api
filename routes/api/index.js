const express = require('express');
const router = express.Router();

const data = require('./data');
const profile = require('./profile');

router.get('/data', data.get);
router.post('/data', data.post);

router.get('/profile', profile.get);
router.post('/profile', profile.post);

module.exports = router;