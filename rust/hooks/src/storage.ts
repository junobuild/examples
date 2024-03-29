import { uploadFile } from "@junobuild/core";

const collection = "images";

const upload = async () => {
  const input: HTMLInputElement | null = document.querySelector("#file");

  if (!input) {
    return;
  }

  const data = input.files?.[0];

  if (!data) {
    return;
  }

  const { downloadUrl } = await uploadFile({
    data,
    collection,
  });

  const div = document.querySelector("#result");

  if (!div) {
    return;
  }

  const img = document.createElement("img");
  img.src = downloadUrl;

  div.append(img);
};

export const initStorage = () => {
  document
    .querySelector("#upload")
    ?.addEventListener("click", upload, { passive: true });
};
