import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import './CreatePost.css'; 

const CreatePost = ({ onPost, onCancel }) => {
  const [postContent, setPostContent] = useState('');

  const handlePostChange = (event) => {
    setPostContent(event.target.value);
  };

  const handlePostSubmit = () => {
    onPost(postContent);
    setPostContent(''); 
  };

  return (
    <div className="post-content-container">
      <TextField
        autoFocus
        multiline
        rows={4}
        fullWidth
        value={postContent}
        onChange={handlePostChange}
        placeholder="What's happening?"
        className="post-textfield"
      />
      <div className="post-content-actions">
        <Button onClick={onCancel} className="cancel-button">
          Cancel
        </Button>
        <Button
          onClick={handlePostSubmit}
          className="post-button"
          disabled={!postContent.trim()}
        >
          Post
        </Button>
      </div>
    </div>
  );
};

export default CreatePost;
