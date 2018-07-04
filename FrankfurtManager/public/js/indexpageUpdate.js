$(function () {
    $("#" + _id).click(function () {
        $.ajax({
            type: "GET",
            url: "/indexpage/update",
            data: { lujing: $("#file").val(), Id: _id },
            dataType: "json",
            //success: function (data)
            //{

            //}
        });
    });
});