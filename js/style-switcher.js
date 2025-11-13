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


/* ===================================================================
    Theme Colors (UPGRADED)
    This now reads the 'data-color' attributes from the buttons
    instead of using 'onclick' in the HTML.
====================================================================== */
const colorButtons = document.querySelectorAll(".style-switcher .colors button");

colorButtons.forEach(button => {
    button.addEventListener("click", () => {
        const color = button.getAttribute("data-color");
        setActiveStyle(color);
    });
});

/* This function sets the CSS variable (--skin-color)
   which is referenced by the main stylesheet.
*/
function setActiveStyle(color) {
  document.documentElement.style.setProperty('--skin-color', color);
}


/* ===================================================================
    Theme light and dark mode (UPGRADED WITH LOCALSTORAGE)
    This now saves the user's choice and checks OS preference.
====================================================================== */
const dayNight = document.querySelector(".day-night");
const currentTheme = localStorage.getItem("theme");

// Function to set the theme
function setTheme(theme) {
    if (theme === "dark") {
        document.body.classList.add("dark");
        dayNight.querySelector("i").classList.add("fa-sun");
        dayNight.querySelector("i").classList.remove("fa-moon");
        dayNight.setAttribute("aria-label", "Switch to light mode");
        localStorage.setItem("theme", "dark");
    } else {
        document.body.classList.remove("dark");
        dayNight.querySelector("i").classList.add("fa-moon");
        dayNight.querySelector("i").classList.remove("fa-sun");
        dayNight.setAttribute("aria-label", "Switch to dark mode");
        localStorage.setItem("theme", "light");
    }
}

// Toggle theme on click
dayNight.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark");
    if (isDark) {
        setTheme("light");
    } else {
        setTheme("dark");
    }
});

// Set initial theme on page load
window.addEventListener("load", () => {
    // 1. Check localStorage first
    if (currentTheme) {
        setTheme(currentTheme);
    } 
    // 2. If no preference, check their OS preference
    else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme("dark");
    }
    // 3. Default to light
    else {
        setTheme("light");
    }
});