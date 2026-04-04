import {
  initSatellite,
  onAuthStateChange,
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

document.querySelector("#signin")?.addEventListener(
  "click",
  async () =>
    await signIn({
      dev: {},
    }),
  { passive: true },
);

document
  .querySelector("#signout")
  ?.addEventListener("click", async () => await signOut(), { passive: true });

onAuthStateChange((user: User | null) => {
  console.log("User", user);
});

initDoc();
