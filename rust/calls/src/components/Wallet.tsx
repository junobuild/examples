import { isNullish, nonNullish } from "@dfinity/utils";
import { FC, useContext, useEffect, useState } from "react";
import { getBalance } from "../services/wallet.services.ts";
import { formatE8sICP } from "../utils/icp.utils.ts";
import { AuthContext } from "./Auth.tsx";
import { Button } from "./Button.tsx";

export const Wallet: FC = () => {
  const { user } = useContext(AuthContext);

  const [balance, setBalance] = useState<bigint | undefined | null>(undefined);

  const loadBalance = async () => {
    if (isNullish(user)) {
      setBalance(null);
      return;
    }

    const balance = await getBalance({ user });

    setBalance(balance);
  };

  useEffect(() => {
    loadBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * A function to get some ICP from the ICP ledger that only works locally.
   * i.e. only works with the ledger deployed with the Juno Emulator.
   */
  const getICP = async () => {
    if (isNullish(user)) {
      return;
    }

    await fetch(`http://127.0.0.1:5999/ledger/transfer/?to=${user.key}`);

    setTimeout(loadBalance, 2500);
  };

  return (
    <>
      <div className="mt-8 w-full max-w-2xl dark:text-white">
        <p className="flex gap-1">
          <label htmlFor="balance">Balance:</label>
          <output id="balance" className="font-bold">
            {nonNullish(balance) ? `${formatE8sICP(balance)} ICP` : ""}
          </output>
        </p>

        <Button onClick={getICP}>Get ICP</Button>
      </div>
    </>
  );
};
