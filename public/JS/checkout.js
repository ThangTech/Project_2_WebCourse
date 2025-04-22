$(document).ready(function () {
  const totalPrice = localStorage.getItem("totalPrice");
  if (totalPrice) {
    $("#amount").val(totalPrice); // Gán giá trị vào input có id="amount"
  }
  $("#checkout-form").on("submit", function (event) {
    event.preventDefault();

    const cardNumber = $("#cardNumber").val();
    const cardHolder = $("#cardHolder").val();

    // Lấy dữ liệu từ file JSON
    $.getJSON("../data/card.json", function (cards) {
      const card = cards.find(function (c) {
        return c.cardNumber === cardNumber && c.cardHolder === cardHolder;
      });

      if (!card) {
        $("#message").text("Thông tin thẻ không hợp lệ!").css("color", "red");
        return;
      }

      if (card.balance < totalPrice) {
        $("#message").text("Số dư không đủ!").css("color", "red");
        return;
      }

      card.balance -= totalPrice;
      $("#message").text("Thanh toán thành công!").css("color", "green");
      const courseBought =
        JSON.parse(localStorage.getItem("courseBought")) || []; // Lấy danh sách khóa học đã mua từ localStorage
      const cart = JSON.parse(localStorage.getItem("cart")); // Lấy danh sách khóa học trong giỏ hàng từ localStorage
      if (cart) {
        courseBought.push(...cart); // Thêm khóa học trong giỏ hàng vào danh sách khóa học đã mua
      }
      localStorage.setItem("courseBought", JSON.stringify(courseBought));
      localStorage.removeItem("cart");
      localStorage.removeItem("totalPrice"); // Xóa giỏ hàng sau khi thanh toán thành công
      window.location.href = "./myCourse.html";

      console.log("Cập nhật số dư:", card);
    }).fail(function () {
      $("#message").text("Không thể tải dữ liệu thẻ!").css("color", "red");
    });
  });
});
