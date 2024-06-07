import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    define: {
      "process.env.PYTHON_SERVICE_SERVICE_HOST": JSON.stringify(
        process.env.PYTHON_SERVICE_SERVICE_HOST
      ),
      "process.env.PYTHON_SERVICE_SERVICE_PORT": JSON.stringify(
        process.env.PYTHON_SERVICE_SERVICE_PORT
      ),
      "process.env.JS_SERVICE_SERVICE_HOST": JSON.stringify(
        process.env.JS_SERVICE_SERVICE_HOST
      ),
      "process.env.JS_SERVICE_SERVICE_PORT": JSON.stringify(
        process.env.JS_SERVICE_SERVICE_PORT
      ),
    },
  },
  dev: {
    hmr: false,
  },
});
