// /frontend/src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EventDetails from './pages/EventDetails';
import Home from './pages/Home';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events/:id" element={<EventDetails />} />
    </Routes>
  );
};

export default App; // ✅ This line is essential
