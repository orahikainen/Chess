import Profile from "./Index.svelte";

const app = new Profile({
  target: document.body,
  props: {
    name: "Profile",
  },
});

export default app;
