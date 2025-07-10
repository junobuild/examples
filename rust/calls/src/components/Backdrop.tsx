import { FC } from "react";

interface BackdropProps {
  spinner?: boolean;
}

export const Backdrop: FC<BackdropProps> = (props) => {
  const { spinner = false } = props;

  return (
    <div
      className={`fixed inset-0 z-40 ${spinner ? "backdrop-blur-xs" : "backdrop-blur-xl"} flex items-center justify-center bg-white/30`}
    >
      {spinner && (
        <div className="border-lavender-blue-600 h-12 w-12 animate-spin rounded-full border-[3px] border-solid border-t-transparent"></div>
      )}
    </div>
  );
};
