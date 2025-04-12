// /backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Import Routes
const eventRoutes = require('./routes/eventRoutes');
const rsvpRoutes = require('./routes/rsvpRoutes');

app.use('/api/events', eventRoutes);
app.use('/api/rsvp', rsvpRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`✅ Backend running on http://localhost:${process.env.PORT}`);
  });
})
.catch(err => console.error('MongoDB connection failed:', err));
