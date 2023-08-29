import outsideClick from "./outsideclick.js";

export default class MenuMobile {
  constructor(menuH, menu, navMenu, itemMenus, lastItem, events) {
    this.menuHamburguer = document.querySelector(menuH);
    this.menu = document.querySelector(menu);
    this.navMenu = document.querySelector(navMenu);
    this.itemMenus = document.querySelectorAll(itemMenus);
    this.activeClass = "active";

    /* Feito para o ultimo item */
    this.bar = document.querySelector(lastItem);

    if (events === undefined) {
      this.eventos = ["click", "touchstart"];
    } else {
      this.eventos = events;
    }

    this.openMenu = this.openMenu.bind(this);
  }

  animationOpacity() {
    const elemento = document.querySelector(".logo");
    elemento.style.display = "none";
    let opacity = 0;
    const interval = setInterval(function () {
      opacity += 0.1;
      elemento.style.opacity = opacity;
      if (opacity >= 0.1) {
        elemento.style.display = "flex";
      }

      if (opacity >= 1) {
        clearInterval(interval);
      }
    }, 200);
  }

  openMenu(event) {
    /* Iniciar Menu ao clicar */

    if (event.cancelable) {
      event.preventDefault();
    }
    this.menu.classList.toggle(this.activeClass);
    this.menuHamburguer.classList.toggle(this.activeClass);
    this.navMenu.classList.toggle(this.activeClass);
    this.bar.classList.toggle(this.activeClass);

    /* Clicar do lado de fora do menu fechara */
    outsideClick(this.menu, this.eventos, () => {
      this.animationOpacity();
      this.menuHamburguer.classList.remove(this.activeClass);
      this.navMenu.classList.remove(this.activeClass);
      this.menu.classList.remove(this.activeClass);
      this.bar.classList.remove(this.activeClass);
    });

    /* Clicar em um item fechar o menu */
    const arrayItemsMenu = [...this.itemMenus];

    this.eventos.forEach((event) => {
      arrayItemsMenu.forEach((item) => {
        item.addEventListener(event, () => {
          this.animationOpacity();
          this.menuHamburguer.classList.remove(this.activeClass);
          this.navMenu.classList.remove(this.activeClass);
          this.menu.classList.remove(this.activeClass);
          this.bar.classList.remove(this.activeClass);
        });
      });
    });
  }

  addMenuMobileEvents() {
    this.eventos.forEach((evento) =>
      this.menuHamburguer.addEventListener(evento, this.openMenu)
    );
  }

  init() {
    if (this.menuHamburguer && this.menu) {
      this.addMenuMobileEvents();
    }
    return this;
  }
}
