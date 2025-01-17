'use strict';

const eejs = require('ep_etherpad-lite/node/eejs/');
const settings = require('ep_etherpad-lite/node/utils/Settings');

exports.loadSettings = (hookName, context, cb) => {
  return cb();
};

exports.clientVars = (hookName, context, callback) => {
  const settingsObj = settings.toolbar.inline || settings.toolbar;
  callback({
    ep_select_toolbar: settingsObj,
  });
};

exports.eejsBlock_body = (hookName, args, cb) => {
  args.content += eejs.require('ep_select_toolbar/templates/menuButtons.ejs');
  return cb();
};

exports.eejsBlock_mySettings = (hookName, args, cb) => {
  args.content += eejs.require('ep_select_toolbar/templates/settings.ejs');
  return cb();
};

exports.eejsBlock_scripts = (hookName, args, cb) => {
  return cb();
};


// not used
exports.eejsBlock_styles = (hookName, args, cb) => {
  args.content += eejs.require('ep_select_toolbar/templates/styles.html', {}, module);
  return cb();
};
