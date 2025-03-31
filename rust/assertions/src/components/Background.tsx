import { FC } from "react";

export const Background: FC = () => {
  return (
    <div className="tall:top-2/4 fixed top-[400px] right-0 -z-10 hidden aspect-square h-[100dvh] min-h-[800px] translate-x-2/4 -translate-y-2/4 sm:block lg:translate-x-1/3">
      <img
        src="./juno_illustration.svg"
        role="presentation"
        loading="lazy"
        alt="An astronaut floating in space around planet Juno orbited by satellites, stars in the background."
      />
    </div>
  );
};
