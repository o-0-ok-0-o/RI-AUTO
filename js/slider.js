const menuItems = document.querySelectorAll(".menu-item");
const slider = document.getElementById("slider");
const slides = document.querySelectorAll(".slide");

let currentIndex = 0;
let isScrolling = false;

menuItems[0].classList.add("active");

// Наведение мыши на меню — плавная прокрутка
menuItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    const index = +item.dataset.slide;
    scrollToSlide(index);
  });
});

// Прокрутка колесиком мыши — с задержкой и плавностью
slider.addEventListener("wheel", (e) => {
  if (isScrolling) return;

  if (e.deltaY > 0 && currentIndex < slides.length - 1) {
    currentIndex++;
  } else if (e.deltaY < 0 && currentIndex > 0) {
    currentIndex--;
  } else {
    return;
  }

  scrollToSlide(currentIndex);

  isScrolling = true;
  setTimeout(() => {
    isScrolling = false;
  }, 700); // Время между слайдами
});

// Подсветка активного пункта при ручной прокрутке
slider.addEventListener("scroll", () => {
  const index = Math.round(slider.scrollTop / window.innerHeight);
  currentIndex = index;
  updateMenu(index);
});

// Прокрутка к нужному слайду
function scrollToSlide(index) {
  slides[index].scrollIntoView({ behavior: "smooth" });
  currentIndex = index;
  updateMenu(index);
}

// Обновление активного пункта меню
function updateMenu(index) {
  menuItems.forEach((i) => i.classList.remove("active"));
  if (menuItems[index]) {
    menuItems[index].classList.add("active");
  }
}
