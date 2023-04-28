import { NFIDProvider, signIn } from "@junobuild/core";
import { IconII } from "./IconII";
import { IconNFID } from "./IconNFID";
import { useContext } from "react";
import { AuthContext } from "./Auth";

export const Login = () => {
  const { setBusy } = useContext(AuthContext);

  const login = async (signIn) => {
    setBusy(true);

    try {
      await signIn();
    } catch (err) {
      console.error(err);
    }

    setBusy(false);
  };

  const signInII = async () => login(async () => signIn());

  const signInNFID = async () =>
    login(async () =>
      signIn({
        provider: new NFIDProvider({
          appName: "David presentation",
          logoUrl: "https://somewhere.com/your_logo.png",
        }),
      })
    );

  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-3 max-w-sm mx-auto">
      <button
        type="button"
        onClick={signInII}
        className="w-full rounded-md bg-black border-2 border-black hover:border-indigo-500 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <div className="flex items-center justify-center gap-1.5">
          <IconII />
          Vote with Internet Identity
        </div>
      </button>

      <button
        type="button"
        onClick={signInNFID}
        className="w-full rounded-md bg-white border-2 border-black hover:border-indigo-500 px-3.5 py-1.5 text-black hover:text-white font-semibold leading-7 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <div className="flex items-center justify-center gap-1.5">
          <IconNFID />
          Vote with NFID
        </div>
      </button>
    </div>
  );
};
