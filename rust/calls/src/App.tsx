import { initSatellite } from "@junobuild/core";
import { FC, useEffect } from "react";
import { Auth } from "./components/Auth";
import { Background } from "./components/Background";
import { Footer } from "./components/Footer";
import { Modal } from "./components/Modal";
import { Table } from "./components/Table";
import { Banner } from "./components/Banner.tsx";

const App: FC = () => {
  useEffect(() => {
    (async () =>
      await initSatellite({
        workers: {
          auth: true,
        },
      }))();
  }, []);

  return (
    <>
      <div className="relative isolate min-h-[100dvh]">
        <Banner />

        <main className="mx-auto max-w-(--breakpoint-2xl) px-8 py-16 md:px-24 [@media(min-height:800px)]:min-h-[calc(100dvh-128px)]">
          <h1 className="text-5xl font-bold tracking-tight md:pt-24 md:text-6xl dark:text-white">
            Example App
          </h1>
          <p className="py-4 md:max-w-lg dark:text-white">
            Explore this demo app built with React, Tailwind, and{" "}
            <a
              href="https://juno.build"
              rel="noopener noreferrer"
              target="_blank"
              className="underline"
            >
              Juno
            </a>
            , showcasing a practical application of these technologies.
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
};

export default App;
