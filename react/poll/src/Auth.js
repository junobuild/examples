import { authSubscribe } from "@junobuild/core";
import { createContext, useEffect, useState } from "react";
import { Login } from "./Login";
import { Logout } from "./Logout";
import { Spinner } from "./Spinner";

export const AuthContext = createContext();

export const Auth = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [busy, setBusy] = useState(undefined);

  useEffect(() => {
    const sub = authSubscribe((user) => setUser(user));

    return () => sub();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setBusy }}>
      {user !== undefined && user !== null ? (
        <div>
          {children}

          <Logout />
        </div>
      ) : (
        <Login />
      )}

      {busy ? <Spinner /> : undefined}
    </AuthContext.Provider>
  );
};
