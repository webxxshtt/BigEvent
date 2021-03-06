// ----------------------------------------------------请求个人信息
get();
function get() {
  console.log(1);
  $.ajax({
    url: "/my/userinfo",
    // // 设置请求头：
    // headers: {
    //   //   Authorization授权书
    //   Authorization: localStorage.getItem("token")
    // },
    success: function (res) {
      console.log(res);
      if (res.status == 0) {
        // 名称：有昵称就昵称、不然就是用户名；
        var name = res.data.nickname || res.data.username;
        $(".username").text(name);

        // 测试代码：
        // res.data.user_pic = undefined;
        // name = "aaa";

        // 头像：如果有头像数据
        if (res.data.user_pic) {
          //
          $(".layui-nav-img").show().attr("src", res.data.user_pic);
          $(".avatar").hide();
        }
        // 测试：没有头像数据的时候
        else {
          // 截取name名字上第一个字符；
          var t = name.substr(0, 1);
          // 英文字符：小写变为大写：字符串.toUpperCase()
          t = t.toUpperCase();

          // show:会让元素变为行内元素；
          $(".avatar").show().css("display", "inline-block").text(t);
          $(".layui-nav-img").hide();
        }
      }
    }
  });
}

// -----------------------------------------------------退出
$("#logout").on("click", function () {
  layer.confirm("确定要退出吗？", { icon: 3, title: "提示" }, function (index) {
    //do something
    // 本地清除
    localStorage.removeItem("token");
    //退回到login页面
    location.href = "../login.html";
    // 关闭弹窗
    layer.close(index);
  });
});
