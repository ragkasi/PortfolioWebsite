import React from 'react';
import './SubwaySurfersButton.scss';

const SubwaySurfersButton = ({ onClick }) => {
  return (
    <button className="subway-surfers-button" onClick={onClick}>
      🏃‍♂️
    </button>
  );
};

export default SubwaySurfersButton; 