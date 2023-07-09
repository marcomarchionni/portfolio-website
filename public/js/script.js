document.addEventListener("DOMContentLoaded", function () {
  var activeSectionIndex;
  var headerOffset = 53;

  // get menu items and section elements
  var sections = document.querySelectorAll("section");
  var menuItems = document.querySelectorAll(".main-menu__item");
  var hamburgerMenu = document.querySelector(".hamburger");
  var lastMenuItemIndex = menuItems.length - 1;

  menuItems.forEach((item) => item.addEventListener("click", onMenuClick));
  hamburgerMenu.addEventListener("click", onMobileMenuClick);

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

  function onMobileMenuClick(e) {
    console.log("hamburger click");
    hamburgerMenu.classList.add("open");
  }

  function toggleActiveClass(index) {
    if (index != undefined) {
      menuItems.forEach((menuItem, i) => {
        if (i === index) {
          menuItem.classList.add("active");
        } else {
          menuItem.classList.remove("active");
        }
      });
    }
  }

  function scrolledToBottom() {
    var pixelsToBottom =
      document.body.offsetHeight - window.innerHeight - window.scrollY;
    return pixelsToBottom < 1;
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
