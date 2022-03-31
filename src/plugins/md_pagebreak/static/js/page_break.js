var _, $, jQuery;
var $ = require('ep_etherpad-lite/static/js/rjquery').$;
var _ = require('ep_etherpad-lite/static/js/underscore');
var padcookie = require('ep_etherpad-lite/static/js/pad_cookie').padcookie;

let i=0;
let j=1;
let l=0;
let footer='';
let header='';
let footerPosition='left';
let headerPosition='left';
let headerImg='';
let footerImg= '';
let headerURL='';
let footerURL = '';
let pageBreakNumberArray = []
let testArray = [];
let a4Height = 920;
let test = 0;

exports.postAceInit = function(hook, context){
  var $outerIframeContents = $('iframe[name="ace_outer"]').contents();
  var $innerIframe = $outerIframeContents.find('iframe');
  var $innerdocbody = $innerIframe.contents().find("#innerdocbody");


  var buttonHTML =
    '<li class="separator"></li><li class="acl-write" id="footer"><a class="grouped-middle" data-l10n-id="pad.toolbar.footer.title" title="Enter Header & Footer"><button class="buttonicon buttonicon-pencil"></button></a></li>';
  $(buttonHTML).insertAfter($('.buttonicon-outdent').parent().parent());

  $('#footer').click(() => {
    $('#editorcontainerbox').find('#addHeaderFooter').toggleClass('popup-show');
  });

  const form = $('#editorcontainerbox').find('#addHeaderFooter form');

  $(form).find('#footer-left').click((e)=>{
    e.preventDefault()
    const fleft='left';
    footerPosition=fleft;
  })
  $(form).find('#footer-middle').click((e)=>{
    e.preventDefault()
    const fmiddle='center';
    footerPosition=fmiddle;
  })
  $(form).find('#footer-right').click((e)=>{
    e.preventDefault()
    const fright='end';
    footerPosition=fright;
  })
  $(form).find('#header-left').click((e)=>{
    e.preventDefault()
    const hleft='left';
    headerPosition=hleft;
  })
  $(form).find('#header-middle').click((e)=>{
    e.preventDefault()
    const hmiddle='center';
    headerPosition=hmiddle;
  })
  $(form).find('#header-right').click((e)=>{
    e.preventDefault()
    const hright='end';
    headerPosition=hright;
  })

  $(form).find('#header-img').click((e)=>{
    e.preventDefault();
    $(form).find('#upload_header').trigger("click");
    $(form).find('#upload_header').on("click",function(e) {        
      // var ext1 = $('#upload_header').val().split('.').pop().toLowerCase();
      // window.console.log(ext1);
      // if($.inArray(ext1, ['gif','png','jpg','jpeg']) == -1) {
      // $(".error_msg").text("Not an Image...");
      // } 
      const files1 = e.target.files;
      const type1 = files[0];
      const name1 = type.name.split('.').pop().toLowerCase();
      window.console.log('name image', name1)
      if((name1=='gif')||(name1=='png')||(name1=='jpg')||(name1=='jpeg')) {
        // $(".error_msg").text(""); 
        // URL address of uploaded file
        headerImg = URL.createObjectURL(e.target.files[0]); 
        window.console.log(headerImg);
        headerURL=headerImg;
        // setTimeout(function(){
        //   window.console.log('hello', headerURL)
        // },3500);
      }
      else{
        window.alert('please upload a valid file ( jpg , gif , png or jpeg)');
      }
    })    
  })
  $(form).find('#footer-img').click((e)=>{
    e.preventDefault();
    $(form).find('#upload_footer').trigger("click");
    $(form).find('#upload_footer').on("click", function(e) {        
      // var ext2 = $('#upload_footer').val().split('.').pop().toLowerCase();
      // window.console.log('this is footer',ext2);
      // if($.inArray(ext2, ['gif','png','jpg','jpeg']) == -1) {
      // $(".error_msg").text("Not an Image...");
      // window.alert('please upload a valid file ( jpg , gif , png or jpeg)')
      // } 
      const files = e.target.files;
      const type = files[0];
      const name = type.name.split('.').pop().toLowerCase();
      window.console.log('name image', name)
      if((name=='gif')||(name=='png')||(name=='jpg')||(name=='jpeg')) {
        // $(".error_msg").text(""); 
        // URL address of uploaded file
        footerImg = URL.createObjectURL(e.target.files[0]); 
        window.console.log(footerImg);
        footerURL=footerImg;
        // setTimeout(function(){
        //   window.console.log('hello', footerURL)
        // },3500);
      }
      else{
        window.alert('please upload a valid file ( jpg , gif , png or jpeg)');
    }
    })
  })

  $(form).find('#footer-submit').click((e) => {
    e.preventDefault();

    const footertext = $('#editorcontainerbox').find('#id-footer').val();
    const headertext = $('#editorcontainerbox').find('#id-header').val();

    footer = footertext;
    header = headertext;
    headerURL = headerImg;
    footerURL = footerImg;
    window.console.log(headerURL);

    $('#editorcontainerbox').find('#id-footer').val('');
    $('#editorcontainerbox').find('#id-header').val('');

    $('#editorcontainerbox').find('#addHeaderFooter').toggleClass('popup-show');
  });

  $(form)
    .find('#footer-close')
    .click((e) => {
      e.preventDefault();

      $('#editorcontainerbox').find('#id-footer').val('');
      $('#editorcontainerbox').find('#id-header').val('');

      $('#editorcontainerbox').find('#addHeaderFooter').toggleClass('popup-show');
    });

  var pb = {    
    pageBreaksEnable: function(){
      var inner = $('iframe[name="ace_outer"]').contents().find('iframe[name="ace_inner"]');
      inner.contents().find("head").append("<style>.pageBreak{display:block;}</style>");
      inner.contents().find("head").append("<style>.pageBreakComputed{display:block;}</style>");
    },
    // pageBreaksDisable: function(){
    //   var inner = $('iframe[name="ace_outer"]').contents().find('iframe[name="ace_inner"]');
    //   inner.contents().find("head").append("<style>.pageBreak{display:none;}</style>");
    //   inner.contents().find("head").append("<style>.pageBreakComputed{display:none;}</style>");
    // }
  }
  
  clientVars.plugins.plugins.ep_pagebreak.pageBreaksEnable = pb.pageBreaksEnable;
  // clientVars.plugins.plugins.ep_pagebreak.pageBreaksDisable = pb.pageBreaksDisable; 

  // page breaks
  if (padcookie.getPref("page_breaks")) {
    $('#options-pagebreaks').prop('checked', true);
    pb.pageBreaksEnable();
    // set a value we will refer to later and other plugins will refer to
    clientVars.plugins.plugins.ep_pagebreak.pageBreaksEnabled = true;
  }else{
    $('#options-pagebreaks').prop("checked", true);
  }
  if($('#options-pagebreaks').is(':checked')) {
    pb.pageBreaksEnable();
    // set a value we will refer to later and other plugins will refer to
    clientVars.plugins.plugins.ep_pagebreak.pageBreaksEnabled = true;
  } else {
    // pb.pageBreaksDisable();
    // set a value we will refer to later and other plugins will refer to
    clientVars.plugins.plugins.ep_pagebreak.pageBreaksEnabled = true;
  }

  /* on click */
  $('#options-pagebreaks').on('click', function() {
    if($('#options-pagebreaks').is(':checked')) {
      pb.pageBreaksEnable();
      padcookie.setPref("page_breaks", true);
    } else {
      // pb.pageBreaksDisable();
      padcookie.setPref("page_breaks", true);
    }
  });

  // Bind the event handler to the toolbar buttons
  $('#insertPageBreak').on('click', function(){
    context.ace.callWithAce(function(ace){
      ace.ace_doInsertPageBreak();
    },'insertPageBreak' , true);
  });

  if(!clientVars.plugins.plugins) clientVars.plugins.plugins = {};
};

