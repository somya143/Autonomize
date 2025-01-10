import React, { useState } from 'react';

function UserList() {
  const [sortedUsers, setSortedUsers] = useState([]);

  const fetchSortedUsers = async (field) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/sorted/${field}`);
      const data = await response.json();
      setSortedUsers(data);
    } catch (error) {
      console.error('Error fetching sorted users:', error);
    }
  };

  return (
    <div>
      <button onClick={() => fetchSortedUsers('public_repos')}>Sort by Public Repos</button>
      <ul>
        {sortedUsers.map((user) => (
          <li key={user.username}>{user.name} - {user.public_repos} repos</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;