const cache = {
    userData: {},
    repositories: {},
    followers: {},
  };
  
  export const getCachedData = (type, key) => {
    return cache[type]?.[key] || null;
  };
  
  export const setCachedData = (type, key, data) => {
    if (!cache[type]) cache[type] = {};
    cache[type][key] = data;
  };