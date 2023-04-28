import { initJuno } from "@junobuild/core";
import { useEffect, useState } from "react";
import { Auth } from "./Auth";
import { Background } from "./Background";

function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      await initJuno({
        satelliteId: "y7m4b-fiaaa-aaaal-acgna-cai",
      });

      setReady(true);
    })();
  }, []);

  return (
    <>
      <div className="isolate bg-white">
        <main className="flex justify-center h-screen">
          <div className="relative px-6 pt-8 tall:pt-16 lg:px-8">
            <div className="mx-auto max-w-2xl py-16 relative z-10">
              <div className="text-center">
                {ready ? (
                  <>
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                      Did you like David's presentation?
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                      A live polling dapp build with{" "}
                      <a
                        href="https://juno.build"
                        rel="noopener noreferrer"
                        target="_blank"
                        className="underline"
                      >
                        Juno
                      </a>
                      .
                    </p>

                    <Auth />
                  </>
                ) : undefined}
              </div>
            </div>
            <Background />
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
