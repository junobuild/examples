import { useContext, useEffect, useState } from "react";
import { setDoc, uploadFile } from "@junobuild/core-peer";
import { AuthContext } from "./Auth";
import { nanoid } from "nanoid";

export const Modal = () => {
  const [showModal, setShowModal] = useState(false);
  const [inputText, setInputText] = useState("");
  const [valid, setValid] = useState(false);
  const [progress, setProgress] = useState(false);
  const [file, setFile] = useState();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    setValid(inputText !== "" && user !== undefined && user !== null);
  }, [showModal, inputText, user]);

  const reload = () => {
    let event = new Event("reload");
    window.dispatchEvent(event);
  };

  const add = async () => {
    // Demo purpose therefore edge case not properly handled
    if ([null, undefined].includes(user)) {
      return;
    }

    setProgress(true);

    try {
      let url;

      if (file !== undefined) {
        const filename = `${user.key}-${file.name}`;

        const { downloadUrl } = await uploadFile({
          collection: "images",
          data: file,
          filename,
        });

        url = downloadUrl;
      }

      const key = nanoid();

      await setDoc({
        collection: "notes",
        doc: {
          key,
          data: {
            text: inputText,
            ...(url !== undefined && { url }),
          },
        },
      });

      setShowModal(false);

      reload();
    } catch (err) {
      console.error(err);
    }

    setProgress(false);
  };

  return (
    <>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add an entry
        </button>
      </div>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="relative p-6 flex-auto">
                  <textarea
                    className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-indigo-600 focus:outline-none
        resize-none
      "
                    rows="5"
                    placeholder="Your diary entry"
                    onChange={(e) => {
                      setInputText(e.target.value);
                    }}
                    value={inputText}
                    disabled={progress}
                  ></textarea>
                  <input
                    type="file"
                    className="my-4 text-slate-500 text-lg leading-relaxed"
                    onChange={(event) => setFile(event.target.files?.[0])}
                    disabled={progress}
                  />
                </div>

                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  {progress ? (
                    <div
                      className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-indigo-600 rounded-full"
                      role="status"
                      aria-label="loading"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <>
                      <button
                        className="background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>

                      <button
                        className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-25"
                        type="button"
                        onClick={add}
                        disabled={!valid}
                      >
                        Submit
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};
