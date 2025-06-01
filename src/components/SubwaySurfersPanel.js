import React, { useRef } from 'react';
import './SubwaySurfersPanel.scss';

const SubwaySurfersPanel = ({ isOpen, onClose, pageText }) => {
  const videoRef = useRef(null);

  return (
    <div className={`subway-surfers-panel ${isOpen ? 'open' : ''}`}>
      <button className="close-button" onClick={onClose}>×</button>
      <div className="video-container">
        <video
          ref={videoRef}
          src="/subway-surfers-clip.mp4"
          loop
          muted
          autoPlay
          playsInline
        />
        <div className="subtitles">
          {pageText}
        </div>
      </div>
    </div>
  );
};

export default SubwaySurfersPanel; 