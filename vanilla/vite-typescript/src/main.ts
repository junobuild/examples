import {
  authSubscribe,
  initSatellite,
  signIn,
  signOut,
  type User,
} from "@junobuild/core";
import "./style.css";
import { initDoc } from "./doc";
import { initStorage } from "./storage";
import { initAnalytics } from "./analytics";

document.addEventListener(
  "DOMContentLoaded",
  async () => {
    await Promise.all([
      initSatellite({
        satelliteId: "be2us-64aaa-aaaaa-qaabq-cai",
        container: true,
        workers: {
          auth: true,
        },
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
