$(function () {
    function setLayout() {
        $(".f-right").width($(".container").width() - $(".f-left").width());
        $(".f-body").height($(".f-right").height() - $(".f-head").height());
        $(".f-content").width($(".f-body").width() - $(".f-image").width());
    }
    setLayout();
    $(window).resize(setLayout);
	$("#lan").click(function () {
		$.getJSON('/setlanguage', {
			language: $(this).data('language'),
			t: Math.random()
        }, function (result) {
            if (result.result == "ok") {
                //console.log(result.co);
                //location.reload();
                location.href = "/index?lan=" + $("#lan").data('language');
            }
        });
    });
    var cache = {};
    function set(result) {
        setLayout();
        $("#content").html(result.content);
        $("img").attr("alt", "");
        $("#imgPath").attr('src', result.imgPath);
        $(".f-content").scrollTop(0);
    }
    $(".types").click(function () {
        var id = $(this).data("id");
        $('a.types').removeClass('active');
        $(this).addClass('active');
        if (cache[id])
            return set(cache[id]);
        var index = layer.load(1, { shade: [0.1, '#fff'] });
        $.getJSON('/gettype', { id: id }, function (result) {
            cache[id] = result;
            set(result);
            layer.close(index);
        });
    });
    if ($('.types').get(0)) {
        $('.types').get(0).click();
    }
});
//# sourceMappingURL=main.js.map