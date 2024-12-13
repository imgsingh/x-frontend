
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Button } from '@mui/material';
import { Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import "../UsersModal/UsersModal.css"


const UsersModal = ({ userData = [],  open, handleClose}) => { 

      const onClickFollow = () => {
        handleClose()
       }


  return (
    <div>

      <Dialog open={open} onClose={handleClose} className="modal-paper"
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "600px",
            maxWidth: "700px",
            height: "700px",
            marginLeft: "20%"
          },
        },
      }}>
        <DialogTitle>
          <div className='user-dialog-title'>
            <div>Users</div>
            <div onClick={handleClose} className='user-dialog-close-button'><CloseIcon/></div>
          </div></DialogTitle>
        <DialogContent>
            <div className='user-list-wrapper'>
            {userData.map((user) => (
                <div className='user-item'>
                     <Avatar src={user?.profilePicture} className="profile-picture" />
                      <div className='name-handle'>
                        <div className='user-list-name'>{user.name}</div>
                        <div  className='user-list-handle'>@{user.email?.split("@gmail.com")[0]}</div>
                      </div>
                      <Button className="follow-button" variant="contained" color="primary" onClick={onClickFollow}>
                          Follow
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
