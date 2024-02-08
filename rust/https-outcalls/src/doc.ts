import {
  getDoc,
  setDoc,
  type Doc,
} from "@junobuild/core";
import { nanoid } from "nanoid";

interface Dog {
  src?: string;
}

let dog: Doc<Dog> | undefined;

let key: string | undefined;

const set = async () => {
  key = nanoid();

  dog = await setDoc<Dog>({
    collection: "dogs",
    doc: {
      key,
      data: {},
    },
  });

  console.log("Set done", dog);
};

const get = async () => {
  if (key === undefined) {
    return;
  }

  dog = await getDoc({
    collection: "dogs",
    key,
  });

  console.log("Get done", dog);
};

export const initDoc = () => {
  document
    .querySelector("#set")
    ?.addEventListener("click", async () => await set(), { passive: true });
  document
    .querySelector("#get")
    ?.addEventListener("click", get, { passive: true });
};
