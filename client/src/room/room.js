import Play from "./Index.svelte";

const app = new Play({
  target: document.body,
  props: {
    name: "Play",
  },
});

export default app;
