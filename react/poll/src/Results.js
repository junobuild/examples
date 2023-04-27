import { useEffect, useState } from "react";
import { listDocs } from "@junobuild/core";
import { POLL_COLLECTION } from "./constants";
import {Bar} from "./Bar";

export const Results = () => {
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
    }
  };

  useEffect(() => {
    (async () => await load())();
  }, []);

  const map = ({ category, setRatio }) => {
    const selection = votes.filter(({ data: { vote } }) => vote === category);
    setTimeout(() => setRatio(selection.length / total), 250);
  };

  useEffect(() => map({ category: "awesome", setRatio: setAwesome }), [votes]);
  useEffect(() => map({ category: "yes", setRatio: setYes }), [votes]);
  useEffect(() => map({ category: "no", setRatio: setNo }), [votes]);

  return (
    <div className="flex flex-col gap-2 mt-10">
      <Bar text="Awesome 🔥" value={awesome} color="bg-indigo-600" />
      <Bar text="Yes 😃" value={yes}  color="bg-indigo-300" />
      <Bar text="No 🥲" value={no}  color="bg-indigo-100" />
    </div>
  );
};
