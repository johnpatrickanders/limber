'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = async function (defaults) {
  let environment = EmberApp.env();
  let isProduction = environment === 'production';

  const app = new EmberApp(defaults, {
    // Add options here
    'ember-cli-babel': {
      enableTypeScriptTransform: true,
    },
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  const { createManifest } = await import('kolay/build');

  const { Webpack } = require('@embroider/webpack');

  return require('@embroider/compat').compatBuild(app, Webpack, {
    extraPublicTrees: [
      // Tailwind
      require('@nullvoxpopuli/limber-styles/broccoli-funnel')(),
    ],
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
    packagerOptions: {
      webpackConfig: {
        plugins: [
          createManifest.webpack({
            src: 'public/docs',
            dest: 'docs',
            /**
             * Pending: https://github.com/emberjs/ember.js/issues/20419
             */
            exclude: isProduction ? [/^x-/, 'keyed-each-blocks'] : [],
            /**
             * This project has convention a based manifest so we only need directories
             */
            onlyDirectories: true,
          }),
        ],
      },
    },
  });
};
