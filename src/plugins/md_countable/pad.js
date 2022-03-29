var eejs = require('ep_etherpad-lite/node/eejs/');
exports.eejsBlock_editbarMenuRight = function (hook_name, args, cb) {
    args.content = eejs.require('ep_countable/templates/barButton.ejs') + args.content;
    return cb();
}
exports.eejsBlock_editorContainerBox = function (hook_name, args, cb) {
    args.content = args.content + eejs.require('ep_countable/templates/editorContainerBox.ejs');
    return cb();
}
