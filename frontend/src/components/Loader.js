import React from 'react';
import './styles/Loader.css';

function Loader() {
  return (
    <div className="loader-container">
      <img
        src="https://media.tenor.com/UnFx-k_lSckAAAAM/amalie-steiness.gif"
        alt="Loading..."
        className="loader-gif"
      />
    </div>
  );
}

export default Loader;