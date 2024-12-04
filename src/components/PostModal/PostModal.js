import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import CreatePost from '../CreatePost/CreatePost';


const PostModal = ({ open, handleClose, handlePost }) => {

    const onPostClick = (content) => {
        // Handle post submission logic here (e.g., send content to API)
        handlePost();
        handleClose(); // Close the modal after posting
      };

  return (
    <div>

      <Dialog open={open} onClose={handleClose} className="modal-paper"
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "600px",
          },
        },
      }}>
        <DialogTitle>What's happening?</DialogTitle>
        <DialogContent>
          <CreatePost onPost={onPostClick} onCancel={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostModal;
