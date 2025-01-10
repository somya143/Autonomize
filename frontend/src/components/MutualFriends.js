import React, { useState } from 'react';

function MutualFriends() {
  const [username, setUsername] = useState('');
  const [mutualFriends, setMutualFriends] = useState([]);

  const fetchMutualFriends = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${username}/mutual-friends`);
      const data = await response.json();
      setMutualFriends(data.mutualFriends);
    } catch (error) {
      console.error('Error fetching mutual friends:', error);
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
      <button onClick={fetchMutualFriends}>Find Mutual Friends</button>
      {mutualFriends.length > 0 && (
        <div>
          <h3>Mutual Friends:</h3>
          <ul>
            {mutualFriends.map(friend => (
              <li key={friend}>{friend}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MutualFriends;