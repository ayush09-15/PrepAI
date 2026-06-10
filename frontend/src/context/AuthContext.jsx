import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );
  const [user, setUser] = useState(null);

  // Fetch user profile whenever token changes
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setUser(null);
        return;
      }
      try {
        const response = await axios.get(
          "http://localhost:8000/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data.user);
      } catch (error) {
        console.error(error);
        setUser(null);
      }
    };

    fetchUser();
  }, [token]);

  const login = (jwtToken) => {
    localStorage.setItem("token", jwtToken);
    setToken(jwtToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;