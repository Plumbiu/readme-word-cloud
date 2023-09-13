import * as esbuild from 'esbuild'
await esbuild.build({
  entryPoints: ['src/index.js'],
  outdir: 'dist',
  minify: true,
  bundle: true,
  treeShaking: false,
  platform: 'node',
  loader: {
    ".node": "file",
  },
  format: 'esm',
  banner: {
    js: `import { createRequire as topLevelCreateRequire } from 'module';
    const require = topLevelCreateRequire(import.meta.url);`,
  },
})