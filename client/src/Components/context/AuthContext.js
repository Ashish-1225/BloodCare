import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [user, setUser] = useState([]);

  async function getLoggedIn() {
    try {
      const loggedInRes = await axios.get("http://localhost:3178/auth/loggedIn", { withCredentials: true });
      setLoggedIn(loggedInRes.data.auth);
      setUser(loggedInRes.data.user);
    } catch (error) {
      console.error("Error checking login status:", error);
      setLoggedIn(false);
      setUser(null);
    }
  }

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, user, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
