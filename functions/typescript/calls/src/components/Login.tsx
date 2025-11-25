import { signIn } from "@junobuild/core";
import { FC } from "react";
import { Button } from "./Button";

export const Login: FC = () => {
  const login = async () => {
    await signIn({ internet_identity: {} });
  };

  return <Button onClick={login}>Sign in</Button>;
};
