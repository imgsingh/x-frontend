
import React, { createContext, useContext, useState } from 'react';

// Create the context
const PostContext = createContext();

// Create a provider component
export const PostProvider = ({ children }) => {
  const [postContent, setPostContent] = useState('');

  const updateContent = (content) => setPostContent(content);

  return (
    <PostContext.Provider value={{ postContent, updateContent }}>
      {children}
    </PostContext.Provider>
  );
};

// Custom hook to use the PostContext
export const usePostContext = () => useContext(PostContext);
