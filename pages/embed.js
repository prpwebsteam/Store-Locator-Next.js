// pages/embed.js
import React from 'react';
import EmbedMap from '../app/components/EmbedMap';
import '../app/globals.css';

const EmbedPage = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
        <EmbedMap />
    </div>
  );
};

export default EmbedPage;