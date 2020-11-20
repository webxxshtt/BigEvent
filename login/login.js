// 登录和注册切换
$(function () {
  // 切换登录和注册
  $("#goto-register").on("click", function () {
    $("#login").hide();
    $("#register").show();
  });
  $("#goto-login").on("click", function () {
    $("#register").hide();
    $("#login").show();
  });
});

// 验证规则
var form = layui.form;
form.verify({
  // 规则名：[正则、不符合正则提醒信息]
  changdu: [/^\S{6,12}$/, "不满足长度要求"],

  // 规则名：函数，必须 有return  不符合正则提醒信息
  same: function (val) {
    // 第一输入：直接获取；HTML结构上做一些简单类名补充，方便获取值
    // 再次输入：val
    // $(".pwd").val()  第一次输入的密码
    if ($(".pwd").val() != val) {
      return "两次输入的密码不一致";
    }
  }
});

// 注册功能
$(function () {
  // 给form表单注册submit提交事件
  $("#register .layui-form").on("submit", function (e) {
    // 1.阻止默认行为
    e.preventDefault();

    // 2.获取表单数据
    var data = $(this).serialize();

    // 3.发请求
    $.ajax({
      type: "post",
      url: "http://ajax.frontend.itheima.net/api/reguser",
      data: data,
      success: function (res) {
        // 弹窗。msg简单弹窗，会自动消失
        layer.msg(res.message);
        //   业务设计
        if (res.status === 0) {
          // 注册成功，显示登录盒子
          $("#register").hide();
          $("#login").show();
          // 重置
          //   清空注册的表单(reset是dom方法，所以把jQuery对象转成DOM对象)
          $("#register .layui-form")[0].reset();
        }
      }
    });
  });
});

// 登录功能
$(function () {
  //
  $("#login .layui-form").on("submit", function (e) {
    // 1.阻止默认行为
    e.preventDefault();

    // 2.获取表单数据
    var data = $(this).serialize();

    //
    $.ajax({
      type: "post",
      url: "http://ajax.frontend.itheima.net/api/login",
      data: data,
      success: function (res) {
        //
        // console.log(res);
        // 弹窗。msg简单弹窗，会自动消失
        layer.msg(res.message);
        if (res.status === 0) {
          // 把token保存到本地存储
          localStorage.setItem("token", res.token);
          // 跳转到index.html
          location.href = "/index.html";
        }
      }
    });
  });
});
