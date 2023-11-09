import { useContext, useEffect, useState } from "react";
import { listDocs } from "@junobuild/core-peer";
import { AuthContext } from "./Auth";

export const Table = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    window.addEventListener("reload", list);

    return () => {
      window.removeEventListener("reload", list);
    };
  }, []);

  const list = async () => {
    const { items } = await listDocs({
      collection: "notes",
      filter: {},
    });

    setItems(items);
  };

  useEffect(() => {
    if ([undefined, null].includes(user)) {
      setItems([]);
      return;
    }

    (async () => await list())();
  }, [user]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200 mt-8">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">Entries</h2>
      </header>
      <div className="p-3">
        <div className="overflow-x-auto">
          {items.map(({ key, data: { text, url } }, index) => (
            <div key={key} className="flex items-center gap-6 px-2.5 py-1.5">
              <span className="px-4 py-2 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max">
                {index + 1}
              </span>
              <div className="line-clamp-3 text-left grow">{text}</div>
              <div>
                {url !== undefined ? (
                  <a
                    aria-label="Open data"
                    rel="noopener noreferrer"
                    href={url}
                    target="_blank"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                  </a>
                ) : undefined}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
