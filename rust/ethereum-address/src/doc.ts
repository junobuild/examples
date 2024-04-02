import {
  getDoc,
  unsafeIdentity,
} from "@junobuild/core";

interface User {
  eth_address: string;
}

const get = async () => {
  const auth_user = await unsafeIdentity();

  if (auth_user === undefined || auth_user.getPrincipal().isAnonymous()) {
    console.error("User not signed-in.");
    return;
  }

  const key = auth_user.getPrincipal().toText();

  const user = await getDoc<User>({
    collection: "users",
    key,
  });

  console.log("Get done", user);

  if (user === undefined) {
    console.error("User does not exist yet.");
    return;
  }

  const output = document.querySelector("#result");

  if (!output) {
    return;
  }

  output.innerHTML = user.data.eth_address;
};

export const initDoc = () => {
  document
    .querySelector("#get")
    ?.addEventListener("click", get, { passive: true });
};
