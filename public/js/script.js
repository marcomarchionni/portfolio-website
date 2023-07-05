document.addEventListener("DOMContentLoaded", function () {
  var activeSectionIndex;
  var headerOffset = 53;

  // get menu items and section elements
  var sections = document.querySelectorAll("section");
  var menuItems = document.querySelectorAll(".main-menu__item");
  var lastMenuItemIndex = menuItems.length - 1;

  menuItems.forEach((item) => item.addEventListener("click", onMenuClick));

  // Init active menu
  setActiveMenu();

  // Add scroll event listener
  window.addEventListener("scroll", setActiveMenu);

  function onMenuClick(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function toggleActiveClass(index) {
    if (index != undefined) {
      menuItems.forEach((menuItem, i) => {
        if (i === index) {
          menuItem.classList.add("active");
        } else {
          menuItem.classList.remove("active");
        }
        console.log(`Menu${i}: ${menuItem.classList}`);
      });
    }
  }

  function scrolledToBottom() {
    var pixelsToBottom =
      document.body.offsetHeight - window.innerHeight - window.scrollY;
    return pixelsToBottom <= 0;
  }

  function setActiveMenu() {
    if (scrolledToBottom()) {
      // set last menu item as active
      toggleActiveClass(lastMenuItemIndex);
      activeSectionIndex = lastMenuItemIndex;
    } else {
      var sectionIndexes = Array.from(sections)
        .map(function (el, index) {
          if (el.getBoundingClientRect().top <= headerOffset) {
            return index;
          }
        })
        .filter((item) => item != undefined);

      // Get the index of the current section
      var currentSectionIndex = sectionIndexes[sectionIndexes.length - 1];

      // If section has changed, update the menu
      if (activeSectionIndex !== currentSectionIndex) {
        toggleActiveClass(currentSectionIndex);
        activeSectionIndex = currentSectionIndex;
      }
    }
  }
});
