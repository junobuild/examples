import { useContext, useEffect, useState } from "react";
import { listDocs } from "@junobuild/core";
import { AuthContext } from "./Auth";
import { Delete } from "./Delete";

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
    <div className="w-full max-w-2xl mt-8" role="table">
      <div role="row">
        <span role="columnheader" aria-sort="none">
          Entries
        </span>
      </div>

      <div className="py-2" role="rowgroup">
        {items.map((item, index) => {
          const {
            key,
            data: { text, url },
          } = item;

          return (
            <div
              key={key}
              className="flex items-center gap-2 px-3 mb-4 border-black border-[3px] rounded-sm bg-white shadow-[5px_5px_0px_rgba(0,0,0,1)]"
              role="row"
            >
              <span
                  role="cell"
                aria-rowindex={index}
                className="p-1 flex align-center min-w-max"
              >
                {index + 1} )
              </span>
              <div role="cell" className="text-ellipsis overflow-hidden grow">{text}</div>
              <div role="cell" className="flex gap-2 justify-center align-middle">
                {url !== undefined ? (
                  <a
                    aria-label="Open data"
                    rel="noopener noreferrer"
                    href={url}
                    target="_blank"
                    className="hover:text-lavender-blue-500 active:text-lavender-blue-400"
                  >
                    <svg
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 29 29"
                      fill="currentColor"
                    >
                      <g>
                        <rect
                          fill="none"
                          className="opacity-25"
                          width="29"
                          height="29"
                        />
                        <path d="M8.36,26.92c-2,0-3.88-.78-5.29-2.19C.15,21.81.15,17.06,3.06,14.14L12.57,4.64c.39-.39,1.02-.39,1.41,0s.39,1.02,0,1.41L4.48,15.56c-2.14,2.14-2.14,5.62,0,7.76,1.04,1.04,2.41,1.61,3.88,1.61s2.84-.57,3.88-1.61l12.79-12.79c1.47-1.47,1.47-3.87,0-5.34-1.47-1.47-3.87-1.47-5.34,0l-12.45,12.45c-.73.73-.73,1.91,0,2.64.73.73,1.91.73,2.64,0l9.17-9.17c.39-.39,1.02-.39,1.41,0s.39,1.02,0,1.41l-9.17,9.17c-1.51,1.51-3.96,1.51-5.47,0-1.51-1.51-1.51-3.96,0-5.47L18.26,3.77c2.25-2.25,5.92-2.25,8.17,0s2.25,5.92,0,8.17l-12.79,12.79c-1.41,1.41-3.29,2.19-5.29,2.19Z" />
                      </g>
                    </svg>
                  </a>
                ) : undefined}

                <Delete item={item} reload={list} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
