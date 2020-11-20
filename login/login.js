$("#goto-register").on("click", function () {
  $("#login").hide();
  $("#register").show();
});
$("#goto-login").on("click", function () {
  $("#login").show();
  $("#register").hide();
});
// -----------------------------------------------------------注册
$("#register .layui-form").on("submit", function (e) {
  // 1.阻止默认行为；
  e.preventDefault();

  // 2.收集数据
  var data = $(this).serialize();

  // 3.接口，发出请求
  // 发生数据
  $.ajax({
    type: "POST",
    url: "http://ajax.frontend.itheima.net/api/reguser",
    data: data,
    success: function (res) {
      // 弹窗：msg 简单弹窗、会自动消失；
      layer.msg(res.message);

      // 业务设计：
      if (res.status == 0) {
        $("#register").hide();
        $("#login").show();

        // 需求：原生方式；重置！
        //       注意慎重使用this;
        $("#register .layui-form")[0].reset();
      }
    }
  });
});
