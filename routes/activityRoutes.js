const express = require('express');
const router = express.Router();
const controller = require('../controllers/activityController');
const auth = require('../middleware/authMiddleware');

router.get('/',auth, controller.listActivities);

module.exports = router;
