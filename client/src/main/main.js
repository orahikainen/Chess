import Second from "./Index.svelte";

const app = new Second({
  target: document.body,
  props: {
    name: "Second",
  },
});

export default app;
