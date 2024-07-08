import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    base: "/OlhoVigilantePP2",
    server: {
      host: true, //"127.0.0.1",
      port: 5173,
      proxy: {
        "/v1": "https://api.geoapify.com",
        //"/api": "https://olho-demo.onrender.com",
        "/api": {
          target: "https://olho-demo.onrender.com",
          changeOrigin: true,
          //secure: false,
        },
        /* "/api": {
          target: "https://api.geoapify.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        }, */
      },
    },
    preview: {
      host: true, //"127.0.0.1",
      port: 5173,
      proxy: {
        //"/v1": "https://api.geoapify.com",
        "/v1": {
          target: "https://api.geoapify.com",
          changeOrigin: true,
          //secure: false,
        },
        "/api": {
          target: "https://olho-demo.onrender.com",
          changeOrigin: true,
          //secure: false,
        },
        /* "/api": {
          target: "https://api.geoapify.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        }, */
      },
      //strictPort: true,
    },
    build: {
      //assetsDir: "assets",

    },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
  };
});
