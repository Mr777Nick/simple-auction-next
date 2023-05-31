const path = require('path');

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

const buildPrettierCommand = (filenames) =>
  `prettier --write ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')}`;

module.exports = {
  '**/*.(ts|tsx)': () => 'yarn tsc --noEmit',
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
  './**/*.{js,jsx,ts,tsx,json,*rc}': [buildPrettierCommand],
  'package.json': ['npx -y sort-package-json'],
};
