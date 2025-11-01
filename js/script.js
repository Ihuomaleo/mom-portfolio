// We wrap all our code in a DOMContentLoaded event listener.
// This is a best practice that ensures the HTML is fully loaded
// before the script tries to find elements.
document.addEventListener("DOMContentLoaded", () => {

  /* ===================================================================
      Debounce Function (for performance)
  ====================================================================== */
  /**
   * Delays a function call until a certain amount of time has passed
   * without the function being called again.
   * @param {Function} func The function to debounce.
   * @param {number} wait The delay in milliseconds.
   */
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

  /* ===================================================================
      Typing Animation
  ====================================================================== */
  // We can safely initialize Typed.js here because we know the DOM is ready.
  var typed = new Typed(".typing", {
    strings: [
      "a Senior Lecturer",
      "an Editor",
      "a Researcher",
      "a Content Writer",
    ],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
  });

  /* ===================================================================
      New Scrolling Navigation Logic (Scrollspy)
  ====================================================================== */

  const navList = document.querySelectorAll(".nav li");
  const allSection = document.querySelectorAll(".section");
  const totalNavList = navList.length;
  const mainContent = document.querySelector(".main-content");

  /* THIS IS THE CORRECTED CLICK LOGIC
    This function handles clicks on the nav links.
    It now PREVENTS the default jump and MANUALLY scrolls.
  */
  for (let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href").split("#")[1];
      const targetSection = document.querySelector("#" + targetId);

      if (targetSection) {
        mainContent.scrollTo({
          top: targetSection.offsetTop,
          behavior: "smooth",
        });
      }

      if (window.innerWidth < 1200 && aside.classList.contains("open")) {
        asideSectionTogglerBtn();
      }
    });
  }

  /* This is the "Scrollspy"
    It watches you scroll and highlights the correct nav link.
    PERFORMANCE: This function is now "debounced" to run
    a maximum of once every 100ms, instead of on every scroll pixel.
  */
  const handleScrollspy = () => {
    const scrollY = mainContent.scrollTop;
    const scrollOffset = 80;

    allSection.forEach((section) => {
      const sectionTop = section.offsetTop - scrollOffset;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      const navLink = document.querySelector(`.nav li a[href="#${sectionId}"]`);

      // Find the "Home" link
      const homeLink = document.querySelector(`.nav li a[href="#home"]`);

      // Special case for being at the top of the page
      if (scrollY <= sectionTop) {
        // Do nothing here, let the next condition handle it
      } else if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        // We are inside a section
        for (let i = 0; i < totalNavList; i++) {
          navList[i].querySelector("a").classList.remove("active");
        }
        if (navLink) {
          navLink.classList.add("active");
        }
      }
    });

    // Explicitly handle the "Home" link when at the very top
    if (scrollY < allSection[0].offsetTop + 50) { // If near the top (Home section)
        for (let i = 0; i < totalNavList; i++) {
          navList[i].querySelector("a").classList.remove("active");
        }
        const homeLink = document.querySelector(`.nav li a[href="#home"]`);
        if(homeLink) {
            homeLink.classList.add("active");
        }
    }
  };

  // We attach the debounced version of the function to the scroll event
  mainContent.addEventListener("scroll", debounce(handleScrollspy, 100));


  /* "Hire Me" buttons
    These need to manually scroll because they are not nav links.
    We will find the "Contact" section and scroll to it.
  */
  const contactSection = document.querySelector("#contact");
  document.querySelectorAll(".hire-me").forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      mainContent.scrollTo({
        top: contactSection.offsetTop,
        behavior: "smooth",
      });
      if (window.innerWidth < 1200 && aside.classList.contains("open")) {
        asideSectionTogglerBtn();
      }
    });
  });

  /* ===================================================================
      Aside Toggler Button Logic
  ====================================================================== */
  const navTogglerBtn = document.querySelector(".nav-toggler");
  const aside = document.querySelector(".aside");

  navTogglerBtn.addEventListener("click", () => {
    asideSectionTogglerBtn();
  });

  function asideSectionTogglerBtn() {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    mainContent.classList.toggle("open");
    const isExpanded = aside.classList.contains("open");
    navTogglerBtn.setAttribute("aria-expanded", isExpanded);
  }

}); // End of DOMContentLoaded

