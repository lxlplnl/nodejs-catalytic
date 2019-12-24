module.exports = {
  "env": {
    "es6": true,
    "node": true,
  },
  "parser": "babel-eslint",
  "extends": [
    "airbnb-base",
    "prettier",
  ],
  "plugins": [
    "prettier",
  ],
  "rules": {
    "max-len": [
      "error",
      {
        "code": 100,
        "ignoreUrls": true
      }
    ],
    "no-process-env": "off",
    "import/named": "off",
    "prettier/prettier": [
      "error",
      {
        "singleQuote": true,
        "trailingComma": "all"
      }
    ],
    "global-require": 1,
    "no-underscore-dangle": 0,
  },
  "globals": {
    "process": true,
    "window": true
  }
};
