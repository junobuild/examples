import { deleteDoc, deleteAsset } from "@junobuild/core";
import { useState } from "react";
import PropTypes from "prop-types";
import { Backdrop } from "./Backdrop";

export const Delete = ({ item, reload }) => {
  const [inProgress, setInProgress] = useState(false);

  const delItem = async (doc) => {
    setInProgress(true);

    try {
      const {
        data: { url },
      } = doc;

      if (url !== undefined) {
        const { pathname: fullPath } = new URL(url);

        await deleteAsset({
          collection: "images",
          fullPath,
        });
      }

      await deleteDoc({
        collection: "notes",
        doc,
      });

      await reload();
    } catch (err) {
      console.error(err);
    }

    setInProgress(false);
  };

  return (
    <>
      <button
        role="cell"
        className="hover:text-lavender-blue-500 active:text-lavender-blue-400"
        onClick={async () => await delItem(item)}
      >
        <svg
          width="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 29 29"
          fill="currentColor"
        >
          <g>
            <rect fill="none" className="opacity-25" width="29" height="29" />
            <path
              fill="#fff"
              d="M14.5,6.26H5.19l1.26,17.82c.09,1.21,1.09,2.14,2.3,2.14h11.49c1.21,0,2.22-.94,2.3-2.14l1.26-17.82h-9.31Z"
            />
            <path d="M26.17,5.26h-6.88v-1.26c0-1.35-1.09-2.44-2.44-2.44h-4.7c-1.35,0-2.44,1.1-2.44,2.44v1.26H2.83c-.55,0-1,.45-1,1s.45,1,1,1h1.43l1.2,16.89c.12,1.72,1.57,3.07,3.3,3.07h11.49c1.73,0,3.18-1.35,3.3-3.07l1.2-16.89h1.43c.55,0,1-.45,1-1s-.45-1-1-1ZM11.71,4c0-.24.2-.44.44-.44h4.7c.24,0,.44.2.44.44v1.26h-5.58v-1.26ZM21.55,24.01c-.05.68-.62,1.21-1.3,1.21h-11.49c-.68,0-1.25-.53-1.3-1.21l-1.18-16.75h16.47l-1.18,16.75Z" />
            <path d="M11.29,8.71c-.55,0-1,.45-1,1v12.81c0,.55.45,1,1,1s1-.45,1-1v-12.81c0-.55-.45-1-1-1Z" />
            <path d="M17.71,8.71c-.55,0-1,.45-1,1v12.81c0,.55.45,1,1,1s1-.45,1-1v-12.81c0-.55-.45-1-1-1Z" />
          </g>
        </svg>
      </button>

      {inProgress && <Backdrop spinner={true} />}
    </>
  );
};

Delete.propTypes = {
  item: PropTypes.object.isRequired,
  reload: PropTypes.func.isRequired,
};
