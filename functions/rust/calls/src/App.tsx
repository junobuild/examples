import { initSatellite } from "@junobuild/core";
import { FC, useEffect } from "react";
import { Auth } from "./components/Auth";
import { Background } from "./components/Background";
import { Banner } from "./components/Banner.tsx";
import { Footer } from "./components/Footer";
import { Request } from "./components/Request.tsx";
import { Wallet } from "./components/Wallet.tsx";

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
          <h1 className="text-5xl font-bold tracking-tight md:pt-24 md:text-6xl mb-4 dark:text-white">
            Example App
          </h1>

          <Auth>
            <Wallet />

            <Request />
          </Auth>
        </main>

        <Footer />

        <Background />
      </div>
    </>
  );
};

export default App;
