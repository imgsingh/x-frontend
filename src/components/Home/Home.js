import React, { useState } from 'react'
import './Home.css'
import { Button, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PostModal from '../PostModal/PostModal';
import CreatePost from '../CreatePost/CreatePost';
import Post from '../Post/Post'
import Profile from '../Profile/Profile';


function Home() {
    const [openModal, setOpenModal] = useState(false);
    const [selectedComponent, setSelectedComponent] = useState(null);


    const handleClick = (component) => {
        if (component == null) {
            setSelectedComponent(null);
        } else {
            setSelectedComponent(component);
        }
    };
    const postData = [
        {
            id: 1,
            user: {
                profilePicture: 'https://example.com/profile1.jpg',
                username: 'John Doe',
                handle: 'johndoe',
            },
            text: 'This is a sample tweet! #react #materialui',
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
            likes: 10,
            retweets: 3,
            replies: 10,
            time: '2m ago',
        },
        {
            id: 2,
            user: {
                profilePicture: 'https://example.com/profile2.jpg',
                username: 'Jane Smith',
                handle: 'janesmith',
            },
            text: 'Learning React and Material UI is fun! 😄 #learning #react',
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
            likes: 200,
            retweets: 50,
            replies: 20,
            time: '15m ago',
        },
    ];

    // Open the modal when the "Post" button is clicked
    const handleOpenModal = () => {
        setOpenModal(true);
    };

    // Close the modal
    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const postConent = () => {
        console.log('post logic here')
    }

    return (
        <div className='home-wrapper'>
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
                    <List>
                        {[
                            { text: 'Home', icon: <HomeIcon />, component: null },
                            { text: 'Notifications', icon: <NotificationsIcon /> },
                            { text: 'Profile', icon: <AccountCircleIcon />, component: <Profile /> },
                        ].map((item, index) => (
                            <ListItem button key={index} onClick={() => handleClick(item.component)}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
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
                && <><div className='home-content'>
                    <div className='create-post-wrapper'>
                        <CreatePost onPost={postConent} />
                    </div>
                    <div className='post-list-wrapper'>
                        {postData.map((post) => (
                            <Post
                                key={post.id}
                                user={post.user}
                                text={post.text}
                                content={post.content}
                                likes={post.likes}
                                retweets={post.retweets}
                                replies={post.replies}
                                time={post.time}
                            />
                        ))}
                    </div>
                </div>
                    <PostModal open={openModal} handleClose={handleCloseModal} handlePost={postConent} />
                </>}
            <div style={{ paddingLeft: '130px' }}>
                {selectedComponent}
            </div>
        </div>
    )

}
export default Home