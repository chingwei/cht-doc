function main() {
    var path = location.pathname;
    if (path.search(/WaitingDocument/) > 0) {
        // 待處理公文列表
        var size = $(".DocSubject").length;
        if (size == 1) {
            $(".EmptyItem").html("公文已處理，下次見");
            return;
        } else {
            var aObject = $(".DocSubject:last > a");
            var link = aObject.attr('href');
            window.open(link, '_self');
        }

    } else if (path.search(/InProcessDocument/) > 0) {
        // 有時會自已跑到已處理末結案公文頁面，所以要再重導到待處理公文頁
        window.location.href = "https://emsodas.cht.com.tw/Portal/Pages/WaitingDocument.aspx";
    } else {
        // 處理公文
        var bObject = $(".RibbonBtn:first");
        bObject.trigger('click');
        window.location.href = "https://emsodas.cht.com.tw/Portal/Pages/WaitingDocument.aspx";
    }
}
main();
