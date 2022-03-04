var eejs = require('ep_etherpad-lite/node/eejs/');
var settings = require('ep_etherpad-lite/node/utils/Settings');
var checked_state = '';
var disabled = '';

exports.eejsBlock_mySettings = function (hook_name, args, cb) {
  if (settings.ep_pagebreak_default) checked_state = 'checked';
  if (settings.ep_pagebreak_disable_change) disabled = 'disabled';
  args.content = args.content + eejs.require('ep_pagebreak/templates/page_break_entry.ejs', {checked : checked_state, disabled: disabled});
  return cb();
}



exports.eejsBlock_dd_insert = function (hook_name, args, cb){
  args.content = args.content + eejs.require('ep_pagebreak/templates/page_break_menu.ejs', {checked : checked_state});
  return cb();
}


