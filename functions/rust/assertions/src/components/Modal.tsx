import { setDoc, uploadFile, User } from "@junobuild/core";
import { nanoid } from "nanoid";
import { FC, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "./Auth";
import { Backdrop } from "./Backdrop";
import { Button } from "./Button";

export const Modal: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [inputText, setInputText] = useState("");
  const [valid, setValid] = useState(false);
  const [progress, setProgress] = useState(false);
  const [file, setFile] = useState<File | undefined>(undefined);
  const uploadElement = useRef<HTMLInputElement>(null);

  const { user } = useContext<{ user: User | null }>(AuthContext);

  useEffect(() => {
    setValid(inputText !== "" && user !== undefined && user !== null);
  }, [showModal, inputText, user]);

  const reload = () => {
    const $event = new Event("reload");
    window.dispatchEvent($event);
  };

  const add = async () => {
    // Demo purpose therefore edge case not properly handled
    if (user === null) {
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

  const resetFileInput = () => {
    if (uploadElement.current !== null) {
      uploadElement.current.value = "";
    }

    setFile(undefined);
  };

  return (
    <>
      <Button
        onClick={() => {
          resetFileInput();
          setShowModal(true);
        }}
      >
        Add an entry{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20"
          viewBox="0 -960 960 960"
          width="20"
          fill="currentColor"
        >
          <path d="M417-417H166v-126h251v-251h126v251h251v126H543v251H417v-251Z" />
        </svg>
      </Button>

      {showModal ? (
        <>
          <div
            className="animate-fade fixed inset-0 z-50 p-16 md:px-24 md:py-44"
            role="dialog"
          >
            <div className="relative w-full max-w-xl">
              <textarea
                className="form-control m-0 block w-full resize-none rounded-sm border-[3px] border-black bg-white px-3 py-1.5 text-base font-normal shadow-[5px_5px_0px_rgba(0,0,0,1)] focus:outline-hidden"
                rows={7}
                placeholder="Your diary entry"
                onChange={(e) => {
                  setInputText(e.target.value);
                }}
                value={inputText}
                disabled={progress}
              ></textarea>

              <div role="toolbar" className="flex items-center justify-between">
                <div>
                  <button
                    aria-label="Attach a file to the entry"
                    onClick={() => uploadElement?.current?.click()}
                    className="hover:text-lavender-blue-600 active:text-lavender-blue-400 flex items-center gap-2"
                  >
                    <svg
                      width="20"
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
                    <span className="max-w-48 truncate">
                      <small>
                        {file !== undefined ? file.name : "Attach file"}
                      </small>
                    </span>
                  </button>

                  <input
                    ref={uploadElement}
                    type="file"
                    className="fixed right-0 -bottom-24 opacity-0"
                    onChange={(event) => setFile(event.target.files?.[0])}
                    disabled={progress}
                  />
                </div>

                {progress ? (
                  <div
                    className="my-8 inline-block h-6 w-6 animate-spin rounded-full border-[3px] border-current border-t-transparent text-indigo-600"
                    role="status"
                    aria-label="loading"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <div className="my-4 flex">
                    <button
                      className="hover:text-lavender-blue-600 active:text-lavender-blue-400 px-8 py-1"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>

                    <Button onClick={add} disabled={!valid}>
                      Submit
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Backdrop />
        </>
      ) : null}
    </>
  );
};