exports.aceEditorCSS = function(hook_name, cb){
  return ["/ep_pagebreak/static/css/iframe.css"];
} // inner pad CSS

// Our PageBreak attribute will result in a PageBreak:1 class
exports.aceAttribsToClasses = function(hook, context){
  if(context.key == 'pageBreak'){
    return ['pageBreak:' + 1 ];
  }
}

// add the below line in the style class of prehtml, when a new page (while printing) has to trigger with page break
// page-break-after:always;page-break-inside:avoid;-webkit-region-break-inside: avoid;
// Add the Javascript to Ace inner head, this is for the onClick listener
exports.aceDomLineProcessLineAttributes = function(name, context){
  if( context.cls.indexOf("pageBreak") !== -1) { var type="pageBreak"; }
  var tagIndex = context.cls.indexOf(type);
  if (tagIndex !== undefined && type){
    // NOTE THE INLINE CSS IS REQUIRED FOR IT TO WORK WITH PRINTING!   Or is it?
//     .disable-select {
//     user-select: none; /* supported by Chrome and Opera */
//    -webkit-user-select: none; /* Safari */
//    -khtml-user-select: none; /* Konqueror HTML */
//    -moz-user-select: none; /* Firefox */
//    -ms-user-select: none; /* Internet Explorer/Edge */
// }
    var modifier = {
      preHtml: `<div class="pageBreak" contentEditable=false style="user-select: none; -webkit-user-select:none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none;"><div style="display:flex; position:relative; bottom:40px; align-items:end; width:96%; margin-left:4%; justify-content:${footerPosition};"><div style="position:fixed; left:15px;">${test} </div><div"><div>${footer} ${footerURL && `<img src="${footerURL}" style="height:40px; width:60px;" />` }</div></div></div></div><div contentEditable=false style="display:flex; position:relative; width:600%; margin-left:-250%; bottom:35px; justify-content:${headerPosition}"><div style="margin:0px 10px 0px 10px;">${header} ${headerURL && `<img src="${headerURL}" style="height:40px; width:60px;" />`}</div></div>`,
      postHtml: `</div>`,
      processedMarker: true
    };
    return [modifier]; // return the modifier
  }
  return []; // or return nothing
};

