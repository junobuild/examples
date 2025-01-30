import {
  authSubscribe,
  initSatellite,
  signIn,
  signOut,
  type User,
} from "@junobuild/core";
import "./style.css";
import { initDoc } from "./doc";

document.addEventListener(
  "DOMContentLoaded",
  async () =>
    await initSatellite({
      satelliteId: import.meta.env.VITE_SATELLITE_ID,
      container: import.meta.env.VITE_CONTAINER,
    }),
  { once: true },
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
