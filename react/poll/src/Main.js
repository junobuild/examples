import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./Auth";
import { getDoc } from "@junobuild/core";
import { POLL_COLLECTION } from "./constants";
import { Logout } from "./Logout";
import { Login } from "./Login";
import { Spinner } from "./Spinner";
import { Poll } from "./Poll";
import {Results} from "./Results";

export const Main = () => {
  const { user } = useContext(AuthContext);

  const [hasVoted, setHasVoted] = useState(undefined);

  const load = async () => {
    try {
      const myVote = await getDoc({
        collection: POLL_COLLECTION,
        key: user.key,
      });

      setHasVoted(myVote !== undefined);
    } catch (err) {
      setHasVoted(false);
    }
  };

  useEffect(() => {
    (async () => await load())();
  }, [user]);

  return hasVoted !== undefined ? (
    <>
      {user !== undefined && user !== null ? (
        <>
          {hasVoted === true ? <Results /> : <Poll />}

          <Logout />
        </>
      ) : (
        <Login />
      )}
    </>
  ) : (
    <Spinner />
  );
};
