document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(".menu-item");
  const backgrounds = document.querySelectorAll(".background");
  const priceLists = document.querySelectorAll(".price-list");

  // Track current active elements
  let currentActiveIndex = 0;
  let animationQueue = [];
  let isProcessingQueue = false;

  // Set initial active background and price list
  backgrounds[0].classList.add("active");

  // Add event listeners to menu items
  menuItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      // Get the category and index from data attributes
      const category = this.getAttribute("data-category");
      const index = parseInt(this.getAttribute("data-index"));

      // Skip if this is already the active item
      if (index === currentActiveIndex) {
        return;
      }

      // Update menu item active state
      menuItems.forEach((i) => i.classList.remove("active"));
      this.classList.add("active");

      // Add to animation queue
      animationQueue.push({
        index: index,
        category: category,
      });

      // Process queue if not already processing
      if (!isProcessingQueue) {
        processAnimationQueue();
      }

      // Update current active index
      currentActiveIndex = index;
    });
  });

  function processAnimationQueue() {
    if (animationQueue.length === 0) {
      isProcessingQueue = false;
      return;
    }

    isProcessingQueue = true;

    // Get the next item from the queue
    const nextItem = animationQueue.shift();

    // Process only the latest item if multiple are queued
    if (animationQueue.length > 0) {
      const latestItem = animationQueue[animationQueue.length - 1];
      animationQueue = [latestItem]; // Keep only the latest item
    }

    // Change background with circular animation
    changeBackground(nextItem.index);

    // Change price list
    changePriceList(nextItem.category);
  }

  function changeBackground(index) {
    // Reset all backgrounds first
    backgrounds.forEach((bg) => {
      if (bg.classList.contains("active")) {
        bg.classList.remove("active");
        bg.classList.add("prev");
      } else if (bg.classList.contains("prev")) {
        bg.classList.remove("prev");
      }
    });

    // Activate new background
    backgrounds[index].classList.add("active");

    // Continue processing queue after animation completes
    setTimeout(() => {
      backgrounds.forEach((bg) => {
        if (bg.classList.contains("prev")) {
          bg.classList.remove("prev");
        }
      });

      processAnimationQueue();
    }, 60); // Match the CSS transition duration
  }

  function changePriceList(category) {
    // Find current active price list
    const currentActive = document.querySelector(".price-list.active");

    // Find the target price list
    const targetPriceList = document.querySelector(
      `.price-list[data-category="${category}"]`
    );

    if (!targetPriceList) return;

    // If there's a currently active price list, fade it out
    if (currentActive) {
      currentActive.classList.remove("active");
    }

    // Show the new price list
    setTimeout(() => {
      targetPriceList.classList.add("active");
    }, 10);
  }

  // Trigger the first menu item to set initial state
  menuItems[0].classList.add("active");

  // Tire configurator selection
  const tableCells = document.querySelectorAll(".table-cell:not(.disabled)");

  tableCells.forEach((cell) => {
    cell.addEventListener("click", function () {
      // Get the data attributes
      const size = this.getAttribute("data-size");
      const type = this.getAttribute("data-type");

      // Determine which group this cell belongs to
      const isFullService = type.includes("-full");

      // Deselect all cells in the same group
      document.querySelectorAll(".table-cell:not(.disabled)").forEach((c) => {
        const cType = c.getAttribute("data-type") || "";
        const matchesGroup = isFullService
          ? cType.includes("-full")
          : !cType.includes("-full");

        if (matchesGroup) {
          c.classList.remove("selected");
        }
      });

      // Select this cell
      this.classList.add("selected");
      console.log("hi");
    });
  });
  const logo = document.querySelector(".logo");
  const logoSections = document.querySelector(".logo-sections");
  const logoOverlay = document.querySelector(".logo-overlay");

  logo.addEventListener("mouseenter", () => {
    logoSections.classList.add("active");
    logoOverlay.classList.add("active");
  });

  logoSections.addEventListener("mouseleave", () => {
    logoSections.classList.remove("active"); // заменил toggle на remove для симметрии
    logoOverlay.classList.remove("active");
  });
});
