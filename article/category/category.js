function getList() {
  $.ajax({
    url: "/my/article/cates",
    success: function (res) {
      console.log(res);
      var arr = res.data;
      if (res.data.length != 0) {
        var str = "";
        $.each(arr, function (index, ele) {
          str += `<tr>
                      <td>${ele.name}</td>
                      <td>${ele.alias}</td>
                      <td>
                          <button myid="${ele.Id}" data-name="${ele.name}" data-alias="${ele.alias}" type="button" class="layui-btn layui-btn-xs edit">编辑</button>
  
                            <button myid="${ele.Id}" type="button" class="layui-btn layui-btn-xs layui-btn-danger delete">删除</button>
                      </td>
                    </tr>`;
        });
      }
      // 把组合后的HTML标签，放到指定的位置
      $("tbody").html(str);
    }
  });
}
getList();
// ------------------------------------------

var add_str = `
  <form class="layui-form add-form" action="" style="margin: 30px; margin-left: 0px;" id="add_form">
    <div class="layui-form-item">
      <label class="layui-form-label">类别名称</label>
      <div class="layui-input-block">
        <input type="text" name="name" required lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-form-item">
      <label class="layui-form-label">类别别名</label>
      <div class="layui-input-block">
        <input type="text" name="alias" required lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-form-item">
      <div class="layui-input-block">
        <button class="layui-btn" lay-submit lay-filter="formDemo">确认添加</button>
        <button type="reset" class="layui-btn layui-btn-primary">重置</button>
      </div>
    </div>
  </form>`;
// --------------------------------------------
$(".layui-card-header button").click(function () {
  layer.open({
    type: 1,
    title: "添加类别",
    content: add_str,
    area: ["500px", "250px"],
    //
    success: function (dom, index) {
      add_submit(index);
    }
  });
});
// -----------步骤1：
// $("#add_form").on("submit", function (e) {
//   e.preventDefault();
//   console.log(1);
// });
// 问题：不能把提交事件放在外面注册：
// 原因：代码执行到这，就是现在就要给$("#add_form")注册提交事件
//       但是 现在：页面没有 $("#add_form");
// 解决：等待form出来后，才能获取，然后再次注册提交事件
// 代码：layer.open(success 里面注册提交事件);

// -------------步骤2：
// 注册事件放在  layer.open(success 里面注册提交事件);
// 测试是否生效  代码变的不容易维护；

// -------------步骤3：
// 把写入内部代码，先在外面封装，在里面调用！
//  提交
function add_submit(index) {
  $("#add_form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/article/addcates",
      // 收集数据
      data: $(this).serialize(),
      success: function (res) {
        // 无论成功，还是失败，都给提示
        layer.msg(res.message);
        if (res.status === 0) {
          // 添加成功，重新渲染列表
          getList();

          // 关闭弹出层
          layer.close(index);
        }
      }
    });
  });
}
// 删除
$("tbody").on("click", ".delete", function () {
  // 在询问之前，先获取id
  var id = $(this).attr("myid");

  layer.confirm(
    "确定删除吗？你好狠！",
    {
      icon: 3,
      title: "提示"
    },
    function (index) {
      $.ajax({
        url: "/my/article/deletecate/" + id,
        success: function (res) {
          layer.msg(res.message);
          if (res.status === 0) {
            // 删除成功，重新渲染
            getList();
          }
        }
      });

      layer.close(index);
    }
  );
});
