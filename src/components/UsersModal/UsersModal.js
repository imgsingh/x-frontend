import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, Button, Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import "../UsersModal/UsersModal.css";
import { getCookie, getUserDetails, setUserDetails } from '../Utils';

const UsersModal = ({ userData = [], open, handleClose }) => {
  const [followStatus, setFollowStatus] = useState([]);
  const currentUserDetails = getUserDetails("userDetails"); // Get current user details from local storage

  // Initialize follow status based on followerList (only when userData changes)
  useEffect(() => {
    if (userData.length > 0 && followStatus.length === 0) {
      //get user follow list
      let followlist = null;
      for (const user of userData) {
        if (user.id == currentUserDetails.userId) {
          followlist = Array.isArray(user.followerList)
            ? user.followerList.map((follower) => follower.id)
            : null;
        }
      }
      if (followlist != null) {
        const initialFollowStatus = userData.map((user) => {
          return {
            ...user, // Spread operator to retain all user properties (id, name, email, profilePicture, etc.)
            isFollowing: followlist.includes(user.id), // Check if user.id exists in followList
          };
        });

        setFollowStatus(initialFollowStatus);
      }
    }
  }, [userData]);

  // Toggle follow/unfollow
  const onClickFollow = (userId) => {
    setFollowStatus((prevStatus) =>
      prevStatus.map((status) =>
        status.id === userId ? { ...status, isFollowing: !status.isFollowing } : status
      )
    );

    callAPIToChangeFollow(userId);
  };

  function callAPIToChangeFollow(userId) {
    fetch("http://twitter-team-turning-testers-19648cf420b7.herokuapp.com/connection/follow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId1: currentUserDetails.userId.toString(),
        userId2: userId.toString()
      })
    })
      .then((data) => {
        if (data.status == 201) {
          console.log("FOLLOWED/UNFOLLOWED")
          getAllUsers();
        }
      })
      .catch((error) => console.error("Error calling API:", error));
  }

  const getAllUsers = async () => {
    const token = getCookie('token');
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
      //get user details
      const userDetials = getUserDetails("userDetails");
      if (userDetials.userId) {
        const filteredUser = result.find((item) => item.id == userDetials.userId);
        userDetials.followersCount = filteredUser.followerList.length;
        setUserDetails(userDetials);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        className="modal-paper"
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "700px",
              height: "700px",
              marginLeft: "20%",
            },
          },
        }}
      >
        <DialogTitle>
          <div className="user-dialog-title">
            <div>Users</div>
            <div onClick={handleClose} className="user-dialog-close-button">
              <CloseIcon />
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="user-list-wrapper">
            {userData.map((user, index) => (
              <div className="user-item" key={user.id}>
                <Avatar src={user?.profilePicture} className="profile-picture" />
                <div className="name-handle">
                  <div className="user-list-name">{user.name}</div>
                  <div className="user-list-handle">
                    @{user.email?.split("@gmail.com")[0]}
                  </div>
                </div>
                {user.id !== currentUserDetails.userId && <Button
                  className="follow-button"
                  variant="contained"
                  color={followStatus[index]?.isFollowing ? "secondary" : "primary"}
                  onClick={() => onClickFollow(user.id)}
                >
                  {followStatus[index]?.isFollowing ? "Unfollow" : "Follow"}
                </Button>}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersModal;
