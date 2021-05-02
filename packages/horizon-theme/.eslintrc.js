'use strict';

const {
  moduleBase,
  baseRulesAppliedLast,
} = require('@nullvoxpopuli/eslint-configs/configs/base');

const config = configs.node();

module.exports = {
  ...config,
  overrides: [
    ...config.overrides,
    {
      files: ['index.js'],
      ...moduleBase,
      rules: {
        ...moduleBase.rules,
        ...baseRulesAppliedLast,
      },
    }
  ]
};
