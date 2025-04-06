const users = [];
$(document).ready(function () {
  $.getJSON("../JS/auth.json", function (data) {
    users.push(...data);
  }).fail(function () {
    console.error("Không thể tải file JSON");
  });
  $("#loginForm").on("submit", function (event) {
    event.preventDefault();
    let username = $("#username").val();
    let password = $("#password").val();
    let rememberMe = $("#remember").prop("checked");

    const userLogin = users.filter((user) => user.username === username)[0];
    if (!userLogin) {
      alert("Người dùng không tồn tại!");
      return;
    }

    const isVerified = userLogin.password === password;
    if (!isVerified) {
      alert("Sai mật khẩu!");
      return;
    }
    if (rememberMe) {
      userLogin.remember = true;
    }
    localStorage.setItem("auth", JSON.stringify(userLogin));
  });
});
