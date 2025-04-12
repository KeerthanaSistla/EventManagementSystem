import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/events')
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Upcoming Events</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
        {events.map(event => (
          <div key={event._id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem' }}>
            <h3>{event.name}</h3>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p>{event.description.slice(0, 80)}...</p>
            <Link to={`/events/${event._id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
