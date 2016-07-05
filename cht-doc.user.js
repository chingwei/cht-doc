// ==UserScript==
// @name         CHT Document
// @namespace    cht
// @include      *
// @match        http://emsodas.cht.com.tw/Portal/Pages/WaitingDocument.aspx
// @match        http://emsodas.cht.com.tw/Portal/Forms/*
// @author       ChingWei
// @description  Auto read cht document
// @version      1.15
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {

    var path = location.pathname;
    // document list
    if(path.search(/WaitingDocument/) > 0) {
        var size=jQ(".DocSubject").size();
        if(size==1){
            alert("Done");
            return;
        } else {
            var aObject=jQ(".DocSubject:last > a");
            var link=aObject.attr('href');
            window.open(link,'_self');
        }
    } else {
        // view document
        var bObject=jQ(".RibbonBtn:first");
        //alert(aObject.text());
        //alert(aObject.attr('href'));
        bObject.trigger('click');
        parent.returnToMain();
    }
}

// load jQuery and execute the main function
addJQuery(main);
