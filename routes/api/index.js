const express = require('express');
const router = express.Router();

const data = require('./data');
const profile = require('./profile');
const sessions = require('./sessions');

router.get('/data', data.get);
router.post('/data', data.post);

router.get('/profile', profile.get);
router.post('/profile', profile.post);

router.post('/sessions', sessions.post);

module.exports = router;