// Here we convert the class pageBreak into a tag
exports.aceCreateDomLine = function(name, context){
  var cls = context.cls;
  var domline = context.domline;
  var pageBreak = /(?:^| )pageBreak:([A-Za-z0-9]*)/.exec(cls);
  var tagIndex;
  if (pageBreak){
    var modifier = {
      extraOpenTags: '<div class=pageBreak contentEditable=false input>',
      extraCloseTags: '</div>',
      cls: cls
    };
    return [modifier];
  }
  return [];
};

function doRemovePageBreak(){
  // Backspace events means you might want to remove a line break, this stops the text ending up
  // on the same line as the page break..
  var rep = this.rep;
  var documentAttributeManager = this.documentAttributeManager;
  if (!(rep.selStart && rep.selEnd)){ return; } // only continue if we have some caret position
  var firstLine = rep.selStart[0]; // Get the first line
  var line = rep.lines.atIndex(firstLine);

  // If it's actually a page break..
  if(line.lineNode && (line.lineNode.firstChild && line.lineNode.firstChild.className === "pageBreak")){
    j=j-1;
    l=l-1;
    // l=$('iframe[name="ace_outer"]').contents().find('iframe').contents().find("#innerdocbody").children("div").find('.pageBreak').length;
    documentAttributeManager.removeAttributeOnLine(firstLine, 'pageBreak'); // remove the page break from the line
    // TODO: Control Z can make this kinda break

    // Get the document
    var document = this.editorInfo.ace_getDocument();
    // Update the selection from the rep
    this.editorInfo.ace_updateBrowserSelectionFromRep();
    // Get the current selection
    var myselection = document.getSelection();
    // Get the selections top offset
    var caretOffsetTop = myselection.focusNode.offsetTop;

    // Move to the new Y co-ord to bring the new page into focus
    $('iframe[name="ace_outer"]').contents().find('#outerdocbody').scrollTop(caretOffsetTop-120); // Works in Chrome
    $('iframe[name="ace_outer"]').contents().find('#outerdocbody').parent().scrollTop(caretOffsetTop-120); // Works in Firefox
    // Sighs
  }
}

