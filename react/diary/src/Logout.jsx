import { signOut } from "@junobuild/core";

export const Logout = () => {
  return (
      <button
          type="button"
          onClick={signOut}
          className="flex items-center gap-2 mt-24 hover:text-lavender-blue-500 active:text-lavender-blue-400"
      >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            viewBox="0 -960 960 960"
            width="16"
            fill="currentColor"
        >
          <path
              d="M120-120v-720h360v80H200v560h280v80H120Zm520-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/>
        </svg>
        <span><smalL>Logout</smalL></span>
      </button>
  );
};
