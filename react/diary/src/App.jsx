import { Background } from "./Background";
import { Table } from "./Table";
import { Modal } from "./Modal";
import { initJuno } from "@junobuild/core";
import { Auth } from "./Auth";
import { useEffect } from "react";
import {Footer} from "./Footer";

function App() {
  useEffect(() => {
    (async () =>
      await initJuno({
        satelliteId: import.meta.env.VITE_SATELLITE_ID,
        container: import.meta.env.VITE_CONTAINER,
      }))();
  }, []);

  return (
    <>
      <div className="relative isolate bg-white h-[100dvh]">
        <main className="mx-auto max-w-screen-2xl py-16 px-8 md:px-24 tall:min-h-[calc(100dvh-128px)]">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight md:pt-24">Sample Juno App</h1>
          <p className="py-4">
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
        </main>

        <Footer />

        <Background />
      </div>
    </>
  );
}

export default App;
