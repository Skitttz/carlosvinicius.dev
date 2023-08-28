export default class ScrollSmooth {
  constructor(links) {
    this.linksInternos = document.querySelectorAll(links);
    this.scrollToSection = this.scrollToSection.bind(this);
  }

  scrollToSection(event, options) {
    event.preventDefault();
    const href = event.currentTarget.getAttribute("href");
    const section = document.querySelector(href);
    let topSection = section.offsetTop;
    console.log(href);
    if (href === "#home") {
      topSection = 0;
    } else if (href === "#about") {
      topSection *= 0.8;
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
  }

  init() {
    if (this.linksInternos.length) {
      this.addLinkEvent();
    }
    return this;
  }
}
