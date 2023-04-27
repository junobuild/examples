import { useContext } from "react";
import { AuthContext } from "./Auth";

export const Poll = () => {
  const { user } = useContext(AuthContext);

  const answers = [
    {
      value: "awesome",
      text: "Dude, it was so awesome 🔥"
    },
    {
      value: "yes",
      text: "Yes 😃"
    },
    {
      value: "no",
      text: "No, I'm grumpy 🥲"
    },
  ]

  return (
      <form className="flex flex-col gap-2 mt-10">
        {
          answers.map(({value, text}, id) => (
              <div className="flex items-center gap-2 border-2 border-solid rounded-md px-3" key={id}>
                <input
                    type="radio"
                    name="poll"
                    id={value}
                    className="w-8 h-8 accent-indigo-500 cursor-pointer"
                />
                <label htmlFor={value} className="ml-2 cursor-pointer w-full h-full text-left py-3">
                  {text}
                </label>
              </div>
          ))
        }

        <button
            type="button"
            className="rounded-md bg-black border-2 border-black hover:border-indigo-500 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-3"
        >
          Cast my vote
        </button>
      </form>
  );
};
