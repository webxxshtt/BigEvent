$("#goto-register").on("click", function () {
  $("#login").hide();
  $("#register").show();
});
$("#goto-login").on("click", function () {
  $("#login").show();
  $("#register").hide();
});
