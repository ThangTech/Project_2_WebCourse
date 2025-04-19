$(document).ready(function () {
  function parsePrice(priceString) {
    return parseFloat(priceString.replace("đ", "").replace(/\./g, ""));
  }

  function formatPrice(priceNumber) {
    return priceNumber.toLocaleString("vi-VN") + "đ";
  }

  function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartEmpty = $("#cart-empty");
    const cartContainer = $("#cart-container");
    const cartItems = $("#cart-items");
    const totalElement = $("#total");

    if (cart.length === 0) {
      cartEmpty.removeClass("hidden");
      cartContainer.addClass("hidden");
    } else {
      cartEmpty.addClass("hidden");
      cartContainer.removeClass("hidden");

      cartItems.empty();
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
        cartItems.append(cartItemHtml);
      });

      totalElement.text(formatPrice(total));
    }
  }

  $(document).on("click", ".remove-item", function () {
    const itemId = $(this).data("id");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter((item) => item.id !== itemId);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  });

  $("#removeAll").on("click", function () {
    localStorage.removeItem("cart");
    renderCart();
  });

  renderCart();
});
