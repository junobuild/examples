import { useContext, useEffect, useState } from "react";
import { delDoc, listDocs } from "@junobuild/core";
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

  const delItem = async (doc) => {
    // TODO: implement a spinner to give user a visual feedback

    const {
      data: { url },
    } = doc;

    if (url !== undefined) {
      // TODO: delete asset here
      // 1. use listAssets to get the asset
      // 2. use deleteAsset
    }

    await delDoc({
      collection: "notes",
      doc,
    });

    // Reload
    await list();
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200 mt-8">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">Entries</h2>
      </header>
      <div className="p-3">
        <div className="overflow-x-auto">
          {items.map((item, index) => {
            const {
              key,
              data: { text, url },
            } = item;

            return (
              <div key={key} className="flex items-center gap-6 px-2.5 py-1.5">
                <span className="px-4 py-2 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max">
                  {index + 1}
                </span>
                <div className="line-clamp-3 text-left grow">{text}</div>
                <div className="flex gap-2 justify-center align-middle">
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

                  <button
                    className="text-sm rounded-md font-semibold leading-7 hover:bg-grey-500 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grey-600"
                    onClick={async () => await delItem(item)}
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
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
