import { initSatellite, signIn, signOut, setDoc } from "@junobuild/core";

const init = async () => {
  await initSatellite();

  document.getElementById("signin")?.addEventListener("click", signIn);
  document.getElementById("signout")?.addEventListener("click", signOut);
  document.getElementById("save")?.addEventListener("click", saveNote);
};

const saveNote = async () => {
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const bodyEl = document.getElementById("body") as HTMLTextAreaElement;
  const resultEl = document.getElementById("result");

  const title = titleEl?.value || "Untitled";
  const body = bodyEl?.value || "";

  try {
    await setDoc({
      collection: "notes",
      doc: {
        key: crypto.randomUUID(),
        data: { title, body },
      },
    });

    if (resultEl) {
      resultEl.textContent = `✅ Note "${title}" saved. Check Juno Console → Functions → Logs.`;
    }
  } catch (e) {
    if (resultEl) {
      resultEl.textContent = `❌ Error: ${e}`;
    }
  }
};

document.addEventListener("DOMContentLoaded", init);
