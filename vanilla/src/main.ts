import { authSubscribe, initDapp, signIn, signOut, type User } from "@junobuild/core";
import "./style.css";
import {initDoc} from "./doc";
import {initStorage} from "./storage";

document.addEventListener("DOMContentLoaded", async () => await initDapp({
  satelliteId: "vugpq-vaaaa-aaaal-ab3ba-cai",
}), {once: true});

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
