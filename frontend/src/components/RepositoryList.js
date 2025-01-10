import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './styles/RepositoryList.css';
import { getCachedData, setCachedData } from '../cache';

function RepositoryList() {
  const { username } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const cachedUserInfo = getCachedData('userData', username);
    const cachedRepositories = getCachedData('repositories', username);

    if (cachedUserInfo) {
        setUserInfo(cachedUserInfo);
      } else {
        fetch(`${process.env.REACT_APP_BACKEND_URI}/${username}`)
          .then((response) => response.json())
          .then((data) => {
            setUserInfo(data);
            setCachedData('userData', username, data);
          });
      }

    if (cachedRepositories) {
        setRepositories(cachedRepositories);
      } else {
        fetch(`${process.env.REACT_APP_BACKEND_URI}/${username}/repos`)
          .then((response) => response.json())
          .then((data) => {
            setRepositories(data);
            setCachedData('repositories', username, data);
          });
      }

  }, [username]);

  return (
    <div className="repository-list-container">
      {userInfo && (
        <div className="user-info">
          <img src={userInfo.avatar_url} alt="Avatar" className="avatar" />
          <div className="user-details">
            <h2>{userInfo.name}</h2>
            <p className="bio">{userInfo.bio}</p>
            <Link to={`/followers/${username}`} className="view-followers">View Followers</Link>
          </div>
        </div>
      )}
      <h3 className="repositories-heading">Repositories:</h3>
      <div className="repositories-grid">
        {repositories.map((repo) => (
          <div key={repo.name} className="repository-card">
            <h4>{repo.name}</h4>
            <p>{repo.description || "No description available"}</p>
            <Link to={`/repository/${username}/${repo.name}`} className="details-link">View Details</Link>
          </div>
        ))}
      </div>
      <Link to="/" className="back-to-search">Back to Search</Link>
    </div>
  );
}

export default RepositoryList;