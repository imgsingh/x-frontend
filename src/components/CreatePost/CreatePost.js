
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import './CreatePost.css'; 
import { usePostContext } from '../PostContext';

const CreatePost = ({ onPost, onCancel, content, onContentChange }) => {
  const { postContent, updateContent } = usePostContext();


  const handlePostSubmit = () => {
    onPost(postContent);
    updateContent('')
  };

  return (
    <div className="post-content-container">
      <TextField
        autoFocus
        multiline
        rows={4}
        fullWidth
        value={postContent}
        onChange={(e) => updateContent(e.target.value)}
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
