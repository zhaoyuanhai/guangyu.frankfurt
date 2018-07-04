$(function () {
    function getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }
    function setLanguage(language) {
        var lanText = "";
        language = parseInt(language);
        switch (language) {
            case 1:
                lanText = "英语";
                break;
            case 2:
                lanText = "德语";
                break;
            default: break;
        }
        $("#language").text(lanText);
    }
    ;
    var lan = getCookie("language");
    if (lan) {
        setLanguage(lan);
    }
    window.onLanguageChange = function (language) {
        $.getJSON('/setlanguage', { language: language, t: Math.random() }, function (result) {
            if (result.result == "ok") {
                location.reload();
            }
            else {
                alert('error');
                console.log('error');
            }
        });
    };
    $("[data-language]").click(function () {
        var language = $(this).data('language');
        if (typeof window.onLanguageChange == "function")
            window.onLanguageChange(language);
    });
});
//# sourceMappingURL=main.js.map 
//# sourceMappingURL=main.js.map