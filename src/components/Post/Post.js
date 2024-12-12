
import React from 'react';
import { Avatar, IconButton } from '@mui/material';
import ThumbUp from '@mui/icons-material/ThumbUp';
import ChatBubbleOutline from '@mui/icons-material/ChatBubbleOutline';
import Repeat from '@mui/icons-material/Repeat';
import './Post.css';
import moment from 'moment';


const Post = ({ user, text, content, likes, retweets, replies, time, bio }) => {
  function getRelativeTime(time) {
    if (!time) {
      return "Invalid date";
    }
    return moment(time).fromNow();
  }

  return (
    <div className="post-container">
      <div className="post-content">
        <div className='post-content-primary'>
          <Avatar src={user?.profilePicture} className="profile-picture" />
          <div className='post-content-primary-content'>
            <div className='post-content-primary-username'>
              <span className="username">{user?.username}</span>
              <span className="handle">@{user?.handle}</span> • <span className='post-time'>{getRelativeTime(time)}</span>

            </div>
            <div className="post-text">{bio}</div>
          </div>

        </div>
        <div className='post-conx'>{content}</div>

        <div className="engagement-icons">
          <IconButton className="icon">
            <ThumbUp />
            <span className='reaction-text'>{likes}</span>
          </IconButton>
          <IconButton className="icon">
            <Repeat />
            <span className='reaction-text'>{retweets}</span>
          </IconButton>
          <IconButton className="icon">
            <ChatBubbleOutline />
            <span className='reaction-text'>{replies}</span>
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Post;
