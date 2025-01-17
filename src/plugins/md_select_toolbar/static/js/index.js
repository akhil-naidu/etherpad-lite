'use strict';

const iT = {
  hide: () => {
    const padOuter = $('iframe[name="ace_outer"]').contents().find('body');
    const inlineToolbar = padOuter.find('#inline_toolbar');
    $(inlineToolbar).hide();
  },
  show: () => {
    const padOuter = $('iframe[name="ace_outer"]').contents().find('body');
    const inlineToolbar = padOuter.find('#inline_toolbar');
    $(inlineToolbar).show();
  },
};

exports.aceSelectionChanged = (hook, context) => {
  const selStart = context.rep.selStart;
  const selEnd = context.rep.selEnd;
  if ((selStart[0] !== selEnd[0]) || (selStart[1] !== selEnd[1])) {
    iT.show();
  } else {
    iT.hide(); // hide if nothing is selected
  }
};

exports.postAceInit = (hookName, context) => {
  const padOuter = $('iframe[name="ace_outer"]').contents().find('body');
  const padInner = padOuter.contents('iframe').contents().find('body');
  padOuter.on('mouseup', (e) => {
    iT.hide();
  });
  padInner.on('mouseup', (e) => {
    const toolbar = padOuter.find('#inline_toolbar');
    const left = e.pageX + padOuter.find('iframe').offset().left;
    toolbar.css({
      position: 'absolute',
      left,
      top: e.pageY,
    });
  });
};

// Creates the buttons based on settings and draws them hidden on the screen
exports.postToolbarInit = (hook, context) => {
  let buttonsToShow = [];
  if (clientVars.ep_select_toolbar && clientVars.ep_select_toolbar.length) {
    buttonsToShow = clientVars.ep_select_toolbar[0];
  } else {
    buttonsToShow = clientVars.ep_select_toolbar.left.flat();
  }
  $('#editbar .menu_select').children('[data-key]').each(function () {
    const key = $(this).data('key');
    if (buttonsToShow.indexOf(key) !== -1) {
      $('#inline_toolbar_menu_items').append(this);
    } else {
      $('#inline_toolbar_menu_items').append(this);
      $(this).css('display', 'none');
    }
  });
  const padOuter = $('iframe[name="ace_outer"]').contents().find('body');
  $('#inline_toolbar').css('background-color', '#1f2937');
  $('#inline_toolbar').css('opacity', '0.9');
  $('#inline_toolbar').css('color', '#f9fafb');
  $('#inline_toolbar').css('height', '40px');
  $('#inline_toolbar').css('border-radius', '8px');
  $('#inline_toolbar').detach().appendTo(padOuter[0]);
};
