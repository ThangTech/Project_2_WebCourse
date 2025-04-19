$(document).ready(function () {
  $.getJSON("../data/course.json", function (data) {
    const freeTrialCourses = data.freeTrial;
    const bestSellerCourses = data.bestseller;

    const freeTrialContainer = $("#free-trial-container");
    if (freeTrialContainer.length) {
      freeTrialCourses.forEach((course) => {
        const courseElement = `
                    <div class="course-item">
                        <img src="${course.image}" alt="${course.name}" />
                        <h3>${course.name}</h3>
                        <p>${course.description}</p>
                        <button class="add-to-cart" data-name="${course.name}" data-price="Free" data-image="${course.image}">Add to Cart</button>
                    </div>
                `;
        freeTrialContainer.append(courseElement);
      });
    }
    const cart = [];
    $(document).on("click", ".add-to-cart", function () {
      const name = $(this).data("name");
      const price = $(this).data("price");
      const image = $(this).data("image");

      const course = { name, price, image };
      cart.push(course);

      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      // Update cart count
      const cartCount = $("#cart-count");
      if (cartCount.length) {
        cartCount.text(`(${cart.length})`);
      }

      alert(`${name} has been added to the cart!`);
    });
  }).fail(function () {
    console.error("Error fetching courses");
  });
});
