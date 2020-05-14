module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest":true
    },
        "extends": [
            "airbnb-base",
            "prettier",
            'eslint-config-prettier'
        ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "linebreak-style": ["error", "windows"],
    }
};
