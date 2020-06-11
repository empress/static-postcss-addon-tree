'use strict';

const { join } = require('path');
const funnel = require('broccoli-funnel');
const CssImport = require('postcss-import');
const PresetEnv = require('postcss-preset-env');
const broccoliPostCSS = require('broccoli-postcss')
const mergeTrees = require('broccoli-merge-trees');

module.exports = function (tree, project, postCssPlugins = [
  PresetEnv({
    stage: 3,
    features: { 'nesting-rules': true },
    overrideBrowserslist: [
      'last 1 Chrome versions',
      'last 1 Firefox versions',
      'last 1 Safari versions',
      'ie 11',
    ],
  })
]) {
  const addonWithoutStyles = funnel(tree, {
    exclude: ['**/*.css'],
  });

  const addonStyles = funnel(tree, {
    include: [`**/${project.name()}.css`],
  });

  let processedStyles = broccoliPostCSS(addonStyles, {
    plugins: [
      CssImport({
        path: join(project.root, 'addon', 'styles'),
      }),
      ...postCssPlugins
    ]});

  return mergeTrees([addonWithoutStyles, processedStyles]);
}