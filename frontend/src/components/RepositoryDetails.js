import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './styles/RepositoryDetails.css';

function RepositoryDetails() {
  const { username, repoName } = useParams();
  const [repository, setRepository] = useState(null);

  useEffect(() => {
    const fetchRepositoryDetails = async () => {
      const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
      const data = await response.json();
      setRepository(data);
    };

    fetchRepositoryDetails();
  }, [username, repoName]);

  return (
    <div className="repository-details-container">
      {repository ? (
        <div className="repository-details">
          <h2 className="repository-name">{repository.name}</h2>
          <p className="repository-description">{repository.description || "No description available"}</p>
          <div className="repository-stats">
            <span>🌟 Stars: {repository.stargazers_count}</span>
            <span>🍴 Forks: {repository.forks_count}</span>
            <span>🛠️ Language: {repository.language || "Not specified"}</span>
          </div>
          <div className="repository-links">
            <a href={repository.html_url} target="_blank" rel="noopener noreferrer" className="external-link">
              View on GitHub
            </a>
          </div>
        </div>
      ) : (
        <p>Loading repository details...</p>
      )}
      <Link to={`/repositories/${username}`} className="back-to-repositories">Back to Repositories</Link>
    </div>
  );
}

export default RepositoryDetails;
