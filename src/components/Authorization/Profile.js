import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./Profile.module.css";

const { userInfo, userAvatar, userName, userEmail, userWrapper } = styles;

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <div className={userInfo}>
        <img src={user.picture} alt={user.name} className={userAvatar} />
        <div className={userWrapper}>
          <h2 className={userName}>{user.name}</h2>
          <p className={userEmail}>{user.email}</p>
        </div>
      </div>
    )
  );
};

export default Profile;
