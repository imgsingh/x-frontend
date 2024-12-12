
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import CreatePost from '../CreatePost/CreatePost';


const PostModal = ({ open, handleClose, handlePost, content }) => {

    const onPostClick = (content) => {
        // Handle post submission logic here (e.g., send content to API)
        handlePost();
        handleClose(); // Close the modal after posting
      };

  return (
    <div>

      <Dialog open={true} onClose={handleClose} className="modal-paper"
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
        <DialogTitle>Users</DialogTitle>
        <DialogContent>
            Users content
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostModal;
