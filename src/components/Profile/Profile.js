// ProfilePage.js
import React, { useEffect, useState } from 'react';
import './Profile.css';
import Post from '../Post/Post';
import CoverImage from '../../assets/images/cover-image.jpg';

const Profile = () => {
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        // Example API call using bounding box coordinates
        fetch("https://twitter-team-turning-testers-19648cf420b7.herokuapp.com/posts/users/1/allPosts", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            // body: JSON.stringify({
            //     northEastLat: northEast.lat,
            //     northEastLng: northEast.lng,
            //     southWestLat: southWest.lat,
            //     southWestLng: southWest.lng,
            // }),
        })
            .then((response) => response.json())
            .then((data) => {
                setUserPosts(data);
            })
            .catch((error) => console.error("Error calling API:", error));
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
                {/* <div className="profile-picture">
                    <img
                        src="https://via.placeholder.com/150"
                        alt="Profile"
                        className="profile-image"
                    />
                </div> */}

                <div className="profile-details">
                    <h1 className="name">John Doe</h1>
                    <p className="handle">@johndoe</p>
                    <p className="bio">
                        This is a bio section. Add a short description about the user here.
                    </p>
                    <p className="location">Location: San Francisco, CA</p>
                    <p className="website">
                        Website: <a href="https://johndoe.com">johndoe.com</a>
                    </p>
                </div>
            </div>

            {/* Followers and Following Section */}
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
