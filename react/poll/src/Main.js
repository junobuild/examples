import { getDoc } from "@junobuild/core";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./Auth";
import { POLL_COLLECTION } from "./constants";
import { Login } from "./Login";
import { Logout } from "./Logout";
import { Poll } from "./Poll";
import { Results } from "./Results";
import { Spinner } from "./Spinner";

export const Main = () => {
  const { user } = useContext(AuthContext);

  const [hasVoted, setHasVoted] = useState(undefined);

  const load = async () => {
    if (user === undefined) {
      return;
    }

    if (user === null) {
      setHasVoted(undefined);
      return;
    }

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

  return (
    <>
      {hasVoted === false ? undefined : <Results />}

      {user !== null ? (
        <>
          {hasVoted !== undefined ? (
            <>
              {hasVoted === true ? (
                <p className="mt-5">You have already taken part in the poll.</p>
              ) : (
                <Poll />
              )}

              <Logout />
            </>
          ) : (
            <Spinner />
          )}
        </>
      ) : user !== undefined ? (
        <Login />
      ) : undefined}
    </>
  );
};
