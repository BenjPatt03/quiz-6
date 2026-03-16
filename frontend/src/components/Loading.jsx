import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="spinner">
        <div className="spinner-ring"></div>
      </div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
