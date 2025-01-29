import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { VitePWA } from 'vite-plugin-pwa';
import { resolve } from 'path';

// Load environment variables
dotenv.config();

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: 'my-react-app',
        short_name: 'ReactApp',
        description: 'A sample PWA application built with React and Vite.',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 11 * 1024 * 1024, // 11 MiB (verify if you need to adjust this)
      },
    }),
  ],
  resolve: {
    alias: {
      // Resolve 'components' to 'src/components'
      assets: resolve(__dirname, 'src/assets'), // Resolves 'assets' to 'src/assets'
      styles: resolve(__dirname, 'src/styles'), // Resolves 'styles' to 'src/styles'
      lib: resolve(__dirname, 'src/lib'), // Resolves 'lib' to 'src/lib'
      store: resolve(__dirname, 'src/store'), // Resolves 'store' to 'src/store'
      data: resolve(__dirname, 'src/data'), // Resolves 'data' to 'src/data'
      components: resolve(__dirname, 'src/components'), // Resolves 'components' to 'src/components'
      configs: resolve(__dirname, 'src/configs'), // Resolves 'sections' to 'src/configs'
      sections: resolve(__dirname, 'src/sections'), // Resolves 'sections to 'src/sections'
      layouts: resolve(__dirname, 'src/layouts'), // Resolves 'layouts' to 'src/layouts'
    },
  },
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 3080, // Use PORT env variable or fallback to 3080
  },
  build: {
    outDir: 'dist', // Output directory for build
    sourcemap: false, // Disable sourcemaps in production
    minify: 'esbuild', // Use esbuild for minification (can change to 'terser' for more options)
    rollupOptions: {
      input: 'index.html', // Main entry point for your app
    },
  },
});
