/* eslint-disable import/no-extraneous-dependencies */
import {defineConfig, loadEnv} from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import {resolve} from "path";
import eslintPlugin from "vite-plugin-eslint";
import {createSvgIconsPlugin} from "vite-plugin-svg-icons";
import PurgeIcons from "vite-plugin-purge-icons";
import {visualizer} from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";
import {viteMockServe} from "vite-plugin-mock";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import {ArcoResolver} from "unplugin-vue-components/resolvers";
import CosPlugin from "@syyfe/vite-plugin-cos";

/**
 * 配置插件
 */
const NOW = Date.now();
const configPlugins = (
    {VITE_ENV, VITE_BUILD_USE_VISUALIZER, VITE_BUILD_USE_COMPRESSION, VITE_USE_MOCK, VITE_UPLOAD_TECENT_COS}: any,
    command: string,
) => {
    const plugins = [
        // eslint
        eslintPlugin({
            include: ["src/**/*.js", "src/**/*.vue", "src/**/*.ts"],
            exclude: ["./node_modules/**"],
            cache: false,
        }),
        // arco-design
        Components({
            resolvers: [ArcoResolver()],
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
        // svg-icon
        createSvgIconsPlugin({
            iconDirs: [resolve(process.cwd(), "src/assets/svgs")],
            symbolId: "icon-[dir]-[name]",
        }),
        // Iconify
        PurgeIcons({}),
    ];

    if (command === "build") {
        /**
         * 生产环境
         */
        // visualizer
        VITE_BUILD_USE_VISUALIZER === "true" &&
            plugins.push(
                visualizer({
                    gzipSize: true,
                    brotliSize: true,
                }),
            );
        // compression
        VITE_BUILD_USE_COMPRESSION === "true" && plugins.push(viteCompression());
        // tencent cos
        VITE_UPLOAD_TECENT_COS === "true" &&
            plugins.push(
                CosPlugin({
                    SecretId: "",
                    SecretKey: "",
                    Bucket: "",
                    Region: "",
                    bucketName: VITE_ENV === "production" ? "dist" : "test",
                    remoteDir: `vite2-vue3.x-typescript-arco-framework/${NOW}`,
                    from: "dist",
                    excludesExtra: ["map"],
                }),
            );
    } else {
        /**
         * 开发环境
         */
        // mock
        VITE_USE_MOCK === "true" &&
            plugins.push(
                viteMockServe({
                    // 配置mock位置
                    mockPath: "/src/mock",
                }),
            );
        // JSX
        plugins.push(vueJsx());
    }
    return plugins;
};

// https://vitejs.dev/config/
export default ({mode, command}) => {
    const LOAD_ENV = loadEnv(mode, process.cwd());
    return defineConfig({
        // 打包编译基础路径前缀
        // base:
        //     command === "serve" ? "./" : `${LOAD_ENV.VITE_BASE_PREFIX}/vite2-vue3.x-typescript-arco-framework/${NOW}/`,
        base: "./",
        // 配置 css 预处理
        css: {
            preprocessorOptions: {
                less: {
                    modifyVars: {
                        "primary-6": "#1966FF",
                    },
                    javascriptEnabled: true,
                },
            },
            postcss: {
                plugins: [
                    {
                        postcssPlugin: "internal:charset-removal",
                        AtRule: {
                            charset: (atRule) => {
                                // 去除 charset 警告
                                if (atRule.name === "charset") {
                                    atRule.remove();
                                }
                            },
                        },
                    },
                ],
            },
        },
        resolve: {
            extensions: [".vue", ".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".node", ".scss"],
            alias: {
                "@": resolve("./src"),
                "@views": resolve("./src/views"),
            },
        },
        // 使用插件
        plugins: [vue(), ...configPlugins(LOAD_ENV, command)],
        // 扩展esbuild
        esbuild: {
            jsxFactory: "h",
            jsxFragment: "Fragment",
            jsxInject: "import { h } from 'vue';",
        },
        server: {
            // https: true,
            host: "0.0.0.0",
        },
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
