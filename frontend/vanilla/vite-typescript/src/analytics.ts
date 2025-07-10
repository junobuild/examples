import { trackEvent } from "@junobuild/analytics";

export const initAnalytics = () => {
  document
    .querySelector("#push")
    ?.addEventListener(
      "click",
      () => history.pushState(null, "", "nested/index.html"),
      { passive: true }
    );

  document.querySelector("#track")?.addEventListener(
    "click",
    async () => {
      await trackEvent({
        name: "Yolo yolo 2",
        metadata: {
          hello: "world world",
          hello1: "world world",
          hello2: "world world",
          hello3: "world world",
          hello4: "world world",
          hello5: "world world",
          hello6: "world world",
          hello7: "world world",
          hello8: "world world",
          hello9: "world world",
        },
      });
    },
    { passive: true }
  );
};
