// We wrap all our code in a DOMContentLoaded event listener.
document.addEventListener("DOMContentLoaded", () => {

  /* ===================================================================
      Debounce Function (for performance)
  ====================================================================== */
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  /* ===================================================================
      Aside Toggle (Mobile Menu)
  ====================================================================== */
  const navTogglerBtn = document.querySelector(".nav-toggler");
  const aside = document.querySelector(".aside");
  const mainContent = document.querySelector(".main-content");

  navTogglerBtn.addEventListener("click", () => {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    mainContent.classList.toggle("open");

    const isExpanded = aside.classList.contains("open");
    navTogglerBtn.setAttribute("aria-expanded", isExpanded);
  });

  /* ===================================================================
      Navigation Click Logic  (FIXED)
      Uses scrollIntoView() instead of broken offsetTop logic
  ====================================================================== */
  const navList = document.querySelectorAll(".nav li a");
  const allSection = document.querySelectorAll(".section");

  navList.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      const targetId = this.getAttribute("href").replace("#", "");
      const targetSection = document.getElementById(targetId);

      if (!targetSection) return;

      // ⭐ Smooth scrolling FIX
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      // ⭐ Update active nav link
      document.querySelector(".nav .active")?.classList.remove("active");
      this.classList.add("active");

      // Close menu on mobile
      if (window.innerWidth < 1200) {
        aside.classList.remove("open");
        navTogglerBtn.classList.remove("open");
        mainContent.classList.remove("open");
      }
    });
  });

  /* ===================================================================
      Highlight Active Nav Item While Scrolling
  ====================================================================== */
  const updateActiveSection = debounce(() => {
    let scrollPos = window.scrollY;

    allSection.forEach((section) => {
      const offset = section.offsetTop - 120;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= offset && scrollPos < offset + height) {
        document.querySelector(".nav .active")?.classList.remove("active");
        const activeLink = document.querySelector(`.nav a[href="#${id}"]`);
        activeLink?.classList.add("active");
      }
    });
  }, 100);

  window.addEventListener("scroll", updateActiveSection);


  /* ===================================================================
      "Hire Me" Buttons → Go to Contact Section
  ====================================================================== */
  const contactSection = document.querySelector("#contact");
  document.querySelectorAll(".hire-me").forEach((button) => {
    button.addEventListener("click", () => {
      contactSection.scrollIntoView({ behavior: "smooth" });

      document.querySelector(".nav .active")?.classList.remove("active");
      document
        .querySelector('.nav a[href="#contact"]')
        ?.classList.add("active");
    });
  });



  /* ===================================================================
      Typed.js Animation
  ====================================================================== */
  try {
    new Typed(".typing", {
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
  } catch (e) {
    console.error("Typed.js not loaded — skipping typing effect.");
  }
});
