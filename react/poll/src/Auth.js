import { authSubscribe } from "@junobuild/core";
import { createContext, useEffect, useState } from "react";
import { Login } from "./Login";
import { Logout } from "./Logout";
import { Spinner } from "./Spinner";
import { Main } from "./Main";

export const AuthContext = createContext();

export const Auth = () => {
  const [user, setUser] = useState(undefined);
  const [busy, setBusy] = useState(undefined);

  useEffect(() => {
    const sub = authSubscribe((user) => setUser(user));

    return () => sub();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setBusy }}>
      <Main />

      {busy ? <Spinner /> : undefined}
    </AuthContext.Provider>
  );
};
