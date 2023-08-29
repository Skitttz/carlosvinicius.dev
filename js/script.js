import MenuMobile from "./modules/menuH.js";
import { Slide, SlideNav } from "./modules/slide.js";
import ScrollAnimation from "./modules/scroll-animation.js";
import ScrollSmooth from "./modules/scroll-smooth.js";
import TypeF from "./modules/typeF.js";
import DarkMode from "./modules/darkmode.js";
import moveIcon from "./modules/moveIcon.js";

const menuMobile = new MenuMobile(
  ".hMenu",
  ".header",
  ".header-menu",
  '.link[href^="#"]',
  ".last"
);
menuMobile.init();
TypeF();

/* Botao de CV foi trocado agora é o contato e vice-versa */
const moveI = new moveIcon(".btn-contact", ".i-download");
moveI.init();

const scrollS = new ScrollSmooth('[data-menu="smooth"] a[href^="#"]', ".logo");
scrollS.init();

const scrollAni = new ScrollAnimation("[data-animation='scroll']");
scrollAni.init();

const slide = new SlideNav(".slide", ".wrap");
slide.onResize();
slide.init();
// slide.addArrow(".prev", ".next");
slide.addControl(".controls");

const darkMode = new DarkMode(
  ".btnDarkMode",
  "[data-theme]",
  ".homeGif img",
  "#ImagemLogo"
);
darkMode.init();
