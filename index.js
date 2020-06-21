'use strict';

const { join } = require('path');
const funnel = require('broccoli-funnel');
const CssImport = require('postcss-import');
const PresetEnv = require('postcss-preset-env');
const broccoliPostCSS = require('broccoli-postcss')
const mergeTrees = require('broccoli-merge-trees');
const get = require('lodash.get');

module.exports = function (tree, options) {
  if(!options.addonName) {
    throw new Error('addonName must be provided to static-postcss-addon-tree options')
  }

  if(!options.addonFolder) {
    throw new Error('addonFolder must be provided to static-postcss-addon-tree options')
  }

  if(!options.project) {
    throw new Error('project must be provided to static-postcss-addon-tree options')
  }

  let postCssPlugins = options.postCssPlugins;
  
  if(!postCssPlugins) {
    // I don't know exactly why targets is private so I am using `get()` to make
    // sure that it isn't missing
    let overrideBrowserslist = get(this, 'app.project._targets.browsers');
    
    postCssPlugins = [
      PresetEnv({
        stage: 3,
        features: { 'nesting-rules': true },
        overrideBrowserslist,
      })
    ]
  }

  const addonWithoutStyles = funnel(tree, {
    exclude: ['**/*.css'],
  });

  const addonStyles = funnel(tree, {
    include: [`**/${options.addonName}.css`],
  });

  let processedStyles = broccoliPostCSS(addonStyles, {
    plugins: [
      CssImport({
        path: join(options.addonFolder, 'addon', 'styles'),
      }),
      ...postCssPlugins
    ]});

  return mergeTrees([addonWithoutStyles, processedStyles]);
}