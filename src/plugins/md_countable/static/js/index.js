exports.handleMessage = (payload) => {
    if ($('#ep_countable-popup.popup-show').length !== 0) {
        updateCounter();
    }
}
exports.aceInitialized = (hookName, context, cb) => {
    window.countableEditorInfo = context.editorInfo;
    return cb();
}
