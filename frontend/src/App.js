import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import RepositoryList from './components/RepositoryList';
import RepositoryDetails from './components/RepositoryDetails';
import FollowersPage from './components/FollowersPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/repositories/:username" element={<RepositoryList />} />
        <Route path="/repository/:username/:repoName" element={<RepositoryDetails />} />
        <Route path="/followers/:username" element={<FollowersPage />} />
      </Routes>
    </Router>
  );
}

export default App;