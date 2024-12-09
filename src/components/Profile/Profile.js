// ProfilePage.js
import React, { useEffect, useState } from 'react';
import './Profile.css';
import Post from '../Post/Post';
import CoverImage from '../../assets/images/cover-image.jpg';

const Profile = () => {
    const [userPosts, setUserPosts] = useState([]);
    const [userId, setUserId] = useState("1");
    const [name, setName] = useState("John Doe");
    const [email, setEmail] = useState("test@gmail.com");
    const [bio, setBio] = useState("Bio");

    useEffect(() => {
        if (localStorage.getItem("userId")) {

        }
        // Example API call using bounding box coordinates
        fetch("https://twitter-team-turning-testers-19648cf420b7.herokuapp.com/posts/users/" + userId + "/allPosts", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then((data) => {
                setUserPosts(data);
            })
            .catch((error) => console.error("Error calling API:", error));

        if (localStorage.getItem("name")) {
            setName(localStorage.getItem("name"));
        }
        if (localStorage.getItem("email")) {
            setEmail(localStorage.getItem("email"));
        }
        if (localStorage.getItem("bio")) {
            setBio(localStorage.getItem("bio"));
        }
    }, []);

    return (
        <div className="profile-container">
            {/* Cover Photo */}
            <div className="cover-photo">
                <img
                    src={CoverImage}
                    alt="Cover"
                    className="cover-image"
                />
            </div>

            {/* Profile Section */}
            <div className="profile">
                <div className="profile-details">
                    <h1 className="name">{name}</h1>
                    <p className="handle">{email}</p>
                    <p className="bio">
                        {bio}
                    </p>
                </div>
            </div>
            <div className="stats">
                <div className="stat">
                    <span className="count">150</span>
                    <span className="label">Following</span>
                </div>
                <div className="stat">
                    <span className="count">500</span>
                    <span className="label">Followers</span>
                </div>
            </div>

            {/* Recent Tweets Section */}
            <div className="tweets">
                <h2>Recent Tweets</h2>
                {userPosts.map((post) => (
                    <Post key={post.id} user={post.userId} text={post.content} />
                ))}
            </div>
        </div>
    );
};

export default Profile;
