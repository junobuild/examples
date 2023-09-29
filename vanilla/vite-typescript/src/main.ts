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
import { initOrbiter } from "@junobuild/analytics";
import { initAnalytics } from "./analytics";

document.addEventListener(
  "DOMContentLoaded",
  async () => {
    await Promise.all([
      initJuno({
        satelliteId: "b77ix-eeaaa-aaaaa-qaada-cai",
        localIdentityCanisterId: "rrkah-fqaaa-aaaaa-aaaaq-cai",
        workers: {
          auth: true,
        },
      }),
      initOrbiter({
        satelliteId: "b77ix-eeaaa-aaaaa-qaada-cai",
        orbiterId: "asrmz-lmaaa-aaaaa-qaaeq-cai",
        env: "dev",
      }),
    ]);
  },
  { once: true }
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

initAnalytics();
initDoc();
initStorage();
