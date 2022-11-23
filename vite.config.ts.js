// vite.config.ts
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import WindiCSS from "vite-plugin-windicss";
import eslintPlugin from "vite-plugin-eslint";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import viteCompression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";
import { viteMockServe } from "vite-plugin-mock";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
var configPlugins = (LOAD_ENV, command) => {
  const plugins = [
    WindiCSS(),
    eslintPlugin({
      include: ["src/**/*.js", "src/**/*.vue", "src/**/*.ts"],
      exclude: ["./node_modules/**"],
      cache: false
    }),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), "src/assets/svgs")],
      symbolId: "icon-[dir]-[name]"
    }),
    Components({
      resolvers: [VantResolver()],
      dts: "src/components.d.ts"
    }),
    AutoImport({
      imports: ["vue", "vue-router", "pinia"],
      dts: "src/auto-import.d.ts",
      eslintrc: {
        enabled: false,
        filepath: "./.eslintrc-auto-import.json",
        globalsPropValue: true
      }
    })
  ];
  if (command === "build") {
    plugins.push(visualizer({ gzipSize: true, brotliSize: true }));
    plugins.push(viteCompression());
  } else {
    plugins.push(viteMockServe({ mockPath: "/src/mock" }));
    plugins.push(vueJsx());
  }
  return plugins;
};
var vite_config_default = ({ mode, command }) => {
  const LOAD_ENV = loadEnv(mode, process.cwd());
  return defineConfig({
    base: "./",
    plugins: [vue(), ...configPlugins(LOAD_ENV, command)],
    resolve: {
      extensions: [".vue", ".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".node", ".scss"],
      alias: {
        "@": resolve("./src"),
        "@views": resolve("./src/views")
      }
    },
    esbuild: {
      jsxFactory: "h",
      jsxFragment: "Fragment",
      jsxInject: "import { h } from 'vue';"
    },
    server: {
      host: "0.0.0.0"
    },
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: LOAD_ENV.VITE_ENV === "production",
          drop_debugger: LOAD_ENV.VITE_ENV === "production"
        }
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id.toString().split("node_modules/")[1].split("/")[0].toString();
            }
          }
        }
      }
    }
  });
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7ZGVmaW5lQ29uZmlnLCBsb2FkRW52fSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XG5pbXBvcnQge3Jlc29sdmV9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgV2luZGlDU1MgZnJvbSBcInZpdGUtcGx1Z2luLXdpbmRpY3NzXCI7XG5pbXBvcnQgZXNsaW50UGx1Z2luIGZyb20gXCJ2aXRlLXBsdWdpbi1lc2xpbnRcIjtcbmltcG9ydCB2dWVKc3ggZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZS1qc3hcIjtcbmltcG9ydCB7Y3JlYXRlU3ZnSWNvbnNQbHVnaW59IGZyb20gXCJ2aXRlLXBsdWdpbi1zdmctaWNvbnNcIjtcbmltcG9ydCB2aXRlQ29tcHJlc3Npb24gZnJvbSBcInZpdGUtcGx1Z2luLWNvbXByZXNzaW9uXCI7XG5pbXBvcnQge3Zpc3VhbGl6ZXJ9IGZyb20gXCJyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXJcIjtcbmltcG9ydCB7dml0ZU1vY2tTZXJ2ZX0gZnJvbSBcInZpdGUtcGx1Z2luLW1vY2tcIjtcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gXCJ1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlXCI7XG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZVwiO1xuaW1wb3J0IHtWYW50UmVzb2x2ZXJ9IGZyb20gXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnNcIjtcblxuY29uc3QgY29uZmlnUGx1Z2lucyA9IChMT0FEX0VOVjogYW55LCBjb21tYW5kOiBzdHJpbmcpID0+IHtcbiAgY29uc3QgcGx1Z2lucyA9IFtcbiAgICAvLyB3aW5kaWNzc1xuICAgIFdpbmRpQ1NTKCksXG4gICAgLy8gZXNsaW50XG4gICAgZXNsaW50UGx1Z2luKHtcbiAgICAgIGluY2x1ZGU6IFtcInNyYy8qKi8qLmpzXCIsIFwic3JjLyoqLyoudnVlXCIsIFwic3JjLyoqLyoudHNcIl0sXG4gICAgICBleGNsdWRlOiBbXCIuL25vZGVfbW9kdWxlcy8qKlwiXSxcbiAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICB9KSxcbiAgICAvLyBzdmctaWNvblxuICAgIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcbiAgICAgIGljb25EaXJzOiBbcmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBcInNyYy9hc3NldHMvc3Znc1wiKV0sXG4gICAgICBzeW1ib2xJZDogXCJpY29uLVtkaXJdLVtuYW1lXVwiLFxuICAgIH0pLFxuICAgIC8vIGNvbXBvbmVudHNcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIHJlc29sdmVyczogW1ZhbnRSZXNvbHZlcigpXSxcbiAgICAgIGR0czogXCJzcmMvY29tcG9uZW50cy5kLnRzXCIsXG4gICAgfSksXG4gICAgLy8gYXV0by1pbXBvcnRcbiAgICBBdXRvSW1wb3J0KHtcbiAgICAgIGltcG9ydHM6IFtcInZ1ZVwiLCBcInZ1ZS1yb3V0ZXJcIiwgXCJwaW5pYVwiXSxcbiAgICAgIGR0czogXCJzcmMvYXV0by1pbXBvcnQuZC50c1wiLFxuICAgICAgZXNsaW50cmM6IHtcbiAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICAgIGZpbGVwYXRoOiBcIi4vLmVzbGludHJjLWF1dG8taW1wb3J0Lmpzb25cIixcbiAgICAgICAgZ2xvYmFsc1Byb3BWYWx1ZTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF07XG5cbiAgLy8gXHU3NTFGXHU0RUE3XHU3M0FGXHU1ODgzIC8gXHU1RjAwXHU1M0QxXHU3M0FGXHU1ODgzXG4gIGlmIChjb21tYW5kID09PSBcImJ1aWxkXCIpIHtcbiAgICAvLyB2aXN1YWxpemVyXG4gICAgcGx1Z2lucy5wdXNoKHZpc3VhbGl6ZXIoe2d6aXBTaXplOiB0cnVlLCBicm90bGlTaXplOiB0cnVlfSkpO1xuICAgIC8vIGNvbXByZXNzaW9uXG4gICAgcGx1Z2lucy5wdXNoKHZpdGVDb21wcmVzc2lvbigpKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBtb2NrXG4gICAgcGx1Z2lucy5wdXNoKHZpdGVNb2NrU2VydmUoe21vY2tQYXRoOiBcIi9zcmMvbW9ja1wifSkpO1xuICAgIC8vIEpTWFxuICAgIHBsdWdpbnMucHVzaCh2dWVKc3goKSk7XG4gIH1cbiAgcmV0dXJuIHBsdWdpbnM7XG59O1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgKHttb2RlLCBjb21tYW5kfSkgPT4ge1xuICBjb25zdCBMT0FEX0VOViA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSk7XG4gIHJldHVybiBkZWZpbmVDb25maWcoe1xuICAgIC8vIGJhc2U6XG4gICAgLy8gY29tbWFuZCA9PT0gXCJzZXJ2ZVwiID8gXCIuL1wiIDogYCR7TE9BRF9FTlYuVklURV9CQVNFX1BSRUZJWH0vdml0ZTItdnVlMy54LXR5cGVzY3JpcHQtYXJjby1mcmFtZXdvcmsvJHtOT1d9L2AsXG4gICAgYmFzZTogXCIuL1wiLFxuICAgIC8vIFx1NEY3Rlx1NzUyOFx1NjNEMlx1NEVGNlxuICAgIHBsdWdpbnM6IFt2dWUoKSwgLi4uY29uZmlnUGx1Z2lucyhMT0FEX0VOViwgY29tbWFuZCldLFxuICAgIC8vIFx1OERFRlx1NUY4NFx1NTIyQlx1NTQwRFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGV4dGVuc2lvbnM6IFtcIi52dWVcIiwgXCIubWpzXCIsIFwiLmpzXCIsIFwiLnRzXCIsIFwiLmpzeFwiLCBcIi50c3hcIiwgXCIuanNvblwiLCBcIi5ub2RlXCIsIFwiLnNjc3NcIl0sXG4gICAgICBhbGlhczoge1xuICAgICAgICBcIkBcIjogcmVzb2x2ZShcIi4vc3JjXCIpLFxuICAgICAgICBcIkB2aWV3c1wiOiByZXNvbHZlKFwiLi9zcmMvdmlld3NcIiksXG4gICAgICB9LFxuICAgIH0sXG4gICAgLy8gXHU2MjY5XHU1QzU1ZXNidWlsZFxuICAgIGVzYnVpbGQ6IHtcbiAgICAgIGpzeEZhY3Rvcnk6IFwiaFwiLFxuICAgICAganN4RnJhZ21lbnQ6IFwiRnJhZ21lbnRcIixcbiAgICAgIGpzeEluamVjdDogXCJpbXBvcnQgeyBoIH0gZnJvbSAndnVlJztcIixcbiAgICB9LFxuICAgIC8vIFx1NjcyQ1x1NTczMFx1NjcwRFx1NTJBMVxuICAgIHNlcnZlcjoge1xuICAgICAgaG9zdDogXCIwLjAuMC4wXCIsXG4gICAgfSxcbiAgICAvLyBcdTYyNTNcdTUzMDVcdTdGMTZcdThCRDFcbiAgICBidWlsZDoge1xuICAgICAgbWluaWZ5OiBcInRlcnNlclwiLFxuICAgICAgdGVyc2VyT3B0aW9uczoge1xuICAgICAgICBjb21wcmVzczoge1xuICAgICAgICAgIGRyb3BfY29uc29sZTogTE9BRF9FTlYuVklURV9FTlYgPT09IFwicHJvZHVjdGlvblwiLFxuICAgICAgICAgIGRyb3BfZGVidWdnZXI6IExPQURfRU5WLlZJVEVfRU5WID09PSBcInByb2R1Y3Rpb25cIixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICAgICAgICAgIG1hbnVhbENodW5rcyhpZCkge1xuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwibm9kZV9tb2R1bGVzXCIpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBpZC50b1N0cmluZygpLnNwbGl0KFwibm9kZV9tb2R1bGVzL1wiKVsxXS5zcGxpdChcIi9cIilbMF0udG9TdHJpbmcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9KTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFNLGdCQUFnQixDQUFDLFVBQWUsWUFBb0I7QUFDeEQsUUFBTSxVQUFVO0FBQUEsSUFFZCxTQUFTO0FBQUEsSUFFVCxhQUFhO0FBQUEsTUFDWCxTQUFTLENBQUMsZUFBZSxnQkFBZ0IsYUFBYTtBQUFBLE1BQ3RELFNBQVMsQ0FBQyxtQkFBbUI7QUFBQSxNQUM3QixPQUFPO0FBQUEsSUFDVCxDQUFDO0FBQUEsSUFFRCxxQkFBcUI7QUFBQSxNQUNuQixVQUFVLENBQUMsUUFBUSxRQUFRLElBQUksR0FBRyxpQkFBaUIsQ0FBQztBQUFBLE1BQ3BELFVBQVU7QUFBQSxJQUNaLENBQUM7QUFBQSxJQUVELFdBQVc7QUFBQSxNQUNULFdBQVcsQ0FBQyxhQUFhLENBQUM7QUFBQSxNQUMxQixLQUFLO0FBQUEsSUFDUCxDQUFDO0FBQUEsSUFFRCxXQUFXO0FBQUEsTUFDVCxTQUFTLENBQUMsT0FBTyxjQUFjLE9BQU87QUFBQSxNQUN0QyxLQUFLO0FBQUEsTUFDTCxVQUFVO0FBQUEsUUFDUixTQUFTO0FBQUEsUUFDVCxVQUFVO0FBQUEsUUFDVixrQkFBa0I7QUFBQSxNQUNwQjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFHQSxNQUFJLFlBQVksU0FBUztBQUV2QixZQUFRLEtBQUssV0FBVyxFQUFDLFVBQVUsTUFBTSxZQUFZLEtBQUksQ0FBQyxDQUFDO0FBRTNELFlBQVEsS0FBSyxnQkFBZ0IsQ0FBQztBQUFBLEVBQ2hDLE9BQU87QUFFTCxZQUFRLEtBQUssY0FBYyxFQUFDLFVBQVUsWUFBVyxDQUFDLENBQUM7QUFFbkQsWUFBUSxLQUFLLE9BQU8sQ0FBQztBQUFBLEVBQ3ZCO0FBQ0EsU0FBTztBQUNUO0FBR0EsSUFBTyxzQkFBUSxDQUFDLEVBQUMsTUFBTSxjQUFhO0FBQ2xDLFFBQU0sV0FBVyxRQUFRLE1BQU0sUUFBUSxJQUFJLENBQUM7QUFDNUMsU0FBTyxhQUFhO0FBQUEsSUFHbEIsTUFBTTtBQUFBLElBRU4sU0FBUyxDQUFDLElBQUksR0FBRyxHQUFHLGNBQWMsVUFBVSxPQUFPLENBQUM7QUFBQSxJQUVwRCxTQUFTO0FBQUEsTUFDUCxZQUFZLENBQUMsUUFBUSxRQUFRLE9BQU8sT0FBTyxRQUFRLFFBQVEsU0FBUyxTQUFTLE9BQU87QUFBQSxNQUNwRixPQUFPO0FBQUEsUUFDTCxLQUFLLFFBQVEsT0FBTztBQUFBLFFBQ3BCLFVBQVUsUUFBUSxhQUFhO0FBQUEsTUFDakM7QUFBQSxJQUNGO0FBQUEsSUFFQSxTQUFTO0FBQUEsTUFDUCxZQUFZO0FBQUEsTUFDWixhQUFhO0FBQUEsTUFDYixXQUFXO0FBQUEsSUFDYjtBQUFBLElBRUEsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLElBQ1I7QUFBQSxJQUVBLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxNQUNSLGVBQWU7QUFBQSxRQUNiLFVBQVU7QUFBQSxVQUNSLGNBQWMsU0FBUyxhQUFhO0FBQUEsVUFDcEMsZUFBZSxTQUFTLGFBQWE7QUFBQSxRQUN2QztBQUFBLE1BQ0Y7QUFBQSxNQUNBLGVBQWU7QUFBQSxRQUNiLFFBQVE7QUFBQSxVQUVOLGFBQWEsSUFBSTtBQUNmLGdCQUFJLEdBQUcsU0FBUyxjQUFjLEdBQUc7QUFDL0IscUJBQU8sR0FBRyxTQUFTLEVBQUUsTUFBTSxlQUFlLEVBQUUsR0FBRyxNQUFNLEdBQUcsRUFBRSxHQUFHLFNBQVM7QUFBQSxZQUN4RTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGLENBQUM7QUFDSDsiLAogICJuYW1lcyI6IFtdCn0K
