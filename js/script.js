import MenuMobile from "./modules/menuH.js";
import { Slide, SlideNav } from "./modules/slide.js";
import ScrollAnimation from "./modules/scroll-animation.js";
import ScrollSmooth from "./modules/scroll-smooth.js";
import TypeF from "./modules/typeF.js";
import DarkMode from "./modules/darkmode.js";
import moveIcon from "./modules/moveIcon.js";
import tech from "./modules/tech-animation.js";
import RepositoryGit from "./modules/listRepository.js";
import ModalContact from "./modules/modalContact.js";

const menuMobile = new MenuMobile(
  ".hMenu",
  ".header",
  ".header-menu",
  '.link[href^="#"]',
  ".last",
);
menuMobile.init();
TypeF();

const modalContact = new ModalContact(
  ".modal-contact",
  ".modal-content",
  ".btnOpenModal",
  ".btnCloseModal",
  ".item-name input",
  ".item-email input",
  ".item-subject input",
  ".item-message input",
);
modalContact.init();

/* Botao de CV foi trocado agora é o contato e vice-versa */
const moveI = new moveIcon(".btn-contact", ".i-download");
moveI.init();

const scrollS = new ScrollSmooth('[data-menu="smooth"] a[href^="#"]', ".logo");
scrollS.init();

const scrollAni = new ScrollAnimation("[data-animation='scroll']");
scrollAni.init();

const darkMode = new DarkMode(
  ".btnDarkMode",
  "[data-theme]",
  ".homeGif img",
  "#ImagemLogo",
);
darkMode.init();

const techS = new tech(
  ".card-ul li",
  "#tech-title",
  "#tech-about",
  ".tech-text",
);
techS.init();

const ListRepository = new RepositoryGit(".body-repository");
ListRepository.init().then(() => {
  const slide = new SlideNav(".slide", ".wrap");
  slide.onResize();
  slide.init();
  slide.addArrow(".prev", ".next");
  slide.addControl(".controls");
});
