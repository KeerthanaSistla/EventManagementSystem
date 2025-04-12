// /backend/controllers/rsvpController.js
const Event = require('../models/Event');

// RSVP to an event
exports.rsvpEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found.' });

    // Check if user already RSVP'd
    if (event.attendees.includes(req.user.id)) {
      return res.status(400).json({ message: 'You have already RSVP’d.' });
    }

    event.attendees.push(req.user.id);
    await event.save();
    res.status(200).json({ message: 'RSVP successful.', attendees: event.attendees });
  } catch (err) {
    res.status(500).json({ error: 'RSVP failed.' });
  }
};

// Cancel RSVP
exports.cancelRsvpEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found.' });

    event.attendees = event.attendees.filter(
      attendeeId => attendeeId.toString() !== req.user.id
    );
    await event.save();
    res.status(200).json({ message: 'RSVP cancelled.', attendees: event.attendees });
  } catch (err) {
    res.status(500).json({ error: 'Cancel RSVP failed.' });
  }
};

// Get all attendees
exports.getAttendees = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('attendees', 'name email');
    if (!event) return res.status(404).json({ error: 'Event not found.' });

    res.status(200).json({ attendees: event.attendees });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get attendees.' });
  }
};
