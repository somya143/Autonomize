import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './styles/FollowersPage.css';

function FollowersPage() {
  const { username } = useParams();
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      const response = await fetch(`https://api.github.com/users/${username}/followers`);
      const data = await response.json();
      setFollowers(data);
    };

    fetchFollowers();
  }, [username]);

  return (
    <div className="followers-page-container">
      <h3 className="followers-heading">Followers of {username}:</h3>
      <div className="followers-grid">
        {followers.map((follower) => (
          <div key={follower.login} className="follower-card">
            <img src={follower.avatar_url} alt={follower.login} className="follower-avatar" />
            <h4 className="follower-name">{follower.login}</h4>
            <Link to={`/repositories/${follower.login}`} className="view-repositories-link">View Repositories</Link>
          </div>
        ))}
      </div>
      <Link to={`/repositories/${username}`} className="back-to-repositories">Back to Repositories</Link>
    </div>
  );
}

export default FollowersPage