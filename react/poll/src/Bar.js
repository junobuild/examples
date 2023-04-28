export const Bar = ({ value, text, color }) => {
  return (
    <div className="relative h-10 w-full block">
      <div
        className={`transition-width ease w-1 ${color} text-white text-left h-10 rounded-md duration-300 absolute top-0 left-0`}
        style={value > 0 ? { width: `${value * 100}%` } : {}}
      ></div>
      <span
        className="transition-all ease duration-300 absolute py-2 px-5 top-0 left-0"
        style={value > 0 ? { opacity: `1`, color: "white" } : {}}
      >{`${text}${value >= 0 ? ` - ${Math.round(value * 100)}%` : ""}`}</span>
    </div>
  );
};
