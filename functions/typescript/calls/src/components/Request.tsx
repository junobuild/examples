import { isEmptyString, isNullish } from "@dfinity/utils";
import { getDoc } from "@junobuild/core";
import { FC, useContext, useEffect, useRef, useState } from "react";
import { COLLECTION_REQUEST } from "../constants/app.constants.ts";
import { approveAndRequest } from "../services/request.services.ts";
import type { RequestData, RequestDoc } from "../types/request.ts";
import { AuthContext } from "./Auth.tsx";
import { Button } from "./Button.tsx";

type OptionKey = string | undefined | null;

export const Request: FC = () => {
  const { user } = useContext(AuthContext);

  const [request, setRequest] = useState<RequestDoc | undefined | null>(
    undefined,
  );
  const [requestKey, setRequestKey] = useState<OptionKey>(undefined);

  // Workaround for React: https://stackoverflow.com/a/77228056/5404186
  const requestKeyRef = useRef<OptionKey>(undefined);

  useEffect(() => {
    requestKeyRef.current = requestKey;
  }, [requestKey]);

  const loadRequest = async (key: OptionKey) => {
    if (isNullish(user)) {
      setRequest(null);
      return;
    }

    if (isEmptyString(key)) {
      setRequest(null);
      return;
    }

    const request = await getDoc<RequestData>({
      collection: COLLECTION_REQUEST,
      key,
    });

    setRequest(request);
  };

  useEffect(() => {
    loadRequest(requestKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestKey]);

  const submitRequest = async () => {
    const { requestKey: key } = await approveAndRequest();
    setRequestKey(key);

    // In the future we will provide a way to poll for updates. This is just for demo purposes.
    setTimeout(() => {
      loadRequest(requestKeyRef.current);
      reload();
    }, 2500);
  };

  const reload = () => {
    const $event = new Event("reload");
    window.dispatchEvent($event);
  };

  return (
    <>
      <div className="mt-8 w-full max-w-2xl dark:text-white">
        <p className="flex gap-1">
          <label htmlFor="call">Request:</label>
          <output id="call" className="font-bold">
            {request?.data.status ?? ""}
          </output>
        </p>

        <Button onClick={submitRequest}>Request</Button>
      </div>
    </>
  );
};
