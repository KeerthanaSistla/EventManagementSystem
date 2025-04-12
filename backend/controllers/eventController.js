// /backend/controllers/eventController.js
const Event = require('../models/Event');

// CREATE Event
exports.createEvent = async (req, res) => {
  try {
    const newEvent = new Event({ ...req.body, creator: req.user.id });
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create event.' });
  }
};

// GET All Events (public or user-owned private)
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find({
      $or: [
        { isPublic: true },
        { creator: req.user.id }
      ]
    }).populate('creator', 'name email');
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events.' });
  }
};

// GET Single Event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('creator', 'name email');
    if (!event) return res.status(404).json({ error: 'Event not found.' });

    // Restrict private event access
    if (!event.isPublic && event.creator._id.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized access to private event.' });
    }

    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch event.' });
  }
};

// UPDATE Event
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found.' });
    if (event.creator.toString() !== req.user.id)
      return res.status(403).json({ error: 'You can only update your events.' });

    Object.assign(event, req.body);
    const updated = await event.save();
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update event.' });
  }
};

// DELETE Event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found.' });
    if (event.creator.toString() !== req.user.id)
      return res.status(403).json({ error: 'You can only delete your events.' });

    await event.remove();
    res.status(200).json({ message: 'Event deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete event.' });
  }
};
