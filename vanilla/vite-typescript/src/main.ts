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
import { initAnalytics } from "./analytics";

document.addEventListener(
  "DOMContentLoaded",
  async () => {
    await Promise.all([
      initJuno({
        satelliteId: "xo2hm-lqaaa-aaaal-ab3oa-cai",
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
