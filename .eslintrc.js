module.exports = {
  "env": {
    "es6": true,
    "node": true,
    "mocha": true,
  },
  "parser": "babel-eslint",
  "extends": [
    "airbnb-base",
    "prettier",
    "plugin:chai-expect/recommended",
    "plugin:mocha/recommended",
  ],
  "plugins": [
    "prettier",
    "mocha",
    "chai-friendly",
    "chai-expect",
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
    "mocha/no-mocha-arrows": 0,
    "import/prefer-default-export": 0,
    "func-names": 0,
    "consistent-return": 0,
    "chai-expect/no-inner-compare": 2,
    "chai-expect/no-inner-literal": 2,
    "chai-expect/missing-assertion": 2,
    "chai-expect/terminating-properties": 2,
    "no-unused-vars": [
      "error",
      {
        "varsIgnorePattern": "should|expect"
      }
    ]
  },
  "globals": {
    "process": true,
    "window": true
  }
};
