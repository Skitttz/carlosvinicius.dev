export default class DarkMode {
  constructor(targetClick, elements, homeGif, logo) {
    this.moon = document.querySelector(targetClick);
    this.sections = document.querySelector(elements);
    this.homeGif = document.querySelector(homeGif);
    this.logo = document.querySelector(logo);
    this.eventos = ["click", "touchstart"];
    this.moon.style.fontSize = "1.2rem";
    this.changeIcon = this.changeIcon.bind(this);
  }

  changeMode() {
    let dataTheme = this.sections.getAttribute("data-theme");
    let newDataTheme;
    newDataTheme = dataTheme === "light" ? "dark" : "light";
    this.sections.setAttribute("data-theme", newDataTheme);
    this.setLocalDarkMode(newDataTheme);
  }

  initCheckLocal() {
    let local = localStorage.getItem("theme");
    if (local === "light") {
      this.moon.innerText = "🌕";
      this.logo.src = "./img/logo.svg";
      this.homeGif.src = "./img/home.gif";
    } else if (local === "dark") {
      this.moon.innerText = "🌑";
      this.logo.src = "./img/logoDark.svg";
      this.homeGif.src = "./img/homeDark.gif";
    }
  }

  changeIcon(event) {
    event.preventDefault();
    if (this.moon.innerText === "🌕") {
      this.moon.innerText = "🌑";
      this.logo.src = "./img/logoDark.svg";
      this.homeGif.style.opacity = "0";
      setTimeout(() => {
        this.homeGif.src = "./img/homeDark.gif";
        this.homeGif.style.opacity = "1";
        this.homeGif.style.transition = "opacity 0.5s ease-in-out;";
      }, 250);
    } else if (this.moon.innerText === "🌑") {
      this.moon.innerText = "🌕";
      this.logo.src = "./img/logo.svg";
      this.homeGif.style.opacity = "0";
      setTimeout(() => {
        this.homeGif.src = "./img/home.gif";
        this.homeGif.style.opacity = "1";
      }, 250);
    }
    this.changeMode();
  }

  addEventDarkMode() {
    this.eventos.forEach((event) => {
      this.moon.addEventListener(event, this.changeIcon);
    });
  }

  setLocalDarkMode(theme) {
    localStorage.setItem("theme", theme);
  }

  checkLocalDarkMode() {
    let local;
    if (localStorage.getItem("theme") == null) {
      local = document.documentElement.getAttribute("data-theme");
    } else {
      local = localStorage.getItem("theme");
    }
    document.documentElement.setAttribute("data-theme", local);
  }

  init() {
    if (this.moon && this.sections) {
      this.checkLocalDarkMode();
      this.initCheckLocal();
      this.addEventDarkMode();
    }
  }
}
