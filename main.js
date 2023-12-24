// JavaScript code for scroll-triggered animations, navbar visibility, and language toggle
gsap.registerPlugin(ScrollTrigger);

// Get the navbar element
const navbar = document.querySelector(".navbar");

// Set initial scroll position to the top
let prevScrollPos = window.pageYOffset;

// Function to handle scrolling
function handleScroll() {
  const currentScrollPos = window.pageYOffset;

  if (currentScrollPos === 0) {
    // Fully visible on the main page
    navbar.style.visibility = "visible";
    navbar.style.opacity = "1";
  } else if (prevScrollPos > currentScrollPos) {
    // Scrolling up, show the navbar
    navbar.style.visibility = "visible";
    navbar.style.opacity = "1";
  } else {
    // Scrolling down, hide the navbar
    navbar.style.visibility = "hidden";
    navbar.style.opacity = "0";
  }

  // Update the previous scroll position
  prevScrollPos = currentScrollPos;
}

// Add a scroll event listener to call the handleScroll function
window.addEventListener("scroll", handleScroll);

// Function to set a cookie with the language preference
function setLanguageCookie(language) {
  document.cookie = `language=${language}; path=/`;
}

// Function to get the value of a cookie by name
function getCookie(name) {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name))
    ?.split("=")[1];
  return cookieValue;
}

// Function to toggle between English and Russian versions
function toggleLanguage(event) {
  event.preventDefault();
  const currentLanguage = event.target.id;

  // Get the current query parameters
  const urlParams = new URLSearchParams(window.location.search);

  // Set the language preference cookie
  setLanguageCookie(currentLanguage);

  // Update page content based on the selected language
  updatePageLanguage(currentLanguage);

  // Update the 'lang' query parameter in the URL
  urlParams.set("lang", currentLanguage);

  // Replace the URL without reloading the page
  const newURL = window.location.pathname + "?" + urlParams.toString();
  window.history.replaceState({}, "", newURL);
}

// Function to update page content based on language
function updatePageLanguage(language) {
  const elementsToTranslate = document.querySelectorAll("[data-translate]");
  elementsToTranslate.forEach((element) => {
    const key = element.getAttribute("data-translate");
    element.textContent = translations[language][key];
  });
}

// Add click event listeners to language buttons
document.getElementById("english").addEventListener("click", toggleLanguage);
document.getElementById("russian").addEventListener("click", toggleLanguage);

// Check the language preference cookie and set the language
const savedLanguage = getCookie("language");
if (savedLanguage) {
  document.documentElement.lang = savedLanguage;
  updatePageLanguage(savedLanguage);
}

// Define translations
const translations = {
  english: {
    scrollDown: "Scroll Down",
    animation1: "Animation 1",
    animation2: "Animation 2",
  },
  russian: {
    scrollDown: "Прокрутите вниз",
    animation1: "Анимация 1",
    animation2: "Анимация 2",
  },
};

// Add your ScrollTrigger animations below this code
gsap.utils.toArray(".revealUp").forEach(function (elem) {
  ScrollTrigger.create({
    trigger: elem,
    start: "top 80%",
    end: "bottom 20%",
    markers: true,
    onEnter: function () {
      gsap.fromTo(
        elem,
        { y: 100, autoAlpha: 0 },
        {
          duration: 1.25,
          y: 0,
          autoAlpha: 1,
          ease: "back",
          overwrite: "auto",
        }
      );
    },
    onLeave: function () {
      gsap.fromTo(elem, { autoAlpha: 1 }, { autoAlpha: 0, overwrite: "auto" });
    },
    onEnterBack: function () {
      gsap.fromTo(
        elem,
        { y: -100, autoAlpha: 0 },
        {
          duration: 1.25,
          y: 0,
          autoAlpha: 1,
          ease: "back",
          overwrite: "auto",
        }
      );
    },
    onLeaveBack: function () {
      gsap.fromTo(elem, { autoAlpha: 1 }, { autoAlpha: 0, overwrite: "auto" });
    },
  });
});
