document.addEventListener("DOMContentLoaded", function () {
  // Select all main menu items and add 'click' event listeners
  const menuItems = document.querySelectorAll(".main-menu__item");
  menuItems.forEach((item) => item.addEventListener("click", onMenuClick));

  // Select mobile menu components and add 'click' event listeners
  const hamburgerButton = document.querySelector(".mobile-menu-button");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");
  const mobileMenuComponents = [hamburgerButton, mobileMenu, mobileMenuOverlay];
  const mobileMenuItems = document.querySelectorAll(".mobile-menu__item");

  hamburgerButton.addEventListener("click", onHamburgerButtonClick);
  mobileMenuOverlay.addEventListener("click", hideMobileMenu);
  mobileMenuItems.forEach((item) =>
    item.addEventListener("click", onMobileMenuClick)
  );

  /* Highlight menu item while viewing the corresponding section */

  // Initialize active menu
  const sections = document.querySelectorAll("section");
  let activeSectionIndex;
  const headerOffset = document.querySelector("header").offsetHeight + 1;
  setActiveMenu();

  // Update active menu while scrolling
  window.addEventListener("scroll", setActiveMenu);

  function setActiveMenu() {
    // Function to add/remove 'active' class from menu items
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
    // Check if the user has scrolled to the bottom of the page
    function scrolledToBottom() {
      const pixelsToBottom =
        document.body.offsetHeight - window.innerHeight - window.scrollY;
      return pixelsToBottom < 1;
    }

    if (scrolledToBottom()) {
      // Set the last menu item active
      const lastMenuItemIndex = menuItems.length - 1;
      toggleActiveClass(lastMenuItemIndex);
      activeSectionIndex = lastMenuItemIndex;
    } else {
      // Find the current section
      const sectionIndexes = Array.from(sections)
        .map(function (section, index) {
          if (section.getBoundingClientRect().top < headerOffset) {
            return index;
          }
        })
        .filter((item) => item != undefined);
      const currentSectionIndex = sectionIndexes[sectionIndexes.length - 1];

      // If current section has changed, update the active menu
      if (activeSectionIndex !== currentSectionIndex) {
        toggleActiveClass(currentSectionIndex);
        activeSectionIndex = currentSectionIndex;
      }
    }
  }

  // Function to scroll to the section related to the clicked menu item
  function onMenuClick(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function onMobileMenuClick(e) {
    onMenuClick.call(this, e);
    hideMobileMenu();
  }

  function onHamburgerButtonClick(e) {
    if (hamburgerButton.classList.contains("show-menu")) {
      hideMobileMenu();
    } else {
      showMobileMenu();
    }
  }

  function showMobileMenu() {
    mobileMenuComponents.forEach((component) =>
      component.classList.add("show-menu")
    );
  }

  function hideMobileMenu() {
    mobileMenuComponents.forEach((component) =>
      component.classList.remove("show-menu")
    );
  }
});
