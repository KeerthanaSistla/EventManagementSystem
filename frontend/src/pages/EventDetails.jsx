import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [rsvpStatus, setRsvpStatus] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/events/${id}`)
      .then(res => setEvent(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleRSVP = (status) => {
    axios.post(`http://localhost:5000/api/events/${id}/rsvp`, { status })
      .then(res => setRsvpStatus(res.data.message))
      .catch(err => console.error(err));
  };

  if (!event) return <p>Loading...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{event.name}</h2>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p>{event.description}</p>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => handleRSVP('yes')}>✅ Yes</button>
        <button onClick={() => handleRSVP('no')}>❌ No</button>
        <button onClick={() => handleRSVP('maybe')}>🤔 Maybe</button>
        {rsvpStatus && <p style={{ color: 'green' }}>{rsvpStatus}</p>}
      </div>
    </div>
  );
};

export default EventDetails;
