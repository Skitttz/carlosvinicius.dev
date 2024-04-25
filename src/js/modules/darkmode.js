import Lottie from "lottie-web";
export default class DarkMode {
  constructor(targetClick, elements, homeGif, logo) {
    this.moon = document.querySelector(targetClick);
    this.sections = document.querySelector(elements);
    this.homeGif = document.querySelector(homeGif);
    this.logo = document.querySelector(logo);
    this.eventos = ["click", "touchstart"];
    this.changeIcon = this.changeIcon.bind(this);
    Lottie.setSpeed(2.5);
    Lottie.loadAnimation({
      container: this.moon,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: "./assets/img/iconDark.json",
    });
    Lottie.setDirection("1");
    Lottie.setSpeed(1.7);
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
    if (local === "light" || local === null) {
      this.logo.src = "./assets/img/logo.svg";
      this.homeGif.src = "./assets/img/homeDarkV2.png";
      this.eventos.forEach((event) => {
        this.moon.addEventListener(event, () => {
          Lottie.setDirection("1");
          Lottie.play();
        });
      });
    } else if (local === "dark") {
      Lottie.setDirection("1");
      Lottie.play();
      this.eventos.forEach((event) => {
        this.moon.addEventListener(event, () => {
          Lottie.setSpeed(2.5);
          Lottie.setDirection("-1");
          Lottie.play();
        });
      });

      this.logo.src = "./assets/img/logoDark.svg";
      this.homeGif.src = "./assets/img/homeLight.png";
    }
  }

  changeIcon(event) {
    if (event.cancelable) {
      event.preventDefault();
    }

    let local = localStorage.getItem("theme");
    this.homeGif.style.webkitTransition = "opacity 10s ease-in-out";
    this.homeGif.style.MozTransition = "opacity 10s ease-in-out";
    this.homeGif.style.msTransition = "opacity 10s ease-in-out";
    this.homeGif.style.oTransition = "opacity 10s ease-in-out";
    this.homeGif.style.transition = "opacity 10s ease-in-out";

    if (local === "light") {
      this.eventos.forEach((event) => {
        this.moon.addEventListener(event, () => {
          Lottie.setSpeed(2.5);
          Lottie.setDirection("-1");
          Lottie.play();
        });
      });
      this.logo.src = "./assets/img/logoDark.svg";
      this.homeGif.style.opacity = "0";
      setTimeout(() => {
        this.homeGif.src = "./assets/img/homeLight.png";
        this.homeGif.style.opacity = "1";
      }, 250);
    } else if (local === "dark") {
      this.eventos.forEach((event) => {
        this.moon.addEventListener(event, () => {
          Lottie.setDirection("1");
          Lottie.play();
        });
      });
      this.logo.src = "./assets/img/logo.svg";
      this.homeGif.style.opacity = "0";
      setTimeout(() => {
        this.homeGif.src = "./assets/img/homeDarkV2.png";
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
