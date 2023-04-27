import { Background } from "./Background";
import { Table } from "./Table";
import { Modal } from "./Modal";
import { initJuno } from "@junobuild/core";
import { Auth } from "./Auth";
import { useEffect } from "react";

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
        <main>
          <div className="relative px-6 lg:px-8">
            <div className="mx-auto max-w-2xl pt-16">
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Sample Juno App
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  A sample app build with React, Tailwind and{" "}
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
