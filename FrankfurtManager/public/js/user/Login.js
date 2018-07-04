$("#save").click(function () {
	var uid = $("#uid").val();
	var pwd = $("#pwd").val();
	if (uid == "" || pwd == "") {
		alert("用户名或者密码不能为空");
	}
	else
	{
		$.ajax({
			url: '/login.js',
			type: 'post',
			data: data,
			success: function (data, status) {
				if (status == 'success') {
					location.href = 'login';
				}
			},
			error: function (data, err) {
				location.href = 'register';
			}
		});
	}
	
});