import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Button } from '@mui/material';
import { Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import "../UsersModal/UsersModal.css";

const UsersModal = ({ userData = [], open, handleClose }) => {
  // State to track follow status for each user
  const [followStatus, setFollowStatus] = useState(
    userData.map(() => false) // Initialize with 'false' for all users
  );

  const onClickFollow = (index) => {
    // Toggle follow status for the clicked user
    setFollowStatus((prevStatus) => {
      const updatedStatus = [...prevStatus];
      updatedStatus[index] = !updatedStatus[index];
      return updatedStatus;
    });
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
              <div className="user-item" key={index}>
                <Avatar src={user?.profilePicture} className="profile-picture" />
                <div className="name-handle">
                  <div className="user-list-name">{user.name}</div>
                  <div className="user-list-handle">
                    @{user.email?.split("@gmail.com")[0]}
                  </div>
                </div>
                <Button
                  className="follow-button"
                  variant="contained"
                  color={followStatus[index] ? "secondary" : "primary"}
                  onClick={() => onClickFollow(index)}
                >
                  {followStatus[index] ? "Unfollow" : "Follow"}
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersModal;
