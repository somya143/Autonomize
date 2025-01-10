import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './styles/FollowersPage.css';
import { getCachedData, setCachedData } from '../cache';
import Loader from './Loader';

function FollowersPage() {
  const { username } = useParams();
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cachedFollowers = getCachedData('followers', username);
    if (cachedFollowers) {
        setFollowers(cachedFollowers);
        setLoading(false);
      } else {
        fetch(`${process.env.REACT_APP_BACKEND_URI}/${username}/followers`)
          .then((response) => response.json())
          .then((data) => {
            setFollowers(data);
            setCachedData('followers', username, data);
            setLoading(false);
          });
      }
  }, [username]);

  if (loading) return <Loader />;

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