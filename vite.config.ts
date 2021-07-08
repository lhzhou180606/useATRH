import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import typescript2 from 'rollup-plugin-typescript2';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    {
      ...typescript2({
        check: true,
        tsconfig: path.resolve(__dirname, `tsconfig.json`),
        tsconfigOverride: {
          compilerOptions: {
            sourceMap: false,
            declaration: true,
            declarationMap: false,
          },
          include: ['src/**/*'],
        },
      }),
      enforce: 'pre',
      apply: 'build',
    },
  ],
  build: {
    outDir: 'dist',
    minify: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'use-antd-resizable-header',
      fileName: 'index',
      formats: ['es', 'umd'],
    },
    terserOptions: {
      compress: {
        keep_infinity: true,
        // Used to delete console in production environment
        drop_console: true,
      },
    },
    cssCodeSplit: false,
    // watch: {},
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'react',
          'react-dom': 'react-dom',
        },
      },
    },
  },
});
