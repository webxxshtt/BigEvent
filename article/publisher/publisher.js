// --------------------------------------------------加载分类数据
var form = layui.form;
$.ajax({
  url: "/my/article/cates",
  success: function (res) {
    if (res.status == 0) {
      var str = "";
      $.each(res.data, function (index, ele) {
        str += `<option value="${ele.Id}">${ele.name}</option>`;
      });
      $("select").html(str);

      // form：更新渲染；
      form.render("select");
    }
  }
});
// ----------------------------------------------富文本编辑器
initEditor();
