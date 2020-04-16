module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ["plugin:react/recommended", "eslint:recommended", "google"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    React: "writable"
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    "max-len": [1, { code: 200 }],
    "max-lines": [2, { max: 180, skipBlankLines: true, skipComments: true }],
    "no-invalid-this": [0],
    camelcase: [0],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": [1],
    "react/display-name": [0],
    "require-jsdoc": [
      "error",
      {
        require: {
          FunctionDeclaration: false,
          MethodDefinition: false,
          ClassDeclaration: false,
          ArrowFunctionExpression: false,
          FunctionExpression: false
        }
      }
    ],
    "no-console": 2,
    "no-alert": 2,
    "indent": [
        "error",
        2,
        {
          "ignoredNodes": [
            "TemplateLiteral"
          ]
        }
      ],
      "template-curly-spacing": [
        "off"
      ]
  },
  settings: {
    react: {
      version: require("./package.json").dependencies.react
    }
  }
};
