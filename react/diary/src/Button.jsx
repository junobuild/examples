import PropTypes from "prop-types";

export const Button = ({ children, onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 border-black border-[3px] transition-all rounded-sm py-1 px-8 my-2 font-semibold text-white bg-lavender-blue-500 shadow-[5px_5px_0px_rgba(0,0,0,1)] ${disabled ? "opacity-25" : "hover:bg-lavender-blue-600 active:bg-lavender-blue-400 active:shadow-none active:translate-x-[5px] active:translate-y-[5px]"}`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
