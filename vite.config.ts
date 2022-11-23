import {defineConfig, loadEnv} from "vite";
import vue from "@vitejs/plugin-vue";
import {resolve} from "path";
import WindiCSS from "vite-plugin-windicss";
import eslintPlugin from "vite-plugin-eslint";
import vueJsx from "@vitejs/plugin-vue-jsx";
import {createSvgIconsPlugin} from "vite-plugin-svg-icons";
import viteCompression from "vite-plugin-compression";
import {visualizer} from "rollup-plugin-visualizer";
import {viteMockServe} from "vite-plugin-mock";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import {VantResolver} from "unplugin-vue-components/resolvers";

const configPlugins = (LOAD_ENV: any, command: string) => {
  const plugins = [
    // windicss
    WindiCSS(),
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
      resolvers: [VantResolver()],
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
    // base:
    // command === "serve" ? "./" : `${LOAD_ENV.VITE_BASE_PREFIX}/vite2-vue3.x-typescript-arco-framework/${NOW}/`,
    base: "./",
    // 使用插件
    plugins: [vue(), ...configPlugins(LOAD_ENV, command)],
    // 路径别名
    resolve: {
      extensions: [".vue", ".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".node", ".scss"],
      alias: {
        "@": resolve("./src"),
        "@views": resolve("./src/views"),
      },
    },
    // 扩展esbuild
    esbuild: {
      jsxFactory: "h",
      jsxFragment: "Fragment",
      jsxInject: "import { h } from 'vue';",
    },
    // 本地服务
    server: {
      host: "0.0.0.0",
    },
    // 打包编译
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: LOAD_ENV.VITE_ENV === "production",
          drop_debugger: LOAD_ENV.VITE_ENV === "production",
        },
      },
      rollupOptions: {
        output: {
          // eslint-disable-next-line consistent-return
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id.toString().split("node_modules/")[1].split("/")[0].toString();
            }
          },
        },
      },
    },
  });
};
