const menuItems = document.querySelectorAll(".menu-item");
const slider = document.getElementById("slider");
const slides = document.querySelectorAll(".slide");

menuItems[0].classList.add("active")

menuItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    const index = +item.dataset.slide;
    slides[index].scrollIntoView({ behavior: "smooth" });
    menuItems.forEach((i) => i.classList.remove("active"));
    item.classList.add("active");
  });
});

slider.addEventListener("scroll", () => {
  const index = Math.round(slider.scrollTop / window.innerHeight);
  menuItems.forEach(i => i.classList.remove("active"));
  if (menuItems[index]) {
    menuItems[index].classList.add("active");
  }
});