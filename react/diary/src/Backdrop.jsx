import PropTypes from "prop-types";

export const Backdrop = ({ spinner = false }) => (
  <div
    className={`fixed inset-0 z-40 ${spinner ? "backdrop-blur-sm" : "backdrop-blur-xl"} bg-white/30 flex items-center justify-center`}
  >
    {spinner && (
      <div
        className="w-12 h-12 rounded-full animate-spin
                    border-[3px] border-solid border-lavender-blue-600 border-t-transparent"
      ></div>
    )}
  </div>
);

Backdrop.propTypes = {
  spinner: PropTypes.bool,
};
