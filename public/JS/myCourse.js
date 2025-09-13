document.addEventListener("DOMContentLoaded", function () {
  const courseContainer = document.getElementById("course-container");
  const courses = JSON.parse(localStorage.getItem("courseBought")) || [];

  if (courses.length === 0) {
    courseContainer.innerHTML = "<p>Bạn chưa mua khóa học nào.</p>";
  } else {
    courses.forEach((course) => {
      const courseElement = `
        <div class="course-item">
          <img src=".${course.image}" alt="${course.name}" class="course-image" />
          <h2>${course.name}</h2>
          <p>${course.description}</p>
          <a href="./studyNow${course.id}.html" class="btn-study">Học ngay</a>
        </div>
      `;
      courseContainer.insertAdjacentHTML("beforeend", courseElement);
    });
  }
});
