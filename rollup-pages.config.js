import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";

const inputs = [
 //string defaults to input: src/[name].js and output: public/build/[name].js
  {
    input: "client/src/main/main.js",
    output: { file: "client/public/build/main.js", name: "main" },
    css: "client/public/build/main.css",
  },
  {
    input: "client/src/login/login.js",
    output: { file: "client/public/build/login.js", name: "login" },
    css: "client/public/build/login.css",
  },
  {
    input: "client/src/profile/profile.js",
    output: { file: "client/public/build/profile.js", name: "profile" },
    css: "client/public/build/profile.css",
  },
  {
    input: "client/src/play/play.js",
    output: { file: "client/public/build/play.js", name: "play" },
    css: "client/public/build/play.css",
  },
  {
    input: "client/src/room/room.js",
    output: { file: "client/public/build/room.js", name: "room" },
    css: "client/public/build/room.css",
  },
];
const production = !process.env.ROLLUP_WATCH;

//!!!
//To change rollup configuration go to createPageRollupExport (function)
//!!!

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require("child_process").spawn(
        "npm",
        ["run", "start", "--", "--dev"],
        {
          stdio: ["ignore", "inherit", "inherit"],
          shell: true,
        }
      );

      process.on("SIGTERM", toExit);
      process.on("exit", toExit);
    },
  };
}
function createPageRollupExport(inp) {
  //nearly default config as in https://github.com/sveltejs/template
  //TODO add possibilty for different option with different inputs and destinations.
  const t = typeof inp;
  const input =
    t === "string"
      ? createPageInputByString(inp)
      : createPageInputByObject(inp);
  const output =
    t === "string"
      ? createPageOutputByString(inp)
      : createPageOutputByObject(inp);
  const cssPath =
    t === "string" ? createPageCssByString(inp) : createPageCssByObject(inp);

  let def = {
    input: input,
    output: output,
    plugins: [
      svelte({
        // enable run-time checks when not in production
        dev: !production,
        // we'll extract any component CSS out into
        // a separate file - better for performance
        css: (css) => {
          css.write(cssPath);
        },
      }),

      // If you have external dependencies installed from
      // npm, you'll most likely need these plugins. In
      // some cases you'll need additional configuration -
      // consult the documentation for details:
      // https://github.com/rollup/plugins/tree/master/packages/commonjs
      resolve({
        browser: true,
        dedupe: ["svelte"],
      }),
      commonjs(),

      // In dev mode, call `npm run start` once
      // the bundle has been generated
      !production && serve(),

      // Watch the `public` directory and refresh the
      // browser on changes when not in production
      !production && livereload("client/public"),

      // If we're building for production (npm run build
      // instead of npm run dev), minify
      production && terser(),
    ],
    watch: {
      clearScreen: false,
    },
  };

  return def;
}

//#region utilities

function createPageInputByString(inp) {
  return `client/src/${inp}.js`;
}

function createPageInputByObject(inp) {
  return isStringNotNull(inp.input) ? inp.input : "client/src/main/main.js";
}

function createPageCssByString(inp) {
  return `client/public/build/${inp}.css`;
}

function createPageCssByObject(inp) {
  return isStringNotNull(inp.css) ? inp.css : "client/public/build/main.css";
}

function createPageOutputByString(inp) {
  return {
    sourcemap: false,
    format: "iife",
    name: `${inp}`,
    file: `client/public/build/${inp}.js`,
  };
}

function createPageOutputByObject(inp) {
  let def = {
    sourcemap: false,
    format: "iife",
    name: "main",
    file: `client/public/build/main.js`,
  };

  return Object.assign(def, inp.output);
}

function validateInputSettings(inp) {
  return (
    isStringNotNull(inp) ||
    (typeof inp === "object" && inp.input && inp.output && inp.css)
  );
}

function isStringNotNull(str) {
  return typeof str === "string" && str.length > 0;
}

//#endregion

export default (function () {
  let arrExportRollup = [];

  if (inputs instanceof Array) {
    inputs.forEach((i, index) => {
      if (validateInputSettings(i)) {
        arrExportRollup.push(createPageRollupExport(i));
      } else {
        console.warn(`skipping inputs${index} because of invalidity`);
      }
    });
  } else {
    throw new Error("inputs needs to be type of Array!");
  }
  return arrExportRollup;
})();