function doInsertPageBreak(insertAtLineNumber){
  // this.editorInfo.ace_doReturnKey();
  // var rep = this.rep;
  // var documentAttributeManager = this.documentAttributeManager;
  // if (!(rep.selStart && rep.selEnd)){ return; } // only continue if we have some caret position
  // var firstLine = rep.selStart[0]; // Get the first line
  // var lastLine = Math.max(firstLine, rep.selEnd[0] - ((rep.selEnd[1] === 0) ? 1 : 0)); // Get the last line
  // _(_.range(firstLine, lastLine + 1)).each(function(i){ // For each line, either turn on or off page break
  //   var isPageBreak = documentAttributeManager.getAttributeOnLine(i, 'pageBreak');
  //   if(!isPageBreak){ // if its already a PageBreak item
  //     documentAttributeManager.setAttributeOnLine(i, 'pageBreak', 'pageBreak'); // make the line a page break
  //   }else{
  //     documentAttributeManager.removeAttributeOnLine(i, 'pageBreak'); // remove the page break from the line
  //   }
  // });
//  $('iframe[name="ace_outer"]').contents().find('iframe').contents().find("#innerdocbody").children("div").find('.pageBreak').remove();
 var rep = this.rep;
 var documentAttributeManager = this.documentAttributeManager;
 test = 0;
 insertAtLineNumber.forEach((lineNumber) => {
  test = test + 1
 var isPageBreak = documentAttributeManager.getAttributeOnLine(lineNumber + 1, 'pageBreak');
 if(!isPageBreak){ // if its already a PageBreak item
 documentAttributeManager.setAttributeOnLine(lineNumber, 'pageBreak', 'pageBreak'); // make the line a page break
 }else{
 documentAttributeManager.removeAttributeOnLine(lineNumber, 'pageBreak'); // remove the page break from the line
 }
 })

  // Get caret focus
  this.editorInfo.ace_focus();
  // Insert a line
  // this.editorInfo.ace_doReturnKey();
  // Get the document
  var document = this.editorInfo.ace_getDocument();
  // Update the selection from the rep
  this.editorInfo.ace_updateBrowserSelectionFromRep();
  // Get the current selection
  var myselection = document.getSelection();
  // Get the selections top offset
  var caretOffsetTop = myselection.focusNode.offsetTop;

  // Move to the new Y co-ord to bring the new page into focus
  $('iframe[name="ace_outer"]').contents().find('#outerdocbody').scrollTop(caretOffsetTop-120); // Works in Chrome
  $('iframe[name="ace_outer"]').contents().find('#outerdocbody').parent().scrollTop(caretOffsetTop-120); // Works in Firefox
  // Sighs
}
// Once ace is initialized, we set ace_doInsertPageBreak and bind it to the context
exports.aceInitialized = function(hook, context){
  var editorInfo = context.editorInfo;
  editorInfo.ace_doInsertPageBreak = _(doInsertPageBreak).bind(context);
  editorInfo.ace_doRemovePageBreak = _(doRemovePageBreak).bind(context);
}
 

// Listen for Control Enter and if it is control enter then insert page break
// Also listen for Up key to see if we need to replace focus at position 0.
exports.aceKeyEvent = function(hook, callstack, editorInfo, rep, documentAttributeManager, evt){
  var evt = callstack.evt;
  var k = evt.keyCode;

  let h=0;
  // let c=0;
  let y=0;
  
  var HTMLLines = $('iframe[name="ace_outer"]').contents().find('iframe').contents().find("#innerdocbody").children("div");

  // Control Enter
  // Note: We use keydown here to stop enter -> paste quick events firing a new page
  if(evt.ctrlKey && k == 13 && evt.type == "keydown" ){
    callstack.editorInfo.ace_doInsertPageBreak();
    evt.preventDefault();
    return true;
  }

  if(evt.ctrlKey && k == 65){
    i=0;
    j=1;
    l=0;
    // l=$('iframe[name="ace_outer"]').contents().find('iframe').contents().find("#innerdocbody").children("div").find('.pageBreak').length;

    // console.log('after',l);
    return true;
  }

  if (l == 0) {
    i=0;
    j=1;
  }

if((evt.type == "keyup") && k != 8 ){
 pageBreakNumberArray = [];
 $(HTMLLines).each(function(index){ // For each line 
 l=$('iframe[name="ace_outer"]').contents().find('iframe').contents().find("#innerdocbody").children("div").find('.pageBreak').length;
 let height = $(this).height(); // the height of the line
 y=y+height;
 i=((a4Height*j)+(40*l));
//  i = 500*(l+1);
 if(y>i){
   pageBreakNumberArray.push(index)
  //  testArray.push(index)
 if(!testArray.includes(index)) {
  testArray.push(index)
 }
 j=j+1; 
//  callstack.editorInfo.ace_doInsertPageBreak([2, 4]);
//  callstack.editorInfo.ace_doInsertPageBreak();
 callstack.editorInfo.ace_doInsertPageBreak(pageBreakNumberArray);
 l = l + 1;
 }
 });
 console.log(testArray, pageBreakNumberArray, l) 
 
 }

 if((evt.type == "keyup") && k != 8 && (k == 13 || k == 118) ){
   $('iframe[name="ace_outer"]').contents().find('iframe').contents().find("#innerdocbody").children("div").find('.pageBreak').remove();
  callstack.editorInfo.ace_doInsertPageBreak(testArray);
}
  // Up arrow so we can handle up arrow at top of document regain focus to 0 offset
  if(k == 38){
    var selStart = callstack.rep.selStart;
    var selEnd = callstack.rep.selEnd;
    if(selStart[0] == 0 && selStart[1] == 0 && selEnd[0] == 0 && selEnd[1] == 0){
      // Move to the new Y co-ord to bring the new page into focus
      var $outerdocbody = $('iframe[name="ace_outer"]').contents().find('#outerdocbody');
      $outerdocbody.scrollTop(0); // Works in Chrome
      $outerdocbody.parent().scrollTop(0); // Works in Firefox
      // Sighs
    }
    return true;
  }

  // Backspace deletes full line above if it is a pagebreak
  if(k == 8 && evt.type == "keyup"){
    
    callstack.editorInfo.ace_doRemovePageBreak();
   
  }
  return false;
}



