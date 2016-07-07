// ==UserScript==
// @name         CHT Document
// @namespace    CHT
// @description  Auto read cht document
// @include      *
// @match        https://emsodas.cht.com.tw/Portal/Pages/WaitingDocument.aspx
// @match        https://emsodas.cht.com.tw/Portal/Forms/*
// @match        https://emsodas.cht.com.tw/Portal/Pages/InProcessDocument.aspx
// @author       ChingWei
// @version      1.20
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
    if (path.search(/WaitingDocument/) > 0) {
        // 待處理公文列表
        var size = jQ(".DocSubject").size();
        if (size == 1) {
            alert("公文-再見~");
            return;
        } else {
            var aObject = jQ(".DocSubject:last > a");
            var link = aObject.attr('href');
            window.open(link, '_self');
        }

    } else if (path.search(/InProcessDocument/) > 0) {
        // 有時會自已跑到已處理末結案公文頁面，所以要再重導到待處理公文頁
        window.location.href = "https://emsodas.cht.com.tw/Portal/Pages/WaitingDocument.aspx";
    } else {
        // 處理公文
        var bObject = jQ(".RibbonBtn:first");
        bObject.trigger('click');
        parent.returnToMain();
    }
}

// load jQuery and execute the main function
addJQuery(main);
