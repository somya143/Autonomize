import React, { useState } from 'react';

function UserSearch() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${username}`, {
        method: 'POST',
      });
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter GitHub Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={fetchUserData}>Search</button>
      {userData && (
        <div>
          <h2>{userData.name}</h2>
          <img src={userData.avatar_url} alt="Avatar" width={100} />
          <p>{userData.bio}</p>
        </div>
      )}
    </div>
  );
}

export default UserSearch;