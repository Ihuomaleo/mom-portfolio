/* ===================================================================
    Style Switcher
====================================================================== */
const styleSwitcherToggler = document.querySelector(".style-switcher-toggler");
const styleSwitcher = document.querySelector(".style-switcher"); // Defined for click-outside logic

styleSwitcherToggler.addEventListener("click", () => {
  styleSwitcher.classList.toggle("open");
});

// Hide switcher on click outside
document.addEventListener("click", (event) => {
    // Check if the click is outside the switcher AND outside the toggler button
    if (!styleSwitcher.contains(event.target) && !styleSwitcherToggler.contains(event.target) && styleSwitcher.classList.contains("open")) {
        styleSwitcher.classList.remove("open");
    }
});


/* Theme Colors
   ACCESSIBILITY UPDATE:
   This function now sets a CSS variable (--skin-color)
   which is referenced by the main stylesheet.
*/
function setActiveStyle(color) {
  document.documentElement.style.setProperty('--skin-color', color);
}


/* ===================================================================
    Theme light and dark mode
    ACCESSIBILITY UPDATE:
    This now updates the aria-label of the button for screen readers.
====================================================================== */
const dayNight = document.querySelector(".day-night");
dayNight.addEventListener("click", () => {
    // Toggle icon
    dayNight.querySelector("i").classList.toggle("fa-sun");
    dayNight.querySelector("i").classList.toggle("fa-moon");

    // Toggle body class
    document.body.classList.toggle("dark");

    // ACCESSIBILITY ADDITION: Update aria-label based on new state
    if (document.body.classList.contains("dark")) {
        dayNight.setAttribute("aria-label", "Switch to light mode");
    } else {
        dayNight.setAttribute("aria-label", "Switch to dark mode");
    }
})

// Set initial icon and aria-label on page load
window.addEventListener("load", () => {
    if(document.body.classList.contains("dark"))
    {
        dayNight.querySelector("i").classList.add("fa-sun");
        dayNight.setAttribute("aria-label", "Switch to light mode");
    }
    else
    {
        dayNight.querySelector("i").classList.add("fa-moon");
        dayNight.setAttribute("aria-label", "Switch to dark mode");
    }
})

