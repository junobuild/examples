import { authSubscribe } from "@junobuild/core";
import { createContext, useEffect, useState } from "react";
import { Main } from "./Main";
import { Spinner } from "./Spinner";

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
