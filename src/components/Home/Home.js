
import React, { useState, useEffect } from 'react'
import './Home.css'
import { Alert, Button, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PeopleIcon from '@mui/icons-material/People';

import PostModal from '../PostModal/PostModal';
import CreatePost from '../CreatePost/CreatePost';
import Post from '../Post/Post'
import Profile from '../Profile/Profile';
import UsersModal from '../UsersModal/UsersModal'
import { usePostContext } from '../PostContext';
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCookie, getUserDetails, enhancePosts } from '../Utils';



function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [userOpenModal, setUserOpenModal] = useState(false);

  const { postContent } = usePostContext(); // Access shared state from context
  const [postData, setPostData] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [notificationsCount, setNotificationsCount] = useState(0);
  const [userData, setUserData] = useState([]);


  const [user, setUser] = useState({
    profilePicture: 'https://example.com/profile2.jpg',
    username: 'Jane Smith',
    handle: 'janesmith',
  })
  let userDetails = getUserDetails("userDetails");

  const handleClick = (component) => {
    if (component == null) {
      setSelectedComponent(null);
    } else {
      setSelectedComponent(component);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`http://twitter-team-turning-testers-19648cf420b7.herokuapp.com/posts/users/${userDetails?.userId}/allNotifications`);
      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }
      const data = await response.json();
      if (data.length > 0) {
        for (const element of data) {
          toast.info("NOTIFICATION: " + element?.text);
        }
      }
      setNotificationsCount(prevCount => prevCount + data.length);
      //auto refresh posts
      getAllPosts();
    } catch (err) {
      console.log("Error in notifications API: " + err.message);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const intervalId = setInterval(fetchNotifications, 20000);
    return () => clearInterval(intervalId);
  }, [userDetails?.userId]);

  useEffect(() => {
    if (userDetails) {
      setUser({
        profilePicture: 'https://example.com/profile2.jpg',
        username: userDetails.name,
        handle: userDetails.email?.split("@gmail.com")[0],
        text: "Learning React and Material UI is fun! 😄 #learning #react"
      })
    }
    getAllPosts(); // Fetch posts when component mounts
    getAllUsers();
  }, []);

  // Function to fetch all posts
  const getAllPosts = async () => {
    const token = getCookie('token'); // Replace with your actual token


    try {
      const response = await fetch('http://twitter-team-turning-testers-19648cf420b7.herokuapp.com/connection/getAllPosts', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      setDataForPosts(result)
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Open the modal when the "Post" button is clicked
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Close the usermodal
  const handleCloseUserModal = () => {
    setUserOpenModal(false);
  };

  const handleOpenUserModal = () => {
    setUserOpenModal(true);
  };

  const setDataForPosts = (result) => {
    const updatedData = result.map(entry => {
      const { name, email } = entry.user; // Extract user's name and email

      // Attach name and email to each post
      const updatedPosts = entry.posts.map(post => ({
        ...post,
        username: name,
        email,
        handle: email?.split("@gmail.com")[0],
        profilePicture: 'https://example.com/profile2.jpg',

      }));

      return {
        ...entry,
        posts: enhancePosts(updatedPosts),
      };

    });
    setPostData(updatedData.map(j => j.posts).flat()); // Store the fetched posts in state
  }


  const submitPostContent = async () => {
    const token = getCookie('token'); // Fetch token from cookies
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));

    try {
      const response = await fetch('http://twitter-team-turning-testers-19648cf420b7.herokuapp.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Adding the token to the Authorization header
        },
        body: JSON.stringify({
          userId: userDetails?.userId,
          content: postContent
        }), // Sending the post data as JSON
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Post successful:', result);
      getAllPosts(); // Refetch posts after successful post

    } catch (error) {
      console.error('Error posting content:', error);
    }
  };

  // Function to fetch all posts
  const getAllUsers = async () => {
    const token = getCookie('token'); // Replace with your actual token


    try {
      const response = await fetch('http://twitter-team-turning-testers-19648cf420b7.herokuapp.com/auth/getAllUsers', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      setUserData(result)
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <>
      <div className='home-wrapper'>
        <ToastContainer />
        <div className='home-navigation'>
          <Drawer
            className='drawer'
            variant="permanent"
            anchor="left"
            sx={{
              width: 240,
              fontSize: 25,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: 350,
                boxSizing: 'border-box',
                backgroundColor: '#ffffff',
                border: 'none',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              },
            }}>
            <div className='home-header'>
              <span className='logo-text'>Turing</span>
              <div className="header__logo"></div>
            </div>
            <List className='navigation-list'>
              {[
                { text: 'Home', icon: <HomeIcon /> },
                { text: 'Notifications', icon: <NotificationsIcon /> },
                { text: 'Profile', icon: <AccountCircleIcon />, component: <Profile /> },
                { text: 'Users', icon: <PeopleIcon /> },
              ].map((item, index) => (
                <ListItem button key={index}
                  onClick={() => {
                    if (item.text === 'Users') {
                      handleOpenUserModal(); // Open the modal when 'Users' is clicked
                    } else {
                      handleClick(item.component);
                    }
                  }}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
              <div className='notification-number'><span>{notificationsCount}</span></div>

            </List>
            <Button
              className="post-button"
              variant="contained"
              color="primary"
              onClick={handleOpenModal}
            >Post
            </Button>

          </Drawer>
        </div>
        {selectedComponent == null
          && <>
            <div className='home-content'>
              <div className='create-post-wrapper'>
                <CreatePost onPost={submitPostContent} />
              </div>
              <div className='post-list-wrapper'>
                {postData.map((post) => (
                  <Post
                    key={post.id}
                    user={post}
                    content={post.content}
                    likes={post.likes}
                    retweets={post.retweets}
                    replies={post.replies}
                    time={post.createdAt}
                    bio={post.bio}
                  />
                ))}
              </div>
            </div>
            <PostModal open={openModal} handleClose={handleCloseModal}
              handlePost={submitPostContent} />
          </>}
        <div style={{ paddingLeft: '200px' }}>
          {selectedComponent}
        </div>
      </div>
      <UsersModal open={userOpenModal} handleClose={handleCloseUserModal} userData={userData} />
    </>
  )
}

export default Home
