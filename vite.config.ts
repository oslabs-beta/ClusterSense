import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3030,
    proxy: {
      "/cluster": "http://localhost:4000/cluster",
      "/login": "http://localhost:4000",
      "/logout": "http://localhost:4000",
    }
  },
  optimizeDeps: {
    include: ['@emotion/styled']
  }
});
