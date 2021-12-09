import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./LoginBtn.module.css";
import Profile from "../Authorization/Profile";

const LoginButton = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <div className={styles.authorization}>
      <Profile />
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect()} className={styles.loginBtn}>
          Log In
        </button>
      )}
      {isAuthenticated && (
        <button onClick={() => logout()} className={styles.loginBtn}>
          Log Out
        </button>
      )}
      ;
    </div>
  );
};

export default LoginButton;
