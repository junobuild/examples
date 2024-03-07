import { createContext, useEffect, useState } from "react";
import { authSubscribe } from "@junobuild/core";
import { Login } from "./Login";
import { Logout } from "./Logout";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const Auth = ({ children }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const sub = authSubscribe((user) => setUser(user));

    return () => sub();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {user !== undefined && user !== null ? (
        <div>
          {children}

          <Logout />
        </div>
      ) : (
        <Login />
      )}
    </AuthContext.Provider>
  );
};

Auth.propTypes = {
  children: PropTypes.node.isRequired,
};
