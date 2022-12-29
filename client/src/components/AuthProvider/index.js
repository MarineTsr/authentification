import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { AuthContext } from "context/AuthContext";
import { signIn, signOut } from "api";

function AuthProvider({ children }) {
  const currentUser = useLoaderData();
  const [user, setUser] = useState(currentUser);

  const login = async (user) => {
    const connectedUser = await signIn(user);
    setUser(connectedUser);
  };

  const logout = async () => {
    await signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
