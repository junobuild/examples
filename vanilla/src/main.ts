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
import { initAnalytics, trackEvent } from "@junobuild/analytics";

document.addEventListener(
  "DOMContentLoaded",
  async () => {
    await Promise.all([
      initJuno({
        satelliteId: "htxyu-tmaaa-aaaaa-qaauq-cai",
        localIdentityCanisterId: "rrkah-fqaaa-aaaaa-aaaaq-cai",
        workers: {
          auth: true,
        },
      }),
      initAnalytics({
        satelliteId: "e7aid-ymaaa-aaaaa-qaa6q-cai",
        orbiterId: "eybox-vuaaa-aaaaa-qaa6a-cai",
        pageViewProxyUrl:
          "http://127.0.0.1:5001/juno-proxy-api/us-central1/pageView",
        trackEventProxyUrl:
          "http://127.0.0.1:5001/juno-proxy-api/us-central1/trackEvent",
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
      name: "My event",
      metadata: {
        hello: "world",
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
