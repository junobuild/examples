export const Bar = ({ value, text, color }) => {
  return (
    <div className="relative w-full flex flex-col">
      <span
        className="transition-all ease duration-300 px-1 mt-3 mb-2 rounded-md w-fit"
        style={value > 0 ? { opacity: `1` } : {}}
      >
        {text}
      </span>
      <div className="flex items-center gap-2 h-4">
        <div
          className={`transition-width ease w-1 ${color} text-left h-3 rounded-md duration-300`}
          style={value > 0 ? { width: `${value * 100}%` } : {}}
        ></div>
        {value >= 0 ? (
          <small className="text-xs">{` ${Math.round(value * 100)}%`}</small>
        ) : undefined}
      </div>
    </div>
  );
};
