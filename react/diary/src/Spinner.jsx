export const Spinner = () => (
  <div className="fixed inset-0 bg-black/80 z-20 flex items-center justify-center">
    <div
      className="w-12 h-12 rounded-full animate-spin
                    border-2 border-solid border-white border-t-transparent"
    ></div>
  </div>
);
