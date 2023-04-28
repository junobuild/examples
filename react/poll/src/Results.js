import { listDocs } from "@junobuild/core";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./Auth";
import { Bar } from "./Bar";
import { POLL_COLLECTION } from "./constants";

export const Results = () => {
  const { user } = useContext(AuthContext);

  const [votes, setVotes] = useState([]);
  const [total, setTotal] = useState(0);

  const [awesome, setAwesome] = useState([]);
  const [yes, setYes] = useState([]);
  const [no, setNo] = useState([]);

  const load = async () => {
    try {
      const { items, length } = await listDocs({
        collection: POLL_COLLECTION,
        filter: {},
      });

      setVotes(items);
      setTotal(Number(length));
    } catch (err) {
      setVotes([]);
      console.error(err);
    }
  };

  useEffect(() => {
    if (user === undefined) {
      return;
    }

    // We do not catch the promise on purpose
    load();

    const id = setInterval(async () => load(), 5000);
    return () => clearInterval(id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const map = ({ category, setRatio }) => {
    const selection = votes.filter(({ data: { vote } }) => vote === category);
    setTimeout(() => setRatio(selection.length / total), 250);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => map({ category: "awesome", setRatio: setAwesome }), [votes]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => map({ category: "yes", setRatio: setYes }), [votes]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => map({ category: "no", setRatio: setNo }), [votes]);

  return (
    <div className="flex flex-col gap-2 mt-6">
      <Bar text="Awesome 🔥" value={awesome} color="bg-indigo-600" />
      <Bar text="Yes 😃" value={yes} color="bg-indigo-300" />
      <Bar text="No 🥲" value={no} color="bg-indigo-100" />
    </div>
  );
};
