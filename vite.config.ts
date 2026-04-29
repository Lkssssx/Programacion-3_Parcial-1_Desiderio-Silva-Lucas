import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    sourcemap: false, // Desactiva los source maps en build para evitar errores
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        
        storeHome: resolve(__dirname, 'src/pages/store/home/home.html'),
        storeCart: resolve(__dirname, 'src/pages/store/cart/cart.html'),
      },
    },
  },
  css: {
    devSourcemap: false  // Desactiva los source maps de CSS en dev para evitar errores
  },
  base: "./"
});