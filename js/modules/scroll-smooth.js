export default class ScrollSmooth {
  constructor(links, logo) {
    this.linksInternos = document.querySelectorAll(links);
    this.logo = document.querySelector(logo);
    this.scrollToSection = this.scrollToSection.bind(this);
  }

  scrollToSection(event, options) {
    event.preventDefault();
    const href = event.currentTarget.getAttribute("href");
    const section = document.querySelector(href);
    let topSection = section.offsetTop;
    if (href === "#home") {
      topSection = 0;
    } else if (href === "#about") {
      topSection *= 0.8;
    } else if (href === "#project") {
      topSection *= 0.9;
    } else if (href === "#tech") {
      topSection *= 0.9;
    }
    if (options === undefined) {
      options = { top: topSection, behavior: "smooth" };
    } else {
      this.options = options;
    }
    window.scrollTo(options);
  }

  addLinkEvent() {
    const eventos = ["click", "touchstart"];

    eventos.forEach((evento) => {
      this.linksInternos.forEach((link) => {
        link.addEventListener(evento, this.scrollToSection);
      });
    });

    /* set section to logo (home) */
    eventos.forEach((e) => this.logo.addEventListener(e, this.scrollToSection));
  }

  init() {
    if (this.linksInternos.length) {
      this.addLinkEvent();
    }
    return this;
  }
}
