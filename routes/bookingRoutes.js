const express = require('express');
const router = express.Router();
const controller = require('../controllers/bookingController');
const auth = require('../middleware/authMiddleware');

router.post('/:id', auth, controller.bookActivity);
router.get('/', auth, controller.getMyBookings);


router.post('/cancel/:id', auth, controller.cancelBooking);

module.exports = router;
