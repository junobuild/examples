import {
  authSubscribe,
  initJuno,
  signIn,
  signOut,
  type User,
} from "@junobuild/core";
import "./style.css";
import { initDoc } from "./doc";
import { initStorage } from "./storage";
import { initOrbiter, trackEvent } from "@junobuild/analytics";

document.addEventListener(
  "DOMContentLoaded",
  async () => {
    await Promise.all([
      initJuno({
        satelliteId: "hbrpn-74aaa-aaaaa-qaaxq-cai",
        localIdentityCanisterId: "rrkah-fqaaa-aaaaa-aaaaq-cai",
        workers: {
          auth: true,
        },
      }),
      initOrbiter({
        satelliteId: "hbrpn-74aaa-aaaaa-qaaxq-cai",
        orbiterId: "f3nhr-bmaaa-aaaaa-qaayq-cai",
        env: "dev",
      }),
    ]);
  },
  { once: true }
);

document
  .querySelector("#push")
  ?.addEventListener(
    "click",
    () => history.pushState(null, "", "nested/index.html"),
    { passive: true }
  );

document.querySelector("#track")?.addEventListener(
  "click",
  async () => {
    await trackEvent({
      name: "Yolo yolo 2",
      metadata: {
        hello: "world world",
        hello1: "world world",
        hello2: "world world",
        hello3: "world world",
        hello4: "world world",
        hello5: "world world",
        hello6: "world world",
        hello7: "world world",
        hello8: "world world",
        hello9: "world world",
      },
    });
  },
  { passive: true }
);

document
  .querySelector("#signin")
  ?.addEventListener("click", async () => await signIn(), { passive: true });

document
  .querySelector("#signout")
  ?.addEventListener("click", signOut, { passive: true });

authSubscribe((user: User | null) => {
  console.log("User", user);
});

initDoc();
initStorage();
