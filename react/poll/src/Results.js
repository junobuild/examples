import { useEffect, useState } from "react";
import { listDocs } from "@junobuild/core";
import { POLL_COLLECTION } from "./constants";

export const Results = () => {
  const [votes, setVotes] = useState([]);
  const [total, setTotal] = useState(0);

  const load = async () => {
    try {
      const { items, length } = await listDocs({
        collection: POLL_COLLECTION,
        filter: {},
      });

      setVotes(items);
      setTotal(length);
    } catch (err) {
      setVotes([]);
    }
  };

  useEffect(() => console.log(votes), [votes]);

  useEffect(() => {
    (async () => await load())();
  }, []);

  return <div></div>;
};
