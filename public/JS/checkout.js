// document.addEventListener("DOMContentLoaded", function () {
//   const totalPrice = localStorage.getItem("totalPrice");
//   if (totalPrice) {
//     var amountInput = document.getElementById("amount");
//     if (amountInput) amountInput.value = totalPrice;
//   }

//   var checkoutForm = document.getElementById("checkout-form");
//   if (checkoutForm) {
//     checkoutForm.addEventListener("submit", function (event) {
//       event.preventDefault();
//       const cardNumber = document.getElementById("cardNumber").value;
//       const cardHolder = document.getElementById("cardHolder").value;
//       const messageEl = document.getElementById("message");

//       fetch("../data/card.json")
//         .then(function (response) {
//           if (!response.ok) throw new Error("Không thể tải dữ liệu thẻ!");
//           return response.json();
//         })
//         .then(function (cards) {
//           const card = cards.find(function (c) {
//             return c.cardNumber === cardNumber && c.cardHolder === cardHolder;
//           });

//           if (!card) {
//             messageEl.textContent = "Thông tin thẻ không hợp lệ!";
//             messageEl.style.color = "red";
//             return;
//           }

//           if (card.balance < totalPrice) {
//             messageEl.textContent = "Số dư không đủ!";
//             messageEl.style.color = "red";
//             return;
//           }

//           card.balance -= totalPrice;
//           messageEl.textContent = "Thanh toán thành công!";
//           messageEl.style.color = "green";
//           const courseBought =
//             JSON.parse(localStorage.getItem("courseBought")) || [];
//           const cart = JSON.parse(localStorage.getItem("cart"));
//           if (cart) {
//             courseBought.push(...cart);
//           }
//           localStorage.setItem("courseBought", JSON.stringify(courseBought));
//           localStorage.removeItem("cart");
//           localStorage.removeItem("totalPrice");
//           window.location.href = "./myCourse.html";
//           console.log("Cập nhật số dư:", card);
//         })
//         .catch(function () {
//           const messageEl = document.getElementById("message");
//           if (messageEl) {
//             messageEl.textContent = "Không thể tải dữ liệu thẻ!";
//             messageEl.style.color = "red";
//           }
//         });
//     });
//   }
// });
