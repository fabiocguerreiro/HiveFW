import fs from 'fs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';

const dev = process.env.ROLLUP_WATCH === 'true';
const hiveVersion = fs
  .readFileSync('../VERSION', 'utf-8')
  .trim()
  .replace(/^v/i, '');

const outputPlugins = (bundleName) => [
  getBabelOutputPlugin({
    presets: [['@babel/preset-env', { bugfixes: true }]],
    allowAllFormats: true,
  }),
  ...(dev
    ? []
    : [
        terser({
          compress: {
            drop_console: false,
            passes: 2,
          },
          format: {
            comments: /^!/,
            preamble: `/*! ${bundleName} v${hiveVersion} */`,
          },
        }),
      ]),
];

const tsPlugin = () =>
  typescript({
    tsconfig: './tsconfig.json',
    declaration: false,
    sourceMap: dev,
    include: ['src/**/*.ts'],
    outDir: '../custom_components/hivefw_integration',
  });

const basePanel = {
  input: 'src/hivefw-integration-panel.ts',
  output: {
    file: '../custom_components/hivefw_integration/hivefw-integration-panel.js',
    format: 'es',
    sourcemap: dev,
    plugins: outputPlugins('hivefw-integration-panel'),
  },
  plugins: [resolve(), tsPlugin()],
};

const hivefwPanel = {
  input: 'src/hivefw-panel.ts',
  // The wrapper intentionally imports the separately-built base bundle at
  // runtime. Mark it external so Rollup does not duplicate that bundle.
  external: (id) => id === './hivefw-integration-panel.js',
  output: {
    file: '../custom_components/hivefw_integration/hivefw-panel.js',
    format: 'es',
    sourcemap: dev,
    plugins: outputPlugins('hivefw-panel'),
  },
  plugins: [resolve(), tsPlugin()],
};

export default [basePanel, hivefwPanel];
