module.exports = {
  locales: ['all'],
  output: 'public/locales/all/translation.json',
  input: ['app/**/*.{js,jsx,ts,tsx}'],
  defaultValue: (lng, ns, key) => key,
  keySeparator: false,
  namespaceSeparator: false,
};