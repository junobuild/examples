import { getDoc, setDoc } from "@junobuild/core";
import { useContext, useState } from "react";
import { AuthContext } from "./Auth";
import { POLL_COLLECTION } from "./constants";

export const Poll = ({reload}) => {
  const {
    user: { key },
    setBusy,
  } = useContext(AuthContext);

  const answers = [
    {
      value: "awesome",
      text: "Dude, it was so awesome 🔥",
    },
    {
      value: "yes",
      text: "Yes 😃",
    },
    {
      value: "no",
      text: "No, I'm grumpy 🥲",
    },
  ];

  const [selection, setSelection] = useState(undefined);

  const onChange = (changeEvent) => {
    setSelection(changeEvent.target.value);
  };

  const onSubmit = async ($event) => {
    $event.preventDefault();

    setBusy(true);

    try {
      const myVote = await getDoc({
        collection: POLL_COLLECTION,
        key,
      });

      await setDoc({
        collection: POLL_COLLECTION,
        doc: {
          ...(myVote !== undefined && myVote),
          key,
          data: {
            vote: selection,
          },
        },
      });

      await reload();
    } catch (err) {
      console.error(err);
    }

    setBusy(false);
  };

  return (
    <form className="flex flex-col gap-2 mt-10" onSubmit={onSubmit}>
      {answers.map(({ value, text }, id) => (
        <div
          className="flex items-center border-2 border-solid bg-white/60 rounded-md px-3"
          key={id}
        >
          <input
            type="radio"
            name="poll"
            value={value}
            id={value}
            className="w-8 h-8 accent-indigo-500 cursor-pointer"
            onChange={onChange}
          />
          <label
            htmlFor={value}
            className="ml-2 cursor-pointer w-full h-full text-left py-3"
          >
            {text}
          </label>
        </div>
      ))}

      <button
        type="submit"
        disabled={selection === undefined}
        className="disabled:bg-slate-50 disabled:text-slate-200 disabled:border-slate-200 disabled:shadow-none rounded-md bg-black border-2 border-black hover:border-indigo-500 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-3"
      >
        Cast my vote
      </button>
    </form>
  );
};
