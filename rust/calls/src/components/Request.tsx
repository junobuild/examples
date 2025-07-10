import { isEmptyString, isNullish } from "@dfinity/utils";
import { getDoc } from "@junobuild/core";
import { FC, useContext, useEffect, useState } from "react";
import { COLLECTION_REQUEST } from "../constants/app.constants.ts";
import { approveAndRequest } from "../services/request.services.ts";
import type { RequestData, RequestDoc } from "../types/request.ts";
import { AuthContext } from "./Auth.tsx";
import { Button } from "./Button.tsx";

export const Request: FC = () => {
  const { user } = useContext(AuthContext);

  const [request, setRequest] = useState<RequestDoc | undefined | null>(
    undefined,
  );
  const [requestKey, setRequestKey] = useState<string | undefined | null>(
    undefined,
  );

  const loadRequest = async () => {
    if (isNullish(user)) {
      setRequest(null);
      return;
    }

    if (isEmptyString(requestKey)) {
      setRequest(null);
      return;
    }

    const request = await getDoc<RequestData>({
      collection: COLLECTION_REQUEST,
      key: requestKey,
    });

    setRequest(request);
  };

  useEffect(() => {
    loadRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestKey]);

  const submitRequest = async () => {
    const { requestKey: key } = await approveAndRequest();
    setRequestKey(key);
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
