
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Button } from '@mui/material';
import { Avatar } from '@mui/material';
import "../UsersModal/UsersModal.css"


const UsersModal = ({ userData = [],  open, handleClose}) => { 



    // const onPostClick = (content) => {
    //     // Handle post submission logic here (e.g., send content to API)
    //     handlePost();
    //     handleClose(); // Close the modal after posting
    //   };


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
        <DialogTitle>Users                      
          <Avatar className="profile-picture" />
        </DialogTitle>
        <DialogContent>
            <div className='user-list-wrapper'>
            {userData.map((user) => (
                <div className='user-item'>
                     <Avatar src={user?.profilePicture} className="profile-picture" />
                    <div className='name-handle'>
                        <div>Name</div>
                        <div>Handle</div>
                    </div>
                    <Button className="post-button" variant="contained" color="primary" onClick={onClickFollow}>
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
