module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended', // if you're using React
    'plugin:prettier/recommended', // Add Prettier integration
  ],
  rules: {
    'prettier/prettier': 'error', // Enforce Prettier rules as ESLint errors
  },
};
