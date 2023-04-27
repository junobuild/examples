import { initJuno } from "@junobuild/core";
import { useEffect } from "react";
import { Auth } from "./Auth";
import { Background } from "./Background";
import { Modal } from "./Modal";
import { Table } from "./Table";

function App() {
  useEffect(() => {
    (async () =>
      await initJuno({
        satelliteId: "y7m4b-fiaaa-aaaal-acgna-cai",
      }))();
  }, []);

  return (
    <>
      <div className="isolate bg-white">
        <main className="flex items-center justify-center h-screen">
          <div className="relative px-6 pb-20 lg:px-8">
            <div className="mx-auto max-w-2xl pt-16 relative z-10">
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Did you like David's presentation?
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  A live polling app build with{" "}
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

                <Auth>
                  <Table />

                  <Modal />
                </Auth>
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
