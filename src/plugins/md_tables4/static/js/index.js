exports.eejsBlock_timesliderScripts = function (hook_name, args, cb) {
  args.content = args.content + require('ep_etherpad-lite/node/eejs/').require("ep_tables4/templates/datatablesScriptsTimeslider.ejs");
  return cb();
}
exports.eejsBlock_scripts = function (hook_name, args, cb) {
  args.content = args.content + require('ep_etherpad-lite/node/eejs/').require("ep_tables4/templates/datatablesScripts.ejs");
  return cb();
}
exports.eejsBlock_editbarMenuLeft = function (hook_name, args, cb) {
  args.content = args.content + require('ep_etherpad-lite/node/eejs/').require("ep_tables4/templates/datatablesEditbarButtons.ejs");
  return cb();
}
exports.eejsBlock_styles = function (hook_name, args, cb) {
  args.content = require('ep_etherpad-lite/node/eejs/').require("ep_tables4/templates/styles.ejs") + args.content;
  return cb();
}