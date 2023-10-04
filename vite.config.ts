import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@import "./src/stylesheets/index.scss";`,
  //     },
  //   },
  // },
  server: {
    port: 3030,
    proxy: {
      "/cluster/DB" : "http://localhost:4000",
      "/cluster": "http://localhost:4000",
      "/login": "http://localhost:4000",
      "/logout": "http://localhost:4000",
    }
  },
  optimizeDeps: {
    include: ['@emotion/styled']
  }
});