// exports.aceEditEvent = function(hook, callstack, editorInfo, rep, documentAttributeManager){
//   // This seems a little too often to run
//   // Some more times to drop
//   if(callstack.callstack.type == "handleClick" || callstack.callstack.type == "idleWorkTimer" || !callstack.callstack.docTextChanged){
//     // console.log("not doing anything so it's all good", callstack);
//   }else{
//     // console.log("aceEditEvent so redrawing", callstack);
//     // Redraw Page Breaks
//     reDrawPageBreaks();
//   }
// }

// reDrawPageBreaks = function(){
//   // console.log("redrawing");
//   var lines = {};
//   var yHeight = 922.5; // This is dirty and I feel bad for it..
//   var lineNumber = 0;
//   var pages = []; // Array of Y px of each page.

//   var HTMLLines = $('iframe[name="ace_outer"]').contents().find('iframe').contents().find("#innerdocbody").children("div");

//   // Remove all computed page breaks
//   $('iframe[name="ace_outer"]').contents().find('iframe').contents().find("#innerdocbody").children("div").find('.pageBreakComputed').remove();
//   $(HTMLLines).each(function(){ // For each line
//     var y = $(this).context?.offsetTop; // y is the offset of this line
//     var id = $(this)[0].id; // get the id of the link
//     var height = $(this).height(); // the height of the line
    
//     // How many PX since last break?
//     var lastLine = lineNumber-1;
//     // Note that this is written like this because I don't trust using y offsets..
//     if(!lines[lastLine]){ // if this is the first line..
//       var previousY = 0;
//       var pxSinceLastBreak = 0;
//     }else{ // we're not processing the first line
//       if(lines[lastLine].pxSinceLastBreak == 0){ // if it's the second line..
//         // if it's getting the px of the first line..
//         var previousY = lines[lastLine].height;
//       }else{
//         var previousY = lines[lastLine].pxSinceLastBreak;
//       }
//       var pxSinceLastBreak = previousY + height;
//     }

//     // Does it already have any children with teh class pageBreak?
//     var manualBreak = $(this).children().hasClass("pageBreak");

//     // If it's a manualBreak then reset pxSinceLastBreak to 0;
//     if(manualBreak){
//       pxSinceLastBreak = 0;
//       // console.log("MANUAL pxSinceLastBreak", pxSinceLastBreak, "height", height);
//       pages.push(pxSinceLastBreak + height);
//     }

//     // Should this be a line break?
//     var computedBreak = ((pxSinceLastBreak + height) >= yHeight);
//     if(computedBreak){
//       // is it already a page break?
//       var isAlreadyPageBreak = $(this).find(".pageBreakComputed").length != 0;
//       // If it's not already a page break append a page break
//       if(!isAlreadyPageBreak){
//         // console.log("Adding break as PX since last break is ", pxSinceLastBreak + height);
//         $(this).append("<div class='pageBreakComputed' contentEditable=false></div>");
//         // console.log("AUTOMATIC pxSinceLastBreak", pxSinceLastBreak, "height", height);
//         pages.push(pxSinceLastBreak + height);
//       }
//       pxSinceLastBreak = 0;
//     }
//     lines[lineNumber] = {
//       pxSinceLastBreak : pxSinceLastBreak,
//       manualBreak : manualBreak,
//       computedBreak : computedBreak,
//       id : id,
//       y : y,
//       height : height
//     }
//     lineNumber++;
//   });
// }