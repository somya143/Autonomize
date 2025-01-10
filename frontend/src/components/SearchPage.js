import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/SearchPage.css';

function SearchPage() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (username.trim() !== '') {
      navigate(`/repositories/${username}`);
    }
  };

  return (
    <div className="search-page-container">
      <h1 className="title">GitHub User Search</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter GitHub Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>
    </div>
  );
}

export default SearchPage;
