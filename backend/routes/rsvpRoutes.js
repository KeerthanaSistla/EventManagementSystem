// /backend/routes/rsvpRoutes.js
const express = require('express');
const router = express.Router();
const { rsvpEvent, cancelRsvpEvent, getAttendees } = require('../controllers/rsvpController');
const { protect } = require('../middleware/authMiddleware');

router.post('/:id/rsvp', protect, rsvpEvent);
router.post('/:id/cancel', protect, cancelRsvpEvent);
router.get('/:id/attendees', protect, getAttendees);

module.exports = router;
