import { defineConfig } from 'vite';
import { resolve } from 'path';
var glob = require('glob');

function toObject(paths) {
  var ret = {
    'web/load_modules.js': 'web/index.html'
  };

  paths.forEach(function(path) {
      // you can define entry names mapped to [name] here
      ret[path] = path;
  });

  console.log(ret)

  return ret;
}

export default defineConfig({
  // optimizeDeps: {
  //   include: ['node_modules'],
  // },
  root: './web',
  build: {
    sourcemap: false,
    commonjsOptions: {
      include: [/node_modules/],
    },
    minifyInternalExports: true,
    terserOptions: {
      ecma: 2021,
      module: true,
    },
    rollupOptions: {
      input: toObject(glob.sync('./web/**/*.js')),
      output: {
        // Keep the original file names
        entryFileNames: '[name]',
        chunkFileNames: 'web/[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
    outDir: '../dist',
  },
});
