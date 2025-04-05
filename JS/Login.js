$(document).ready(function() {
    $("#loginForm").on("submit", function(event) {
        event.preventDefault();
        let username = $("#username").val();
        let password = $("#password").val();
        let rememberMe = $("#remember").prop("checked");
        let user = localStorage.getItem(username);
        
        if (user) {
            let parsedUser = JSON.parse(user);
            if (parsedUser.password === password) {
                if(rememberMe) {
                    localStorage.setItem("user", JSON.stringify(parsedUser));
                } else {
                    sessionStorage.setItem("user", JSON.stringify(parsedUser));
                }
                window.location.href = "../index.html";
            } else {
                alert("Sai mật khẩu!");
            }
        } else {
            alert("Người dùng không tồn tại!");
        }
    });
});