import {defineConfig, loadEnv} from "vite";
import vue from "@vitejs/plugin-vue";
import {resolve} from "path";
import eslintPlugin from "vite-plugin-eslint";
import vueJsx from "@vitejs/plugin-vue-jsx";
import {createSvgIconsPlugin} from "vite-plugin-svg-icons";
import viteCompression from "vite-plugin-compression";
import {visualizer} from "rollup-plugin-visualizer";
import {viteMockServe} from "vite-plugin-mock";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";

const configPlugins = (LOAD_ENV: any, command: string) => {
  const plugins = [
    // eslint
    eslintPlugin({
      include: ["src/**/*.js", "src/**/*.vue", "src/**/*.ts"],
      exclude: ["./node_modules/**"],
      cache: false,
    }),
    // svg-icon
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), "src/assets/svgs")],
      symbolId: "icon-[dir]-[name]",
    }),
    // components
    Components({
      // resolvers: [],
      dts: "src/components.d.ts",
    }),
    // auto-import
    AutoImport({
      imports: ["vue", "vue-router", "pinia"],
      dts: "src/auto-import.d.ts",
      eslintrc: {
        enabled: false,
        filepath: "./.eslintrc-auto-import.json",
        globalsPropValue: true,
      },
    }),
  ];

  // 生产环境 / 开发环境
  if (command === "build") {
    // visualizer
    plugins.push(visualizer({gzipSize: true, brotliSize: true}));
    // compression
    plugins.push(viteCompression());
  } else {
    // mock
    plugins.push(viteMockServe({mockPath: "/src/mock"}));
    // JSX
    plugins.push(vueJsx());
  }
  return plugins;
};

// https://vitejs.dev/config/
export default ({mode, command}) => {
  const LOAD_ENV = loadEnv(mode, process.cwd());
  return defineConfig({
    base: command === "serve" ? "./" : "./",
    plugins: [vue(), ...configPlugins(LOAD_ENV, command)],
    resolve: {
      extensions: [".vue", ".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".node", ".scss"],
      alias: {
        "@": resolve("./src"),
        "@views": resolve("./src/views"),
      },
    },
  });
};
