'use strict';
const staticPostcssAddonTree = require('static-postcss-addon-tree');

module.exports = {
  name: require('./package').name,

  treeForAddon() {
    var tree = this._super(...arguments);

    return staticPostcssAddonTree(tree, {
      addonName: 'three-seventeen',
      addonFolder: __dirname,
      project: this.app.project
    });
  }
};
