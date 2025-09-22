document.addEventListener("DOMContentLoaded", function () {
  function parsePrice(priceString) {
    return parseFloat(priceString.replace("đ", "").replace(/\./g, ""));
  }

  function formatPrice(priceNumber) {
    return priceNumber.toLocaleString("vi-VN") + "đ";
  }

  function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartEmpty = document.getElementById("cart-empty");
    const cartContainer = document.getElementById("cart-container");
    const cartItems = document.getElementById("cart-items");
    const totalElement = document.getElementById("total");

    if (cart.length === 0) {
      cartEmpty.classList.remove("hidden");
      cartContainer.classList.add("hidden");
    } else {
      cartEmpty.classList.add("hidden");
      cartContainer.classList.remove("hidden");

      cartItems.innerHTML = "";
      let total = 0;

      cart.forEach((item) => {
        const itemPrice = parsePrice(item.price);
        total += itemPrice;

        const cartItemHtml = `
          <div class="cart-item">
            <div class="item-image">
              <img src=".${item.image}" alt="${item.name}" />
            </div>
            <div class="item-details">
              <h3>${item.name}</h3>
              <p>${item.description}</p>
              <span class="item-price">${item.price}</span>
            </div>
            <button class="remove-item" data-id="${item.id}">Xoá</button>
          </div>
        `;
        cartItems.insertAdjacentHTML("beforeend", cartItemHtml);
      });

      totalElement.textContent = formatPrice(total);
    }
  }

  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-item")) {
      const itemId = event.target.getAttribute("data-id");
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart = cart.filter((item) => item.id !== itemId);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }
  });

  var removeAllBtn = document.getElementById("removeAll");
  if (removeAllBtn) {
    removeAllBtn.addEventListener("click", function () {
      localStorage.removeItem("cart");
      renderCart();
    });
  }

  renderCart();

  // Xử lý sự kiện khi người dùng nhấn nút thanh toán
  var checkoutBtns = document.querySelectorAll(".checkout-btn");
  checkoutBtns.forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      const totalPriceString = document
        .getElementById("total")
        .textContent.trim();
      const totalPrice = parsePrice(totalPriceString);
      localStorage.setItem("totalPrice", totalPrice);
      window.location.href = "./checkout.html";
    });
  });
});
