// 需求：
//     1.配置根路径
//     2.设置请求头
//     3.complete：验证token在后台的有效性；

// 高效：希望记住！
// ajax提前过滤 提前拿到配置数据，
$.ajaxPrefilter(function (data) {
  // 1.到底是个啥？每次发生ajax请求之前，拿到ajax 传入的这些配置项！

  // 2.拿到配置对象，有啥用？
  //   对对象进行加工；
  //    2.1 配置根路径
  var base = "http://ajax.frontend.itheima.net";
  data.url = base + data.url;

  //  my路径开头才执行下面；
  if (data.url.indexOf("/my/") != -1) {
    // 2.2 请求头
    data.headers = {
      Authorization: localStorage.getItem("token")
    };

    // 2.3 验证token是否有效的回调
    data.complete = function (xhr) {
      // 后台接口设计：token过期无效，返回都是这些数据！
      // xhr 就是原生xhr  xhr.responseJSON解析后结果
      // console.log(xhr.responseJSON, xhr.responseText);
      if (xhr.responseJSON.status == 1 || xhr.responseJSON.message == "身份认证失败！") {
        localStorage.removeItem("token");
        location.href = "/login.html";
      }
    };
  }
});
